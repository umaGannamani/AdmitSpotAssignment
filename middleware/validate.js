const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Invalid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

const validateUserLogin = [
  body('email').isEmail().withMessage('Invalid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

const validateContact = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Invalid email.'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required.'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateContact,
  validate,
};
