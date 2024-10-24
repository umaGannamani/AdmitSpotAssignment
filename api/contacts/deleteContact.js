const express = require('express');
const { Contact } = require('../../models');

const router = express.Router();

router.delete('/:id', async (req, res) => {
  const contactId = req.params.id;
  const userId = req.userId; // From the auth middleware

  try {
    const contact = await Contact.findOne({ where: { id: contactId, userId } });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.deletedAt = new Date(); // Soft delete
    await contact.save();
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
