const express = require('express');
const { Contact } = require('../../models');
const { validateContact, validate } = require('../../middleware/validate');

const router = express.Router();

router.put('/:id', validateContact, validate, async (req, res) => {
  const contactId = req.params.id;
  const userId = req.userId; // From the auth middleware
  const { name, email, phoneNumber, address, timezone } = req.body;

  try {
    const contact = await Contact.findOne({ where: { id: contactId, userId } });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.name = name;
    contact.email = email;
    contact.phoneNumber = phoneNumber;
    contact.address = address;
    contact.timezone = timezone;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

module.exports = router;
