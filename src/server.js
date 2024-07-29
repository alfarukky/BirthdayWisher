const app = require('./index');
const cronjob = require('./config/cronmail');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const connect = () => {
  mongoose.connect(MONGO_URI);
  mongoose.connection.on('connected', () => {
    console.log('Database connection is successful');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Database connection failed', err);
  });
};

connect();
cronjob.start();

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
