const express = require('express');
const userRouter = require('./router/user.router.js');
const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use('/addUser', userRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

module.exports = app;
