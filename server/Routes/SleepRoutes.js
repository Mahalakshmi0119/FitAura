const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const { saveSleep } = require("../Controllers/SleepController");
const Sleep = require("../Models/Sleep"); // ✅ IMPORTANT

router.post("/today", authMiddleware, saveSleep);
router.get("/check", authMiddleware, async (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  const sleep = await Sleep.findOne({
    user: req.user._id,
    date: today
  });

   console.log("SLEEP FOUND:", sleep); 
     res.json({
      hours: sleep ? Math.round(sleep.duration / 60) : 0   // ✅ FIX
    });
});

module.exports = router;
