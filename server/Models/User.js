const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    conformPassword:{
      type:String,
      required:true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },

    age: {
      type: Number,
      required: true,
    },
  }
);

module.exports = mongoose.model('User', userSchema);
