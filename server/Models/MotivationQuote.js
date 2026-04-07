const mongoose = require('mongoose');

const motivationQuoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ['fitness', 'discipline', 'health', 'mindset'],
      default: 'fitness',
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MotivationQuote', motivationQuoteSchema);
