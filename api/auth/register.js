const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { sendVerificationEmail } = require('../../config/mailer');
const jwt = require('jsonwebtoken');
const { validateUserRegistration, validate } = require('../../middleware/validate');

const router = express.Router();

router.post('/', validateUserRegistration, validate, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Send verification email
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    sendVerificationEmail(user.email, token);

    res.status(201).json({ message: 'User registered successfully, verification email sent.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

module.exports = router;
