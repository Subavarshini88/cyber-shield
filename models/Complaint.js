const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  description: String,
  state: String,
  occupationTargeted: String,
  evidenceImage: {
    data: Buffer,
    contentType: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);