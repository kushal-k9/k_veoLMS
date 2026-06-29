"use strict";

const asyncHandler = require("../utils/asyncHandler");
const { ok, created } = require("../utils/response");
const { setRefreshCookie, clearRefreshCookie } = require("../utils/cookies");
const { REFRESH_COOKIE } = require("../config/constants");
const authService = require("../services/auth.service");

function reqCtx(req) {
  return { ip: req.ip, userAgent: req.get("user-agent") || "" };
}

/** Shape the user object + access token for client consumption. */
function authPayload(user, accessToken) {
  return { user: user.toJSON ? user.toJSON() : user, accessToken };
}

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return created(res, result, "Account created. Check your email for a code.");
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.verifyOtp(
    req.body,
    reqCtx(req)
  );
  setRefreshCookie(res, refreshToken);
  return ok(res, authPayload(user, accessToken), "Email verified");
});

const resendOtp = asyncHandler(async (req, res) => {
  await authService.resendOtp(req.body);
  return ok(res, null, "If the account exists, a new code was sent.");
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(
    req.body,
    reqCtx(req)
  );
  setRefreshCookie(res, refreshToken);
  return ok(res, authPayload(user, accessToken), "Logged in");
});

const google = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.googleAuth(
    req.body,
    reqCtx(req)
  );
  setRefreshCookie(res, refreshToken);
  return ok(res, authPayload(user, accessToken), "Logged in with Google");
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  const { user, accessToken, refreshToken } = await authService.refresh(
    token,
    reqCtx(req)
  );
  setRefreshCookie(res, refreshToken);
  return ok(res, authPayload(user, accessToken), "Token refreshed");
});

const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  await authService.logout(token);
  clearRefreshCookie(res);
  return ok(res, null, "Logged out");
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  return ok(res, { user: user.toJSON() }, "OK");
});

module.exports = { register, verifyOtp, resendOtp, login, google, refresh, logout, me };
