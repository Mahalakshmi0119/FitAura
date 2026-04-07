const mongoose = require('mongoose');

const dailyHealthSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    sleepHours: {
      type: Number,
      required: true,
    },

    sleepQuality: {
      type: String,
      enum: ['poor', 'average', 'good'],
      required: true,
    },

    steps: {
      type: Number,
      default: 0,
    },

    walkingMinutes: {
      type: Number,
      default: 0,
    },

    waterIntake: {
      type: Number, // liters
      required: true,
    },

    meditationMinutes: {
      type: Number,
      default: 0,
    },

    mood: {
      type: String,
      enum: ['low', 'normal', 'good'],
      required: true,
    },

    completedAll: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DailyHealth', dailyHealthSchema);
