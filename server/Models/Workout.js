const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['cardio', 'strength', 'yoga', 'flexibility'],
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    intensity: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },

    caloriesBurned: {
      type: Number,
      default: 0,
    },

    motivationQuote: {
      type: String,
    },

    notes: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Workout', workoutSchema);
