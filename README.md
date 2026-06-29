# VeoLMS

A full-stack **Learning Management System** — browse and search a course catalog, enroll via Stripe checkout, watch lessons with saved progress, and manage courses/students from an admin panel.

The project is split into two apps:

| App | Stack | Location |
|-----|-------|----------|
| **Frontend** | React 19 · TanStack Start/Router · TanStack Query · Tailwind CSS v4 · Radix UI · Zustand · Vite | [`frontend/`](frontend/) |
| **Backend** | Node.js · Express · MongoDB (Mongoose) · JWT · Stripe | [`server/`](server/) |

---

## Features

- **Auth** — email/password registration with email-OTP verification, Google sign-in, JWT access + refresh tokens with rotation & reuse detection, account lockout.
- **Course catalog** — search, filter, and paginate courses; nested sections → lessons.
- **Enrollment & payments** — Stripe Elements checkout (`create-intent` → `confirm` / webhook).
- **Learning** — per-lesson progress tracking, resume-where-you-left-off, recently-watched.
- **Admin** — course CRUD (with nested sections/lessons), students table, enrollments table.
- **Security-first backend** — RBAC, rate limiting, Zod validation, CSRF, helmet, NoSQL-injection & XSS sanitization, hardened cookies. See [`server/IMPLEMENTATION_SUMMARY.md`](server/IMPLEMENTATION_SUMMARY.md).

---

## Project structure

```
VeoLMS/
├── frontend/            # React + TanStack Start SPA/SSR
│   ├── src/
│   │   ├── routes/      # File-based routes (login, courses, dashboard, admin, learn…)
│   │   ├── components/  # UI + feature components
│   │   ├── hooks/       # React Query hooks (useUsers, useCourses…)
│   │   ├── stores/      # Zustand stores
│   │   ├── lib/         # API client, utils
│   │   └── types/
│   └── vite.config.ts
└── server/              # Express REST API
    ├── config/          # env, db connection, constants
    ├── models/          # Mongoose schemas (User, Course, Enrollment, Progress…)
    ├── services/        # Business logic
    ├── controllers/     # HTTP handlers
    ├── routes/          # Routers + Zod schemas
    ├── middlewares/     # auth/RBAC, errors, validation, rate-limit, CSRF
    ├── utils/           # JWT, hashing, logger, ApiError
    ├── scripts/seed.js  # Demo users + courses
    └── app.js           # Entry point
```

---

## Getting started

**Prerequisites:** Node.js 18+, a MongoDB instance (local or Atlas), and a Stripe account (test mode is fine).

### 1. Backend

```bash
cd server
npm install
cp .env.example .env       # then fill in secrets (see below)
npm run seed               # populate demo users + courses
npm run dev                # nodemon → http://localhost:4000
```

The API is served under `http://localhost:4000/api`. Full endpoint reference: [`server/API_DOCUMENTATION.md`](server/API_DOCUMENTATION.md).

**Demo logins** (after seeding):
- Admin — `admin@veolms.com` / `Admin123!`
- Student — `student@veolms.com` / `Student123!`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env       # set VITE_API_URL + keys
npm run dev                # Vite → http://localhost:8080
```

> The backend's `CLIENT_ORIGIN` must match the frontend dev URL (`http://localhost:8080` by default) for CORS.

---

## Environment variables

### Backend (`server/.env`)

Key values — see [`server/.env.example`](server/.env.example) for the full list and comments.

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `4000`) |
| `CLIENT_ORIGIN` | Allowed CORS origin (frontend URL) |
| `MONGODB_URI` | MongoDB connection string |
| `COOKIE_SECRET`, `CSRF_SECRET` | Cookie/CSRF signing (long random strings) |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | JWT signing secrets |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe API + webhook |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (optional) |
| `EMAIL_*` | SMTP for OTP emails (optional — codes log to console if unset) |

Generate a secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Frontend (`frontend/.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:4000/api`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client id (matches server) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_…`) |

---

## Stripe (local development)

For webhook testing, forward events with the Stripe CLI:

```bash
stripe listen --forward-to localhost:4000/api/payments/webhook
```

Put the printed signing secret in `STRIPE_WEBHOOK_SECRET`. Without it, the frontend falls back to `POST /payments/confirm` after card confirmation.

---

## Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start the server |
| `npm run seed` | Seed demo users + courses |

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

---

## Documentation

- [`server/API_DOCUMENTATION.md`](server/API_DOCUMENTATION.md) — full REST API reference.
- [`server/IMPLEMENTATION_SUMMARY.md`](server/IMPLEMENTATION_SUMMARY.md) — backend architecture & security measures.

> This project is connected to [Lovable](https://lovable.dev) — avoid rewriting published git history (force push / rebase / squash of pushed commits), as it syncs back to the editor.
