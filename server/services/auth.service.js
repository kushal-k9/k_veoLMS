"use strict";

const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const env = require("../config/env");
const {
  AUTH_PROVIDER,
  OTP_TTL_MS,
  OTP_LENGTH,
} = require("../config/constants");
const { validateStrength } = require("../utils/password");
const tokenService = require("./token.service");
const emailService = require("./email.service");

const googleClient = env.googleEnabled
  ? new OAuth2Client(env.GOOGLE_CLIENT_ID)
  : null;

const MAX_OTP_ATTEMPTS = 5;

/**
 * Reject login entirely for suspended/banned accounts. Called on every
 * token-issuing path so a blocked user can never obtain a session.
 */
function assertNotSuspended(user) {
  if (user.status && user.status !== "active") {
    logger.audit("auth.login.suspended", { user: String(user._id), status: user.status });
    throw new ApiError(
      403,
      "Your account has been suspended. Please contact support."
    );
  }
}

function hashOtp(code) {
  return crypto.createHash("sha256").update(String(code)).digest("hex");
}

function generateOtp() {
  const max = 10 ** OTP_LENGTH;
  const n = crypto.randomInt(0, max);
  return String(n).padStart(OTP_LENGTH, "0");
}

/** Create + persist a new OTP on the user and email it. */
async function issueOtp(user) {
  const code = generateOtp();
  user.otpHash = hashOtp(code);
  user.otpExpiresAt = new Date(Date.now() + OTP_TTL_MS);
  user.otpAttempts = 0;
  await user.save();
  await emailService.sendOtpEmail(user.email, user.name, code);
}

/** Register a local account (unverified) and send a verification OTP. */
async function register({ name, email, password }) {
  const strengthError = validateStrength(password);
  if (strengthError) throw ApiError.badRequest(strengthError);

  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict("An account with that email already exists");
  }

  const user = new User({
    name,
    email,
    password, // hashed by pre-save hook
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
    provider: AUTH_PROVIDER.LOCAL,
    isEmailVerified: false,
  });
  await user.save();
  await issueOtp(user);

  logger.audit("auth.register", { user: String(user._id), email });
  return { email: user.email, requiresVerification: true };
}

/** Verify the OTP and, on success, mark verified + issue a token pair. */
async function verifyOtp({ email, code }, ctx) {
  const user = await User.findOne({ email }).select(
    "+otpHash +otpExpiresAt +otpAttempts"
  );
  if (!user) throw ApiError.badRequest("Invalid verification request");
  if (user.isEmailVerified) {
    throw ApiError.badRequest("Email is already verified");
  }
  if (!user.otpHash || !user.otpExpiresAt) {
    throw ApiError.badRequest("No active code. Request a new one.");
  }
  if (user.otpExpiresAt.getTime() < Date.now()) {
    throw ApiError.badRequest("Code expired. Request a new one.");
  }
  if (user.otpAttempts >= MAX_OTP_ATTEMPTS) {
    throw ApiError.tooMany("Too many attempts. Request a new code.");
  }

  if (hashOtp(code) !== user.otpHash) {
    user.otpAttempts += 1;
    await user.save();
    throw ApiError.badRequest("Incorrect code");
  }

  user.isEmailVerified = true;
  user.otpHash = null;
  user.otpExpiresAt = null;
  user.otpAttempts = 0;
  await user.save();

  assertNotSuspended(user);
  logger.audit("auth.verify.success", { user: String(user._id) });
  const tokens = await tokenService.issueTokens(user, ctx);
  return { user, ...tokens };
}

async function resendOtp({ email }) {
  const user = await User.findOne({ email });
  // Always respond the same way to avoid leaking which emails exist.
  if (!user || user.isEmailVerified) return { sent: true };
  await issueOtp(user);
  return { sent: true };
}

/** Email + password login with brute-force lockout. */
async function login({ email, password }, ctx) {
  const user = await User.findOne({ email }).select(
    "+password +loginAttempts +lockUntil"
  );

  const genericError = ApiError.unauthorized("Invalid email or password");

  if (!user || user.provider !== AUTH_PROVIDER.LOCAL) {
    // Run a dummy compare to keep timing roughly constant.
    if (user) await user.comparePassword(password);
    throw genericError;
  }

  if (user.isLocked) {
    logger.audit("auth.login.locked", { user: String(user._id) });
    throw ApiError.tooMany(
      "Account temporarily locked due to failed logins. Try again later."
    );
  }

  const match = await user.comparePassword(password);
  if (!match) {
    await user.registerFailedLogin();
    logger.audit("auth.login.fail", { user: String(user._id) });
    throw genericError;
  }

  if (!user.isEmailVerified) {
    await issueOtp(user);
    throw new ApiError(403, "Please verify your email. A new code was sent.", {
      requiresVerification: true,
    });
  }

  // Blocked accounts can never get a session — checked after password match so
  // it isn't a probe for valid emails.
  assertNotSuspended(user);

  await user.resetLoginAttempts();
  logger.audit("auth.login.success", { user: String(user._id) });
  const tokens = await tokenService.issueTokens(user, ctx);
  return { user, ...tokens };
}

/** Sign in / sign up via a Google ID token credential. */
async function googleAuth({ credential }, ctx) {
  if (!googleClient) {
    throw ApiError.badRequest("Google sign-in is not configured");
  }
  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw ApiError.unauthorized("Invalid Google credential");
  }
  if (!payload?.email || !payload.email_verified) {
    throw ApiError.unauthorized("Google account email is not verified");
  }

  let user = await User.findOne({ email: payload.email.toLowerCase() });
  if (!user) {
    user = await User.create({
      name: payload.name || payload.email.split("@")[0],
      email: payload.email,
      avatar: payload.picture || "",
      provider: AUTH_PROVIDER.GOOGLE,
      googleId: payload.sub,
      isEmailVerified: true,
    });
  } else if (!user.googleId) {
    // Link Google to an existing local account.
    user.googleId = payload.sub;
    if (!user.isEmailVerified) user.isEmailVerified = true;
    await user.save();
  }

  assertNotSuspended(user);
  logger.audit("auth.google.success", { user: String(user._id) });
  const tokens = await tokenService.issueTokens(user, ctx);
  return { user, ...tokens };
}

async function refresh(rawToken, ctx) {
  return tokenService.rotateTokens(rawToken, ctx);
}

async function logout(rawToken) {
  await tokenService.revokeByToken(rawToken);
}

async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

module.exports = {
  register,
  verifyOtp,
  resendOtp,
  login,
  googleAuth,
  refresh,
  logout,
  getMe,
};
