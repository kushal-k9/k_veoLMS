"use strict";

/**
 * Transactional email via SMTP (nodemailer). If email is not configured
 * (no host/user/pass), OTP codes are logged to the server console instead so
 * local development still works without a real mailbox.
 */
const nodemailer = require("nodemailer");
const env = require("../config/env");
const logger = require("../utils/logger");

let transporter = null;
if (env.emailEnabled) {
  transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_PORT === 465, // SSL for 465, STARTTLS otherwise
    auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASS },
  });
}

async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    logger.warn(`[email disabled] Would send "${subject}" to ${to}`);
    return { skipped: true };
  }
  return transporter.sendMail({ from: env.EMAIL_FROM, to, subject, html, text });
}

async function sendOtpEmail(to, name, code) {
  // In dev with email disabled, surface the code so testing is possible.
  if (!env.emailEnabled) {
    logger.info(`[dev OTP] ${to} -> ${code}`);
  }
  const subject = "Verify your VeoLMS email";
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:auto">
      <h2 style="color:#111">Welcome to VeoLMS, ${escapeHtml(name)} 👋</h2>
      <p>Use the verification code below to confirm your email address. It expires in 10 minutes.</p>
      <p style="font-size:32px;font-weight:700;letter-spacing:8px;background:#f4f4f5;
                padding:16px;text-align:center;border-radius:12px">${code}</p>
      <p style="color:#71717a;font-size:13px">If you didn't create a VeoLMS account, you can ignore this email.</p>
    </div>`;
  return sendMail({ to, subject, html, text: `Your VeoLMS code is ${code}` });
}

function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

module.exports = { sendMail, sendOtpEmail };
