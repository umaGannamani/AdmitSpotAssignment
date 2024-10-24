const express = require('express');
const { Contact } = require('../../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.userId;
  const { name, email, timezone, sort } = req.query;

  try {
    const queryOptions = {
      where: { userId },
      order: sort ? [[sort, 'ASC']] : [],
    };

    if (name) queryOptions.where.name = name;
    if (email) queryOptions.where.email = email;
    if (timezone) queryOptions.where.timezone = timezone;

    const contacts = await Contact.findAll(queryOptions);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

module.exports = router;
