const nodemailer = require('nodemailer');
const User = require('../model/schema/user.schema');
const cron = require('node-cron');
require('dotenv').config();
const sendEmail = async (message, users) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      connectionTimeout: 60000,
    });
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: users.email,
      subject: 'Greetings From Birthday App',
      text: message,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Email error:', error);
  }
};

function start() {
  console.log('Cron job started');
  cron.schedule('0 7 * * *', async () => {
    const today = new Date();
    const monthDay = today.toISOString().slice(5, 10);
    console.log(monthDay);
    const users = await User.find({ birthdayMD: { $eq: monthDay } });

    console.log(users);
    const message = `Happy birthday to you! Happy birthday to you! Happy birthday dear ${users[0].username}! Happy birthday to you`;
    users.forEach((user) => {
      console.log(user.email);
      sendEmail(message, user).then((result) => {
        console.log('Email sent...', result);
      });
    });
  });
}

module.exports = { sendEmail, start };
