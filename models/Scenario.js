const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  storyText: String,
  isReal: Boolean,
  category: String,
  realDetails: {
    location: String,
    date: String,
    fullExplanation: String
  }
});

module.exports = mongoose.model('Scenario', scenarioSchema);