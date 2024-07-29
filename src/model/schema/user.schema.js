const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  birthdayMD: {
    type: String,
  },
  age: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  const date = new Date(this.dob);
  this.birthdayMD = date.toISOString().slice(5, 10);
  next();

  // calculate the age
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  this.age = age;

  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
