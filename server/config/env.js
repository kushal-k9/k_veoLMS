"use strict";

/**
 * Centralized environment loading + validation.
 * The process refuses to boot if a required variable is missing or malformed,
 * so misconfiguration fails fast and loudly instead of at runtime.
 */
const path = require("path");
const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const bool = (def) =>
  z
    .string()
    .optional()
    .transform((v) => (v === undefined ? def : v === "true" || v === "1"));

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  TRUST_PROXY: bool(false),

  // One origin, or a comma-separated list (e.g. prod site + localhost).
  CLIENT_ORIGIN: z
    .string()
    .min(1, "CLIENT_ORIGIN is required")
    .refine(
      (v) =>
        v.split(",").every((s) => {
          try {
            return Boolean(new URL(s.trim()));
          } catch {
            return false;
          }
        }),
      "CLIENT_ORIGIN must be a URL or comma-separated list of URLs"
    ),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  // Cookie signing + CSRF
  COOKIE_SECRET: z.string().min(16, "COOKIE_SECRET must be at least 16 chars"),
  CSRF_SECRET: z.string().min(16, "CSRF_SECRET must be at least 16 chars"),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(24, "JWT_ACCESS_SECRET must be at least 24 chars"),
  JWT_REFRESH_SECRET: z.string().min(24, "JWT_REFRESH_SECRET must be at least 24 chars"),
  JWT_ACCESS_TTL: z.string().default("15m"),
  JWT_REFRESH_TTL: z.string().default("7d"),

  // Password hashing
  BCRYPT_ROUNDS: z.coerce.number().int().min(12).max(15).default(12),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().optional().default(""),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(""),
  GOOGLE_REDIRECT_URI: z.string().optional().default(""),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(""),
  STRIPE_CURRENCY: z.string().default("usd"),

  // Email / SMTP
  EMAIL_HOST: z.string().optional().default(""),
  EMAIL_PORT: z.coerce.number().int().optional().default(465),
  EMAIL_USER: z.string().optional().default(""),
  EMAIL_PASS: z.string().optional().default(""),
  EMAIL_FROM: z.string().optional().default("VeoLMS <noreply@veolms.com>"),

  // Limits
  JSON_BODY_LIMIT: z.string().default("10kb"),
  UPLOAD_MAX_BYTES: z.coerce.number().int().positive().default(2 * 1024 * 1024),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("\n❌ Invalid environment configuration:\n");
  for (const issue of parsed.error.issues) {
    // eslint-disable-next-line no-console
    console.error(`   • ${issue.path.join(".")}: ${issue.message}`);
  }
  // eslint-disable-next-line no-console
  console.error("\nFix your .env (see .env.example) and restart.\n");
  process.exit(1);
}

const env = parsed.data;
env.isProd = env.NODE_ENV === "production";
env.isDev = env.NODE_ENV === "development";
env.googleEnabled = Boolean(env.GOOGLE_CLIENT_ID);
env.emailEnabled = Boolean(env.EMAIL_HOST && env.EMAIL_USER && env.EMAIL_PASS);

module.exports = env;
