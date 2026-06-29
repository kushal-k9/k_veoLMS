# VeoLMS Backend — Implementation Summary

Node.js + Express + MongoDB (Mongoose) REST API for the VeoLMS learning platform.

## Architecture

A clean, layered architecture — each request flows through thin, single-responsibility layers:

```
HTTP → middleware (security/auth/validation) → routes → controllers → services → models → MongoDB
```

| Layer | Responsibility |
|-------|----------------|
| `config/` | Env loading + validation (`env.js`), Mongoose connection with retry + graceful shutdown + DNS-SRV fallback (`db.js`), app constants (`constants.js`) |
| `models/` | Mongoose schemas: validation, enums, indexes, refs, `toJSON` transforms (`_id`→`id`), pre-save password hashing |
| `services/` | Pure business logic (testable, no `req`/`res`) |
| `controllers/` | Thin HTTP handlers — parse request, call a service, format the response |
| `routes/` | One Express router per resource; attaches auth, RBAC, rate limits, and Zod validation. `schemas.js` holds all request schemas |
| `middlewares/` | auth/RBAC, centralized error handler, validation, rate limiting, security headers, CSRF, file upload, request logging |
| `utils/` | JWT, password hashing, response formatter, async wrapper, logger, `ApiError`, cookie helpers, duration parser |
| `storage/` | `logs/` (winston) + `uploads/` (multer) — outside any web root |
| `app.js` | Entry: load config → connect DB → mount middleware + routes → start → graceful shutdown |
| `scripts/seed.js` | Idempotent seed of demo users + courses |

## Domain model

- **User** — name, email (unique), bcrypt password (pre-save hook), role enum, provider (local/google), email-verification OTP (hashed), brute-force lockout fields.
- **Course** — full course with embedded **Section** → **Lesson** sub-documents; text index for search; indexes on `title`, `instructor`, `category`.
- **Enrollment** — `user` × `course` (unique compound index), amount, payment ref.
- **Progress** — `user` × `course` (unique), completed lesson ids, last lesson, recently-watched (capped at 8).
- **RefreshToken** — hashed token by `jti`, TTL index for auto-expiry, rotation/reuse tracking.
- **Payment** — Stripe PaymentIntent id, amount, currency, status.

## Features → endpoints

| Feature | Endpoints |
|---------|-----------|
| Register + email OTP verify | `POST /auth/register`, `/auth/verify-otp`, `/auth/resend-otp` |
| Login (email/pw) + Google | `POST /auth/login`, `/auth/google` |
| Session: refresh rotation, logout, me | `POST /auth/refresh`, `/auth/logout`, `GET /auth/me` |
| Course catalog: search/filter/paginate | `GET /courses`, `GET /courses/:id` |
| Admin course CRUD (nested sections/lessons) | `POST/PATCH/DELETE /courses/:id` |
| Admin students table | `GET /users?role=student` |
| Admin enrollments table | `GET /enrollments` |
| My courses / is-enrolled | `GET /enrollments/me` |
| Lesson progress + resume + recents | `GET/PATCH /progress/:courseId...` |
| Stripe checkout (Elements) | `POST /payments/create-intent`, `/payments/confirm`, `/payments/webhook` |

## Security measures (all implemented)

- **JWT access + refresh** with separate secrets; access 15m, refresh 7d; **refresh rotation + reuse detection** (replaying a revoked token revokes the whole family).
- **Refresh token in httpOnly + Secure + SameSite cookie**; never exposed to JS.
- **RBAC middleware** (`requireRole`) guards admin routes.
- **bcrypt** hashing, ≥12 rounds, in a pre-save hook; **password strength policy** enforced.
- **Account lockout**: 5 failed logins → 15-minute lock; constant-time-ish compare to reduce user enumeration.
- **helmet**: CSP, HSTS, X-Frame-Options (frameAncestors none), noSniff, referrer-policy, CORP/COOP.
- **CORS**: strict allowlist (frontend origin only) with `credentials: true`.
- **Rate limiting**: global (300/15m) + stricter auth (20/15m) + OTP (8/10m).
- **Zod validation on every route**; top-level bodies `.strict()` → unknown fields **rejected**.
- **NoSQL injection**: `express-mongo-sanitize` + Mongoose `sanitizeFilter`/`strictQuery`.
- **XSS**: recursive `xss` sanitizer on inputs + CSP.
- **HPP** parameter-pollution protection.
- **CSRF**: double-submit token (`csrf-csrf`) on cookie-auth state-changing routes.
- **Body-size limit** (`10kb` default) → oversized payloads `413`.
- **File uploads**: mime+extension whitelist, size cap, randomized filenames, stored outside web root.
- **Hidden stack traces in prod**; generic 5xx messages to client, full detail logged server-side.
- **`x-powered-by` disabled**; secure cookie flags everywhere.
- **Secrets only in `.env`**, validated on boot (process exits on missing/invalid).
- **Request logging** (morgan→winston) + **audit log** for auth events.
- **`trust proxy`** toggle for HTTPS-terminating reverse proxies.
- **Mongoose hardening**: `strictQuery`, `bufferCommands:false`, default query `maxTimeMS`.

## Running locally

```bash
cd server
npm install
cp .env.example .env      # then fill in secrets (or use the provided .env)
npm run seed              # populate demo users + courses
npm run dev               # nodemon, http://localhost:4000
```

Demo logins: `admin@veolms.com / Admin123!` · `student@veolms.com / Student123!`

### Stripe (local)
- Frontend needs a publishable key (`VITE_STRIPE_PUBLISHABLE_KEY`).
- For webhooks in dev: `stripe listen --forward-to localhost:4000/api/payments/webhook` and put the signing secret in `STRIPE_WEBHOOK_SECRET`. Without it, the frontend uses `POST /payments/confirm` after card confirmation.

## Notes
- `config/db.js` auto-falls back to public DNS (8.8.8.8 / 1.1.1.1) if the local resolver refuses Atlas SRV lookups (common on some Windows/router setups).
- The 3 remaining `npm audit` advisories are transitive (uuid via `google-auth-library`) and server-only; no fix without a breaking upstream bump.
