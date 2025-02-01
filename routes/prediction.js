const express = require('express');
const router = express.Router();
const { predictRank } = require('../services/predictionService');

// Get rank prediction for a user
router.get('/rank/:userId', async (req, res) => {
  try {
    const prediction = await predictRank(req.params.userId);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;