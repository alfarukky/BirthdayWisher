// validation.js
const Joi = require('joi');

// Define the Joi schema for the user data
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  dob: Joi.date().required(),
});

// Middleware function for validation
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = { validateUser };
