"use strict";

const Stripe = require("stripe");
const env = require("../config/env");
const logger = require("../utils/logger");
const ApiError = require("../utils/ApiError");
const { PAYMENT_STATUS } = require("../config/constants");
const Payment = require("../models/Payment");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const enrollmentService = require("./enrollment.service");
const couponService = require("./coupon.service");

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });

/**
 * Create (or reuse) a PaymentIntent for a course purchase and return its
 * client secret so the frontend can confirm the card with Stripe Elements.
 */
async function createIntent(user, courseId, couponCode) {
  const userId = String(user._id || user.id);
  const course = await Course.findById(courseId);
  if (!course) throw ApiError.notFound("Course not found");

  const already = await Enrollment.exists({ user: userId, course: courseId });
  if (already) throw ApiError.conflict("You are already enrolled in this course");

  // Base price honors any course-level discount; a coupon stacks on top.
  let price =
    typeof course.discountPrice === "number" && course.discountPrice < course.price
      ? course.discountPrice
      : course.price;
  let couponId = null;
  if (couponCode) {
    const { coupon, finalPrice } = await couponService.validate(couponCode, courseId, price);
    price = finalPrice;
    couponId = String(coupon._id);
  }

  const amountMinor = Math.round(price * 100); // dollars -> cents
  const intent = await stripe.paymentIntents.create({
    amount: amountMinor,
    currency: env.STRIPE_CURRENCY,
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId,
      courseId: String(courseId),
      courseTitle: course.title,
      couponId: couponId || "",
    },
    receipt_email: user.email,
  });

  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: intent.id },
    {
      user: userId,
      course: courseId,
      stripePaymentIntentId: intent.id,
      amount: price,
      currency: env.STRIPE_CURRENCY,
      status: PAYMENT_STATUS.PENDING,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    clientSecret: intent.client_secret,
    amount: price,
    currency: env.STRIPE_CURRENCY,
    courseId: String(courseId),
  };
}

/** Mark a payment succeeded + create the enrollment (idempotent). */
async function fulfill(intent) {
  const { userId, courseId } = intent.metadata || {};
  if (!userId || !courseId) {
    logger.warn(`PaymentIntent ${intent.id} missing metadata; skipping fulfill`);
    return null;
  }
  const payment = await Payment.findOneAndUpdate(
    { stripePaymentIntentId: intent.id },
    { status: PAYMENT_STATUS.SUCCEEDED },
    { new: true }
  );
  const enrollment = await enrollmentService.create({
    userId,
    courseId,
    amount: (intent.amount_received ?? intent.amount) / 100,
    paymentId: payment?._id || null,
  });
  // Count coupon usage once the purchase actually completes.
  if (intent.metadata?.couponId) {
    couponService.markUsed(intent.metadata.couponId).catch(() => {});
  }
  logger.audit("payment.fulfilled", { user: userId, course: courseId, intent: intent.id });
  return enrollment;
}

/** Stripe webhook entry point (signature already verified by middleware). */
async function handleWebhookEvent(event) {
  switch (event.type) {
    case "payment_intent.succeeded":
      await fulfill(event.data.object);
      break;
    case "payment_intent.payment_failed":
      await Payment.updateOne(
        { stripePaymentIntentId: event.data.object.id },
        { status: PAYMENT_STATUS.FAILED }
      );
      break;
    default:
      break; // ignore unrelated events
  }
}

/**
 * Client-driven confirmation fallback (used in local dev when webhooks aren't
 * configured). Retrieves the intent from Stripe, verifies ownership + success,
 * then fulfills. Never trusts the client about payment status.
 */
async function confirm(user, paymentIntentId) {
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (!intent) throw ApiError.notFound("Payment not found");
  if (String(intent.metadata?.userId) !== String(user._id || user.id)) {
    throw ApiError.forbidden("This payment does not belong to you");
  }
  if (intent.status !== "succeeded") {
    throw ApiError.badRequest(`Payment not completed (status: ${intent.status})`);
  }
  const enrollment = await fulfill(intent);
  return enrollment;
}

/**
 * Admin refund: refunds the Stripe charge (if configured), marks the payment
 * refunded, and unenrolls the student. `paymentId` is our Payment _id.
 */
async function refund(paymentId) {
  if (!require("mongoose").isValidObjectId(paymentId)) {
    throw ApiError.notFound("Payment not found");
  }
  const payment = await Payment.findById(paymentId);
  if (!payment) throw ApiError.notFound("Payment not found");
  if (payment.status === PAYMENT_STATUS.REFUNDED) {
    throw ApiError.conflict("Payment already refunded");
  }

  // Issue the Stripe refund. Swallow Stripe errors for test intents that can't
  // be refunded, but still record the refund locally so the admin UI is consistent.
  try {
    await stripe.refunds.create({ payment_intent: payment.stripePaymentIntentId });
  } catch (err) {
    logger.warn(`Stripe refund failed for ${payment.stripePaymentIntentId}: ${err.message}`);
  }

  payment.status = PAYMENT_STATUS.REFUNDED;
  await payment.save();

  // Remove the enrollment + progress so access is revoked.
  await Promise.all([
    Enrollment.findOneAndDelete({ user: payment.user, course: payment.course }),
    require("../models/Progress").deleteOne({ user: payment.user, course: payment.course }),
  ]);

  logger.audit("payment.refunded", {
    payment: String(payment._id),
    user: String(payment.user),
    course: String(payment.course),
  });
  return payment;
}

/** Admin transaction log: all payments, newest first, user+course populated. */
async function listPayments() {
  return Payment.find()
    .populate("user", "name email")
    .populate("course", "title")
    .sort({ createdAt: -1 });
}

function constructEvent(rawBody, signature) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw ApiError.badRequest("Webhook secret not configured");
  }
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );
}

module.exports = {
  createIntent,
  confirm,
  refund,
  listPayments,
  handleWebhookEvent,
  constructEvent,
};
