const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const { addWaterToday, setDailyGoal } = require("../Controllers/WaterController");
const Water = require("../Models/Water");

router.post("/goal", authMiddleware, setDailyGoal);

router.post("/log", authMiddleware, addWaterToday);

router.get("/today-data", authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const water = await Water.findOne({
      user: req.user._id,
      date: today,
    });

    res.json({
      intake: water?.consumed || 0,
      target: water?.target || 2000,
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;









