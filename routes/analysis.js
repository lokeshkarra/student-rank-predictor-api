const express = require('express');
const router = express.Router();
const { analyzePerformance, getWeakAreas, getImprovementTrends } = require('../services/analysisService');

// Get performance analysis for a user
router.get('/performance/:userId', async (req, res) => {
  try {
    const analysis = await analyzePerformance(req.params.userId);
    res.json(analysis);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weak areas for a user
router.get('/weak-areas/:userId', async (req, res) => {
  try {
    const weakAreas = await getWeakAreas(req.params.userId);
    res.json(weakAreas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get improvement trends for a user
router.get('/improvement/:userId', async (req, res) => {
  try {
    const trends = await getImprovementTrends(req.params.userId);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
