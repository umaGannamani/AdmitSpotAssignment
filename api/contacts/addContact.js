const express = require('express');
const { Contact } = require('../../models');
const { validateContact, validate } = require('../../middleware/validate');

const router = express.Router();

router.post('/', validateContact, validate, async (req, res) => {
  const { name, email, phoneNumber, address, timezone } = req.body;
  const userId = req.userId; // From the auth middleware

  try {
    const contact = await Contact.create({ name, email, phoneNumber, address, timezone, userId });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

module.exports = router;
