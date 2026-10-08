const express = require('express');
const router = express.Router();
const multer = require('multer');
const Complaint = require('../models/Complaint');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('evidenceImage'), async (req, res) => {
  try {
    const { reportedBy, category, description, state, occupationTargeted } = req.body;

    const newComplaint = new Complaint({
      reportedBy,
      category,
      description,
      state,
      occupationTargeted,
      evidenceImage: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : undefined
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Personalized risk warning
router.get('/risk-warning/:userId', async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const topRisks = await Complaint.aggregate([
      { $match: { state: user.state, occupationTargeted: user.occupation } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    res.json({ user: { state: user.state, occupation: user.occupation }, topRisks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;