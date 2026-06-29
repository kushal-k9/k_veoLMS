"use strict";

const express = require("express");
const ctrl = require("../controllers/notification.controller");
const { validate } = require("../middlewares/validate.middleware");
const { requireAuth } = require("../middlewares/auth.middleware");
const s = require("./schemas");

const router = express.Router();

router.use(requireAuth);

router.get("/", ctrl.list);
router.patch("/read-all", ctrl.markAllRead);
router.patch("/:id/read", validate({ params: s.idParams }), ctrl.markRead);

module.exports = router;
