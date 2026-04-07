const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { addMeditationToday } = require("../Controllers/MeditationController");

router.post("/today", authMiddleware, addMeditationToday);

module.exports = router;
