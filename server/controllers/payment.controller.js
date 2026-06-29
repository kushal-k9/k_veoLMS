"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const paymentService = require("../services/payment.service");
const logger = require("../utils/logger");

const createIntent = asyncHandler(async (req, res) => {
  const data = await paymentService.createIntent(
    req.user,
    req.body.courseId,
    req.body.couponCode
  );
  return created(res, data, "Payment intent created");
});

const confirm = asyncHandler(async (req, res) => {
  const enrollment = await paymentService.confirm(
    req.user,
    req.body.paymentIntentId
  );
  return ok(res, { enrollment }, "Payment confirmed and enrollment created");
});

const list = asyncHandler(async (req, res) => {
  const payments = await paymentService.listPayments();
  return ok(res, { payments }, "Payments fetched");
});

const refund = asyncHandler(async (req, res) => {
  const payment = await paymentService.refund(req.params.id);
  return ok(res, { payment }, "Payment refunded");
});

/**
 * Stripe webhook. Mounted with a raw body parser so the signature can be
 * verified. Always 200 once received & valid; processing errors are logged.
 */
const webhook = asyncHandler(async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = paymentService.constructEvent(req.body, signature);
  } catch (err) {
    logger.warn(`Stripe webhook signature failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  await paymentService.handleWebhookEvent(event);
  return res.status(200).json({ received: true });
});

module.exports = { createIntent, confirm, list, refund, webhook };
