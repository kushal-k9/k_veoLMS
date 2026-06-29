"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const env = require("../config/env");
const {
  ROLE_VALUES,
  ROLES,
  AUTH_PROVIDER,
  MAX_LOGIN_ATTEMPTS,
  LOCK_DURATION_MS,
  USER_STATUS,
  USER_STATUS_VALUES,
} = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    // `select: false` => never returned by default queries.
    password: { type: String, select: false, minlength: 8 },
    role: {
      type: String,
      enum: ROLE_VALUES,
      default: ROLES.STUDENT,
      index: true,
    },
    // Account status — banning sets this to "banned" (blocks login).
    status: {
      type: String,
      enum: USER_STATUS_VALUES,
      default: USER_STATUS.ACTIVE,
      index: true,
    },
    avatar: { type: String, default: "" },

    // Courses the user has wishlisted (saved for later).
    wishlist: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
      default: [],
    },

    provider: {
      type: String,
      enum: Object.values(AUTH_PROVIDER),
      default: AUTH_PROVIDER.LOCAL,
    },
    googleId: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },

    // Email-verification OTP (hashed at rest)
    otpHash: { type: String, select: false, default: null },
    otpExpiresAt: { type: Date, select: false, default: null },
    otpAttempts: { type: Number, select: false, default: 0 },

    // Brute-force / lockout tracking
    loginAttempts: { type: Number, default: 0, select: false },
    lockUntil: { type: Date, default: null, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.otpHash;
        delete ret.otpExpiresAt;
        delete ret.otpAttempts;
        delete ret.loginAttempts;
        delete ret.lockUntil;
        delete ret.googleId;
        return ret;
      },
    },
  }
);

// Hash the password in a pre-save hook whenever it changes. Plaintext never
// touches the database.
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(env.BCRYPT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.virtual("isLocked").get(function () {
  return Boolean(this.lockUntil && this.lockUntil.getTime() > Date.now());
});

userSchema.methods.comparePassword = function (candidate) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(candidate, this.password);
};

/** Register a failed login; lock the account after too many attempts. */
userSchema.methods.registerFailedLogin = async function () {
  // A previous lock that has expired resets the counter.
  if (this.lockUntil && this.lockUntil.getTime() <= Date.now()) {
    this.loginAttempts = 1;
    this.lockUntil = null;
  } else {
    this.loginAttempts += 1;
    if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      this.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
    }
  }
  await this.save();
};

userSchema.methods.resetLoginAttempts = async function () {
  if (this.loginAttempts === 0 && !this.lockUntil) return;
  this.loginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
