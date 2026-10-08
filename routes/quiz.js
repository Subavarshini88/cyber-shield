const express = require('express');
const router = express.Router();
const Scenario = require('../models/Scenario');

// Get one random scenario
router.get('/random', async (req, res) => {
  try {
    const scenario = await Scenario.aggregate([{ $sample: { size: 1 } }]);
    if (scenario.length === 0) return res.status(404).json({ error: "No scenarios found" });
    res.json(scenario[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a guess
router.post('/answer', async (req, res) => {
  try {
    const { scenarioId, userGuess } = req.body;
    const scenario = await Scenario.findById(scenarioId);
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });

    const isCorrect = (userGuess === scenario.isReal);

    res.json({
      isCorrect,
      actualAnswer: scenario.isReal,
      details: scenario.realDetails
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;