const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { validateUserLogin, validate } = require('../../middleware/validate');

const router = express.Router();

router.post('/', validateUserLogin, validate, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user.' });
  }
});

module.exports = router;
