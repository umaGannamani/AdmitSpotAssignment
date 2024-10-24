const express = require('express');
const { Contact } = require('../../models');
const { Parser } = require('json2csv');

const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.userId;

  try {
    const contacts = await Contact.findAll({ where: { userId } });
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(contacts);

    res.header('Content-Type', 'text/csv');
    res.attachment('contacts.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export contacts' });
  }
});

module.exports = router;
