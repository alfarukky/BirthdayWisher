const express = require('express');
const controller = require('../controller/userController.js');
const middleware = require('../middleware/user.middleware.js');

const router = express.Router();
router.post('/', middleware.validateUser, controller.register);

module.exports = router;
