const express = require('express');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { sendResetPasswordEmail } = require('../../config/mailer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    sendResetPasswordEmail(email, token);
    res.json({ message: 'Reset password email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send reset password email' });
  }
});

// Handle password update after token verification
router.post('/update/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
});

module.exports = router;
