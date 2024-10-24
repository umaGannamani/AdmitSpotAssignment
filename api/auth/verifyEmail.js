const express = require('express');
const { User } = require('../../models');

const router = express.Router();

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || user.verified) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.verified = true;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

module.exports = router;
