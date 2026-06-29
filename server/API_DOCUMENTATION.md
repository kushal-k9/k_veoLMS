# VeoLMS API Documentation

Base URL: `http://localhost:4000/api`

## Conventions

**Response envelope** — every endpoint returns:

```json
{ "success": true,  "data": { ... }, "message": "Human readable" }
{ "success": false, "data": null,     "message": "Error",  "errors": [ ... ] }
```

**Authentication**
- Access token: short-lived JWT (15m). Sent as `Authorization: Bearer <token>`.
- Refresh token: long-lived JWT (7d), stored in an **httpOnly, Secure, SameSite** cookie (`veolms_rt`). Rotated on every `/auth/refresh`.
- CSRF: cookie-authenticated routes (`/auth/refresh`, `/auth/logout`) require an `x-csrf-token` header obtained from `GET /auth/csrf-token`.

**Roles**: `admin`, `student` (RBAC enforced server-side).

**Errors**: `400` validation, `401` unauthenticated, `403` forbidden/CSRF, `404` not found, `409` conflict, `413` payload too large, `429` rate-limited, `500` server error.

---

## Auth — `/auth`

### `GET /auth/csrf-token`
Returns a CSRF token and sets the CSRF cookie.
- **Response** `200`: `{ data: { csrfToken: "..." } }`

### `POST /auth/register`
- **Body**: `{ "name": string(2-80), "email": string, "password": string(min 8, upper+lower+number) }`
- **Response** `201`: `{ data: { email, requiresVerification: true } }` — an OTP is emailed.
- **Errors**: `409` email exists, `400` weak password / validation.

### `POST /auth/verify-otp`
- **Body**: `{ "email": string, "code": string(6 digits) }`
- **Response** `200`: `{ data: { user, accessToken } }` + sets refresh cookie.
- **Errors**: `400` wrong/expired code, `429` too many attempts.

### `POST /auth/resend-otp`
- **Body**: `{ "email": string }`
- **Response** `200`: `{ data: null }` (always generic, to avoid user enumeration).

### `POST /auth/login`
- **Body**: `{ "email": string, "password": string }`
- **Response** `200`: `{ data: { user, accessToken } }` + sets refresh cookie.
- **Errors**: `401` invalid credentials, `403` `{ errors: { requiresVerification: true } }` if email unverified, `429` account locked (after 5 failed attempts → 15-min lock).

### `POST /auth/google`
- **Body**: `{ "credential": string }` — a Google ID-token credential from Google Identity Services.
- **Response** `200`: `{ data: { user, accessToken } }` + sets refresh cookie.

### `POST /auth/refresh`  *(cookie auth + CSRF)*
- **Headers**: `x-csrf-token`
- **Cookies**: `veolms_rt`
- **Response** `200`: `{ data: { user, accessToken } }` + rotates refresh cookie.
- **Errors**: `401` invalid/expired/reused session, `403` missing CSRF.

### `POST /auth/logout`  *(cookie auth + CSRF)*
- **Response** `200`: revokes the refresh token + clears the cookie.

### `GET /auth/me`  *(Bearer auth)*
- **Response** `200`: `{ data: { user } }`

---

## Courses — `/courses`

### `GET /courses`
Public. List/search/filter/paginate.
- **Query**: `q?` (search title/instructor/category), `category?`, `page?` (default 1), `limit?` (default 24, max 100)
- **Response** `200`: `{ data: { courses: Course[], pagination: { page, limit, total, totalPages } } }`

### `GET /courses/:id`
Public. `{ data: { course } }`. `404` if not found.

### `POST /courses`  *(admin)*
- **Body**: `{ title*, subtitle?, thumbnail?, trailerYoutubeId?, instructor?, instructorAvatar?, instructorTitle?, description?, price?, rating?, ratingCount?, studentsCount?, level? (Beginner|Intermediate|Advanced), category?, sections?: Section[] }`
  - `Section`: `{ id?, title*, lessons: Lesson[] }`
  - `Lesson`: `{ id?, title*, youtubeId?, duration?, preview? }`
