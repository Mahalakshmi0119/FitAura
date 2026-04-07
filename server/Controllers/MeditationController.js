const DailyPlan = require("../Models/DailyPlan");
const { updateStreakIfCompleted } = require("./DashboardController");

exports.addMeditationToday = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    await DailyPlan.findOneAndUpdate(
      { user: userId, date: today },
      { meditationDone: true },
      { new: true }
    );

    // 🔥 update streak if all done
    await updateStreakIfCompleted(userId, today);

    res.json({ message: "Meditation completed 🧘" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
