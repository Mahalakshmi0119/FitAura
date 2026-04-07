const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const {
  addWorkout,
  getUserWorkouts,
  completeWorkoutToday,   // 👈 NEW
} = require("../Controllers/WorkoutController");

// 🔐 Existing routes (KEEP)
router.post("/add", authMiddleware, addWorkout);
router.get("/user", authMiddleware, getUserWorkouts);

// 🆕 Today action (ADD)
router.post("/today", authMiddleware, completeWorkoutToday);

const Workout = require("../Models/DailyPlan");

router.get("/today", authMiddleware, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const workout = await Workout.findOne({
      user: req.user._id,
      date: today
    });

    res.json({
      done: plan?.workoutDone || false
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