- **Response** `201`: `{ data: { course } }`

### `PATCH /courses/:id`  *(admin)*
- **Body**: any subset of the course fields above. Existing section/lesson `id`s are preserved.
- **Response** `200`: `{ data: { course } }`

### `DELETE /courses/:id`  *(admin)*
- Cascades: removes the course's enrollments + progress.
- **Response** `200`: `{ data: null }`

---

## Enrollments — `/enrollments`

### `GET /enrollments/me`  *(Bearer auth)*
Current user's enrollments with `course` populated.
- **Response** `200`: `{ data: { enrollments: Enrollment[] } }`

### `GET /enrollments`  *(admin)*
All enrollments with `user` (name,email) and `course` (title,price) populated.
- **Response** `200`: `{ data: { enrollments: Enrollment[] } }`

> Enrollments are **created** through the payment flow (webhook / confirm), not a direct POST.

---

## Progress — `/progress`  *(all Bearer auth; must be enrolled)*

### `GET /progress/:courseId`
- **Response** `200`: `{ data: { progress: { completedLessonIds, lastLessonId, recentlyWatched } } }`

### `PATCH /progress/:courseId/lesson`
- **Body**: `{ "lessonId": string, "complete": boolean }`
- **Response** `200`: `{ data: { progress } }`

### `PATCH /progress/:courseId/last-lesson`
- **Body**: `{ "lessonId": string }` — updates `lastLessonId` + `recentlyWatched` (max 8).
- **Response** `200`: `{ data: { progress } }`

---

## Payments — `/payments`  (Stripe Elements)

### `POST /payments/create-intent`  *(Bearer auth)*
- **Body**: `{ "courseId": string }`
- **Response** `201`: `{ data: { clientSecret, amount, currency, courseId } }`
- **Errors**: `409` already enrolled, `404` course not found.

### `POST /payments/confirm`  *(Bearer auth)*
Client-driven fallback used when webhooks aren't configured (local dev). Verifies the intent server-side, then creates the enrollment.
- **Body**: `{ "paymentIntentId": string }`
- **Response** `200`: `{ data: { enrollment } }`
- **Errors**: `400` not completed, `403` not your payment.

### `POST /payments/webhook`  *(Stripe → server; raw body, signature-verified)*
Handles `payment_intent.succeeded` (fulfills enrollment) and `payment_intent.payment_failed`. Not called by the frontend.

---

## Users — `/users`

### `GET /users`  *(admin)*
- **Query**: `role?` (`admin` | `student`)
- **Response** `200`: `{ data: { users: [{ id, name, email, role, avatar, isEmailVerified, enrolledCount, createdAt }] } }`

---

## Health

### `GET /health`
`{ data: { status: "ok", env, uptime } }`

---

## Data shapes

```ts
User    = { id, name, email, role, avatar, provider, isEmailVerified, createdAt }
Course  = { id, title, subtitle, thumbnail, trailerYoutubeId, instructor,
            instructorAvatar, instructorTitle, description, price, rating,
            ratingCount, studentsCount, level, category, sections, createdAt }
Section = { id, title, lessons: Lesson[] }
Lesson  = { id, title, youtubeId, duration, preview }
Enrollment = { id, user, course, amount, enrolledAt }
Progress   = { id, course, completedLessonIds: string[], lastLessonId: string|null,
               recentlyWatched: [{ lessonId, courseId, at }] }
```

---

## Extended API (v2 — admin dashboard + engagement)

> All admin/staff routes require `Authorization: Bearer <token>` plus the noted
> permission. Roles: `super-admin`, `admin`, `instructor`, `support`, `student`.
> Permissions map per role (see `config/constants.js` → `ROLE_PERMISSIONS`).

