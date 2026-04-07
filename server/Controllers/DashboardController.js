const DailyPlan = require("../Models/DailyPlan");
const Workout = require("../Models/Workout");
const Water = require("../Models/Water");
const Sleep = require("../Models/Sleep");

const updateStreakIfCompleted = async (userId, today) => {

  const todayPlan = await DailyPlan.findOne({ user: userId, date: today });

  if (!todayPlan) return;

  if (
    todayPlan.workoutDone &&
    todayPlan.waterDone &&
    todayPlan.sleepDone &&
    todayPlan.meditationDone
  ) {

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = yesterday.toISOString().split("T")[0];

    const yesterdayPlan = await DailyPlan.findOne({
      user: userId,
      date: yesterdayDate,
    });

    todayPlan.streak = yesterdayPlan ? yesterdayPlan.streak + 1 : 1;

    await todayPlan.save();
  }
};
  

// 📊 TODAY DASHBOARD
exports.getTodayDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    // 1️⃣ Find or create DailyPlan
    let dailyPlan = await DailyPlan.findOne({ user: userId, date: today });

    if (!dailyPlan) {
      dailyPlan = await DailyPlan.create({
        user: userId,
        date: today,
      });
    }

    // 2️⃣ Fetch today’s workout
    const workout = await Workout.findOne({
      user: userId,
      createdAt: { $gte: new Date(today) },
    });

    // 3️⃣ Fetch water & sleep
    const water = await Water.findOne({ user: userId, date: today });
    const sleep = await Sleep.findOne({ user: userId, date: today });

    res.status(200).json({
      date: today,
      dailyPlan,
      streak: dailyPlan.streak,
      workout,
      water,
      sleep,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 📊 WEEKLY DASHBOARD (last 7 days)
exports.getWeeklyDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();

    let week = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const dateStr = date.toISOString().split("T")[0];

      const plan = await DailyPlan.findOne({
        user: userId,
        date: dateStr,
      });

      week.push({
        date: dateStr,
        workoutDone: plan ? plan.workoutDone : false,
        waterDone: plan ? plan.waterDone : false,
        sleepDone: plan ? plan.sleepDone : false,
        meditationDone:plan ? plan.meditationDone: false,
      });
    }

    res.status(200).json({ week });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 exports.getYesterdayDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    const dailyPlan = await DailyPlan.findOne({
      user: userId,
      date: yesterdayDate,
    });

    res.status(200).json({
      date: yesterdayDate,
      dailyPlan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ✅ EXPORT STREAK HELPER (AFTER definition)
module.exports.updateStreakIfCompleted = updateStreakIfCompleted;

