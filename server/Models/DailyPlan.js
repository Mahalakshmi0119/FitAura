const mongoose = require("mongoose");

const dailyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    workoutDone: {
      type: Boolean,
      default: false,
    },

    waterDone: {
      type: Boolean,
      default: false,
    },

    sleepDone: {
      type: Boolean,
      default: false,
    },

    meditationDone: {
      type: Boolean,
      default: false,
    },

      streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyPlan", dailyPlanSchema);