### Courses (additions)
- `GET /courses` now accepts `status` and returns drafts/unpublished only to staff (optionalAuth).
- `PATCH /courses/bulk` *(manage_courses)* — `{ ids: string[], status: "draft"|"published" }`.
- Course fields added: `discountPrice`, `status`, `publishAt`; Lesson fields: `description`, `pdfUrl`, `assets[]`, `availableAt`.

### Uploads
- `POST /uploads` *(manage_courses, multipart `file`)* — returns `{ url, filename, type, size, name }`. Files served at `/uploads/<filename>`.

### Notes — `/notes` *(auth)*
- `GET /notes/:courseId` · `PUT /notes/:courseId/:lessonId` `{ content }` · `DELETE /notes/:courseId/:lessonId`

### Wishlist — `/users/me/wishlist` *(auth)*
- `GET` · `POST /:courseId` · `DELETE /:courseId` → `{ courses: Course[] }`

### Users (admin)
- `GET /users` *(manage_users)* — `?role&status&q`.
- `PATCH /users/:id/role` *(manage_roles)* `{ role }` · `PATCH /users/:id/status` *(manage_users)* `{ status }` · `POST /users/:id/reset-password` *(manage_users)* → `{ tempPassword }`

### Enrollments (admin)
- `POST /enrollments/admin` *(manage_users)* `{ userId, courseId }` · `DELETE /enrollments/admin/:userId/:courseId`

### Payments / transactions
- `POST /payments/create-intent` now accepts optional `couponCode`.
- `GET /payments` *(view_analytics|issue_refunds)* — transaction log · `POST /payments/:id/refund` *(issue_refunds)*

### Analytics — `/analytics` *(view_analytics)*
- `GET /overview` · `GET /revenue?range` · `GET /enrollments?range` · `GET /top-courses` · `GET /traffic` (`range` = daily|weekly|monthly)

### Quizzes — `/quizzes` *(auth)*
- `GET /course/:courseId` (answers stripped) · `POST /:id/attempts` `{ answers:number[] }` · `GET /course/:courseId/attempts/me`
- Staff *(manage_courses)*: `GET /course/:courseId/admin`, `POST /`, `PATCH /:id`, `DELETE /:id`

### Certificates — `/certificates`
- `GET /me` *(auth)* · `GET /verify/:code` *(public)* · `GET /` *(view_analytics)*

### Q&A — `/qa` *(auth)*
- `GET /course/:courseId?lessonId` · `POST /` `{ courseId, lessonId?, body }` · `POST /:id/answers` `{ body }`
- Moderation *(moderate)*: `GET /admin/all`, `PATCH /:id/hidden` `{ hidden }`, `DELETE /:id`

### Announcements — `/announcements` *(auth)*
- `GET /me` · Staff *(manage_announcements)*: `GET /`, `POST /` `{ scope, course?, title, body }`, `DELETE /:id`

### Notifications — `/notifications` *(auth)*
- `GET /` → `{ notifications, unread }` · `PATCH /:id/read` · `PATCH /read-all`

### Coupons — `/coupons` *(auth)*
- `POST /validate` `{ code, courseId }` → `{ originalPrice, finalPrice, discount }`
- Staff *(manage_coupons)*: `GET /`, `POST /`, `PATCH /:id`, `DELETE /:id`

### Reviews — `/reviews`
- `GET /course/:courseId` *(public)* · `GET /course/:courseId/me` *(auth)* · `PUT /course/:courseId` *(auth, enrolled)* `{ rating, body }`
- Moderation *(moderate)*: `GET /admin/all`, `PATCH /:id/hidden`, `DELETE /:id`

### Settings — `/settings` *(manage_settings)*
- `GET /` (secrets masked) · `PATCH /` `{ key: value, ... }`

### Audit log — `/audit` *(view_audit)*
- `GET /` — `?action&entityType&page&limit` → `{ logs, pagination }`
