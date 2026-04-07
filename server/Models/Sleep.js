const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema(
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
    sleepAngle: Number,
    wakeAngle: Number,
    duration: Number, // minutes
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sleep", sleepSchema);

