"use strict";

/**
 * Seed the database with initial users + courses so the frontend works on a
 * fresh install. Mirrors the data the frontend previously kept in mockData.ts.
 *
 *   npm run seed
 */
const mongoose = require("mongoose");
const env = require("../config/env");
const logger = require("../utils/logger");
const { connectDB, disconnectDB } = require("../config/db");
const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const Progress = require("../models/Progress");
const Payment = require("../models/Payment");
const RefreshToken = require("../models/RefreshToken");
const Coupon = require("../models/Coupon");
const Quiz = require("../models/Quiz");
const Review = require("../models/Review");
const Certificate = require("../models/Certificate");
const Announcement = require("../models/Announcement");
const Notification = require("../models/Notification");
const { ROLES, AUTH_PROVIDER, PAYMENT_STATUS } = require("../config/constants");

const seedUsers = [
  {
    name: "Aarav Mehta",
    email: "admin@veolms.com",
    password: "Admin123!",
    role: ROLES.ADMIN,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Diya Kapoor",
    email: "superadmin@veolms.com",
    password: "Super123!",
    role: ROLES.SUPER_ADMIN,
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    name: "Karan Singh",
    email: "instructor@veolms.com",
    password: "Teach123!",
    role: ROLES.INSTRUCTOR,
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    name: "Priya Sharma",
    email: "student@veolms.com",
    password: "Student123!",
    role: ROLES.STUDENT,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rohan Verma",
    email: "rohan@example.com",
    password: "Demo1234!",
    role: ROLES.STUDENT,
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Ananya Iyer",
    email: "ananya@example.com",
    password: "Demo1234!",
    role: ROLES.STUDENT,
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

const seedCourses = [
  {
    title: "The Complete Web Development Bootcamp",
    subtitle: "Master HTML, CSS & JavaScript and build real websites from scratch.",
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
    trailerYoutubeId: "qz0aGYrrlhU",
    instructor: "Sarah Donovan",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    instructorTitle: "Senior Frontend Engineer · 10+ yrs",
    description:
      "Go from absolute beginner to confident web developer. You'll learn semantic HTML, modern responsive CSS with Flexbox and Grid, and core JavaScript including the DOM and async programming. By the end you'll be able to build and ship polished, responsive websites.",
    price: 49,
    rating: 4.8,
    ratingCount: 12840,
    studentsCount: 48230,
    level: "Beginner",
    category: "Web Development",
    sections: [
      {
        title: "Getting Started with HTML",
        lessons: [
          { title: "Course Introduction & Setup", youtubeId: "qz0aGYrrlhU", duration: "08:12", preview: true },
          { title: "HTML Structure & Semantic Tags", youtubeId: "kUMe1FH4CHE", duration: "14:05", preview: true },
          { title: "Forms, Links & Media", youtubeId: "salY_Sm6mv4", duration: "11:40", preview: false },
        ],
      },
      {
        title: "Styling with CSS",
        lessons: [
          { title: "CSS Fundamentals & Selectors", youtubeId: "yfoY53QXEnI", duration: "16:22", preview: false },
          { title: "Flexbox Layout in Depth", youtubeId: "fYq5PXgSsbE", duration: "20:11", preview: false },
          { title: "CSS Grid Mastery", youtubeId: "EFafSYg-PkI", duration: "18:47", preview: false },
        ],
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JS Crash Course", youtubeId: "hdI2bqOjy3c", duration: "32:18", preview: false },
          { title: "Working with the DOM", youtubeId: "0ik6X4DJKCc", duration: "22:05", preview: false },
        ],
      },
    ],
  },
  {
    title: "React – The Complete Guide",
    subtitle: "Build powerful, fast, modern React apps with hooks, context, and more.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
    trailerYoutubeId: "w7ejDZ8SWv8",
    instructor: "Marcus Lee",
    instructorAvatar: "https://i.pravatar.cc/150?img=15",
    instructorTitle: "React Architect · Ex-Big Tech",
    description:
      "Dive deep into React, the most popular library for building user interfaces. You'll learn components, props, state, hooks, the Context API, and how to structure scalable applications. Hands-on projects throughout reinforce every concept.",
    price: 79,
    rating: 4.9,
    ratingCount: 18920,
    studentsCount: 67100,
    level: "Intermediate",
    category: "Frontend",
    sections: [
      {
        title: "React Foundations",
        lessons: [
          { title: "Why React? Intro & Tooling", youtubeId: "w7ejDZ8SWv8", duration: "10:30", preview: true },
          { title: "Components, JSX & Props", youtubeId: "SqcY0GlETPk", duration: "24:14", preview: false },
          { title: "State & Events", youtubeId: "35lXWvCuM8o", duration: "19:52", preview: false },
        ],
      },
      {
        title: "Hooks Deep Dive",
        lessons: [
          { title: "useState & useEffect", youtubeId: "TNhaISOUy6Q", duration: "28:40", preview: false },
          { title: "The Context API", youtubeId: "5LrDIWkK_Bc", duration: "17:09", preview: false },
          { title: "Custom Hooks", youtubeId: "6ThXsUwLWvc", duration: "15:33", preview: false },
        ],
      },
    ],
  },
  {
    title: "Node.js Backend Masterclass",
    subtitle: "Build scalable REST APIs with Node, Express, and best practices.",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    trailerYoutubeId: "fBNz5xF-Kx4",
    instructor: "Elena Petrova",
    instructorAvatar: "https://i.pravatar.cc/150?img=20",
    instructorTitle: "Backend Lead · API Specialist",
    description:
      "Become a confident backend developer. Learn how Node.js works under the hood, build RESTful APIs with Express, handle authentication, connect to databases, and follow industry best practices for production-grade services.",
    price: 69,
    rating: 4.7,
    ratingCount: 9450,
    studentsCount: 31200,
    level: "Intermediate",
    category: "Backend",
    sections: [
      {
        title: "Node.js Core",
        lessons: [
          { title: "Node Crash Course", youtubeId: "fBNz5xF-Kx4", duration: "12:00", preview: true },
          { title: "Modules & npm", youtubeId: "P-mUMUNn1c4", duration: "18:25", preview: false },
          { title: "Async & Promises", youtubeId: "V_Kr9OSfDeU", duration: "21:48", preview: false },
        ],
      },
      {
        title: "Building APIs with Express",
        lessons: [
          { title: "Express Crash Course", youtubeId: "L72fhGm1tfE", duration: "30:12", preview: false },
          { title: "Routing & Middleware", youtubeId: "lY6icfhap2o", duration: "23:05", preview: false },
          { title: "REST API Best Practices", youtubeId: "pKd0Rpw7O48", duration: "26:40", preview: false },
        ],
      },
    ],
  },
];

async function seed() {
  await connectDB();
  logger.info("Seeding database...");

  // Clear all collections so seeding yields a clean, consistent state.
  await Promise.all([
    User.deleteMany({}),
    Course.deleteMany({}),
    Enrollment.deleteMany({}),
    Progress.deleteMany({}),
    Payment.deleteMany({}),
    RefreshToken.deleteMany({}),
    Coupon.deleteMany({}),
    Quiz.deleteMany({}),
    Review.deleteMany({}),
    Certificate.deleteMany({}),
    Announcement.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  // Create users individually so the pre-save hook hashes passwords + verified.
  const usersByEmail = {};
  for (const u of seedUsers) {
    const user = new User({ ...u, provider: AUTH_PROVIDER.LOCAL, isEmailVerified: true });
    await user.save();
    usersByEmail[u.email] = user;
  }
  logger.info(`  • ${seedUsers.length} users created`);

  const courses = await Course.insertMany(seedCourses);
  logger.info(`  • ${courses.length} courses created`);

  // --- Demo enrollments + payments + progress (powers dashboards/analytics) ---
  const student = usersByEmail["student@veolms.com"];
  const rohan = usersByEmail["rohan@example.com"];
  const ananya = usersByEmail["ananya@example.com"];
  const sources = ["direct", "search", "social", "referral", "email"];

  const enrollPlan = [
    { user: student, course: courses[0] },
    { user: student, course: courses[1] },
    { user: rohan, course: courses[0] },
    { user: rohan, course: courses[2] },
    { user: ananya, course: courses[1] },
  ];

  let s = 0;
  for (const { user, course } of enrollPlan) {
    const payment = await Payment.create({
      user: user._id,
      course: course._id,
      stripePaymentIntentId: `seed_${user._id}_${course._id}`,
      amount: course.price,
      currency: "usd",
      status: PAYMENT_STATUS.SUCCEEDED,
    });
    await Enrollment.create({
      user: user._id,
      course: course._id,
      amount: course.price,
      payment: payment._id,
      source: sources[s++ % sources.length],
    });
  }

  // Student fully completes course[0] → certificate; partial on course[1].
  const lessonIds = (course) =>
    course.sections.flatMap((sec) => sec.lessons.map((l) => String(l._id)));
  const c0Lessons = lessonIds(courses[0]);
  await Progress.create({
    user: student._id,
    course: courses[0]._id,
    completedLessonIds: c0Lessons,
    lastLessonId: c0Lessons[c0Lessons.length - 1],
  });
  await Certificate.create({
    user: student._id,
    course: courses[0]._id,
    code: Certificate.makeCode(),
  });
  const c1Lessons = lessonIds(courses[1]);
  await Progress.create({
    user: student._id,
    course: courses[1]._id,
    completedLessonIds: c1Lessons.slice(0, 1),
    lastLessonId: c1Lessons[0],
  });
  logger.info(`  • ${enrollPlan.length} enrollments + payments + progress created`);

  // --- Coupons ---
  await Coupon.create([
    { code: "WELCOME20", type: "percent", value: 20, usageLimit: 0, active: true },
    { code: "SAVE10", type: "flat", value: 10, usageLimit: 100, active: true },
  ]);

  // --- Quiz on the React course ---
  await Quiz.create({
    course: courses[1]._id,
    title: "React Fundamentals Check",
    description: "A quick check on the basics covered so far.",
    passingScore: 60,
    questions: [
      {
        prompt: "What hook manages local state in a function component?",
        options: ["useState", "useFetch", "useMemoState", "useLocal"],
        correctIndex: 0,
      },
      {
        prompt: "JSX ultimately compiles to calls to…",
        options: ["document.write", "React.createElement", "innerHTML", "eval"],
        correctIndex: 1,
      },
      {
        prompt: "Props in React are…",
        options: ["mutable", "read-only", "global", "always strings"],
        correctIndex: 1,
      },
    ],
  });

  // --- Reviews ---
  await Review.create([
    {
      course: courses[0]._id,
      user: rohan._id,
      authorName: rohan.name,
      rating: 5,
      body: "Fantastic intro — clear explanations and great pacing.",
    },
    {
      course: courses[1]._id,
      user: ananya._id,
      authorName: ananya.name,
      rating: 4,
      body: "Really solid React content. The hooks section is gold.",
    },
  ]);

  // --- Announcement + a welcome notification for the demo student ---
  const announcement = await Announcement.create({
    scope: "platform",
    title: "Welcome to VeoLMS 🎉",
    body: "New courses drop every month. Check out the latest additions in the catalog!",
    author: usersByEmail["admin@veolms.com"]._id,
    authorName: usersByEmail["admin@veolms.com"].name,
  });
  await Notification.create({
    user: student._id,
    type: "announcement",
    title: announcement.title,
    body: announcement.body,
    link: "/dashboard",
  });
  logger.info("  • coupons, quiz, reviews, announcement & notification created");

  logger.info("✅ Seed complete");
  logger.info("   Super-admin:   superadmin@veolms.com / Super123!");
  logger.info("   Admin login:   admin@veolms.com / Admin123!");
  logger.info("   Instructor:    instructor@veolms.com / Teach123!");
  logger.info("   Student login: student@veolms.com / Student123!");

  await disconnectDB();
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  logger.error(`Seed failed: ${err.message}`, { stack: err.stack });
  process.exit(1);
});
