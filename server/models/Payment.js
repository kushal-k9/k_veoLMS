"use strict";

const mongoose = require("mongoose");
const { PAYMENT_STATUS } = require("../config/constants");

/** Records a Stripe PaymentIntent and its lifecycle. */
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    stripePaymentIntentId: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true, min: 0 }, // major units (e.g. dollars)
    currency: { type: String, required: true, default: "usd" },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
