const express = require('express');
const User = require('../model/schema/user.schema.js');
const { sendEmail } = require('../config/cronmail.js');
const register = async (req, res) => {
  const { username, email, dob } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'User already exists',
      });
    }
    const user = await User.create({
      username,
      email,
      dob,
    });
    const message = `Dear ${user.username},  We are glad to have you on board. Happy birthday in advance.`;
    sendEmail(message, user);
    return res.status(201).json({
      status: 'success',
      message: 'User successfully created',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = { register };
