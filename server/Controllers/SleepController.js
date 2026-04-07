const Sleep = require("../Models/Sleep");
const DailyPlan = require("../Models/DailyPlan");
const { updateStreakIfCompleted } = require("./DashboardController");

exports.saveSleep = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];
    const { sleepAngle, wakeAngle } = req.body;

    if (sleepAngle == null || wakeAngle == null) {
      return res.status(400).json({ msg: "Angles required" });
    }

    // 🧮 calculate duration
    let diff = wakeAngle - sleepAngle;
    if (diff < 0) diff += 360;
    const duration = Math.round((diff / 360) * 12 * 60); // minutes

    let sleep = await Sleep.findOne({ user: userId, date: today });

    if (!sleep) {
      sleep = await Sleep.create({
        user: userId,
        date: today,
        sleepAngle,
        wakeAngle,
        duration,
      });
    } else {
      sleep.sleepAngle = sleepAngle;
      sleep.wakeAngle = wakeAngle;
      sleep.duration = duration;
      await sleep.save();
    }


    // ✅ mark dashboard
    await DailyPlan.findOneAndUpdate(
      { user: userId, date: today },
      { sleepDone: true }
    );
await updateStreakIfCompleted(userId,today);
    res.json({ message: "Sleep saved 😴", sleep });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

};

   
        

  
    
      

 

