const Workout = require("../Models/Workout");
const DailyPlan = require("../Models/DailyPlan");
const { updateStreakIfCompleted } = require("./DashboardController");

// ADD WORKOUT (history)
exports.addWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      user: req.user._id,
      title: req.body.title,
      type: req.body.type,
      duration: req.body.duration,
      intensity: req.body.intensity,
      motivationQuote: req.body.motivationQuote,
      notes: req.body.notes,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET WORKOUT HISTORY
exports.getUserWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DASHBOARD ACTION
exports.completeWorkoutToday = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    await DailyPlan.findOneAndUpdate(
      { user: userId, date: today },
      { workoutDone: true },
      { upsert: true, new: true }   // 🔥 IMPORTANT
    );

    await updateStreakIfCompleted(userId, today);

    res.status(200).json({
      message: "Workout marked as completed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



