const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { Contact } = require('../../models');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
  const userId = req.userId;

  try {
    const contacts = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        contacts.push({ ...data, userId });
      })
      .on('end', async () => {
        await Contact.bulkCreate(contacts);
        fs.unlinkSync(req.file.path); // Remove file after processing
        res.status(201).json({ message: 'Contacts uploaded successfully' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload contacts' });
  }
});

module.exports = router;
