const Water = require("../Models/Water");
const DailyPlan = require("../Models/DailyPlan");
const { updateStreakIfCompleted } = require("./DashboardController");

exports.addWaterToday = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];
    const amount = req.body.amount;

    let water = await Water.findOne({ user: userId, date: today });

    if (!water) {
      water = await Water.create({
        user: userId,
        date: today,
        consumed: amount,
      });
    } else {
      water.consumed += amount;
      await water.save();
    }

    await DailyPlan.findOneAndUpdate(
      { user: userId, date: today },
      { waterDone: true },
      { upsert: true }
    );

 await updateStreakIfCompleted(userId,today);
    res.json({
      intake: water.consumed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.setDailyGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];
    const { age, weight } = req.body;

    let target = weight * 35;

    if (age > 50) target -= 200;
    if (age < 18) target -= 300;

    let water = await Water.findOne({ user: userId, date: today });

    if (!water) {
      water = await Water.create({
        user: userId,
        date: today,
        target,
      });
    } else {
      water.target = target;
      await water.save();
    }

    res.json({ target });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




