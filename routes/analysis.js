// const express = require('express');
// const router = express.Router();
// const { analyzePerformance, getWeakAreas, getImprovementTrends } = require('../services/analysisService');

// // Utility function for validating userId
// const validateUserId = (userId) => {
//   if (!userId) {
//     throw new Error('User ID is required.');
//   }
//   // if (isNaN(userId)) {
//   //   throw new Error('User ID must be a valid number.');
//   // }
// };

// // Get performance analysis for a user
// router.get('/performance/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     //validateUserId(userId);

//     const analysis = await analyzePerformance(Number(userId));
//     res.json({ success: true, data: analysis });
//   } catch (error) {
//     const statusCode = error.message.includes('User ID') ? 400 : 500;
//     res.status(statusCode).json({ success: false, error: error.message });
//   }
// });

// // Get weak areas for a user
// router.get('/weak-areas/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     //validateUserId(userId);

//     const weakAreas = await getWeakAreas(Number(userId));
//     res.json({ success: true, data: weakAreas });
//   } catch (error) {
//     const statusCode = error.message.includes('User ID') ? 400 : 500;
//     res.status(statusCode).json({ success: false, error: error.message });
//   }
// });

// // Get improvement trends for a user
// router.get('/improvement/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Validate userId
//     //validateUserId(userId);
//     console.log("method called")

//     const trends = await getImprovementTrends(Number(userId));
//     res.json({ success: true, data: trends });
//   } catch (error) {
//     const statusCode = error.message.includes('User ID') ? 400 : 500;
//     res.status(statusCode).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;


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





// const express = require('express');
// const router = express.Router();
// const { analyzePerformance, getWeakAreas, getImprovementTrends } = require('../services/analysisService');

// // Get performance analysis for a user
// router.get('/performance/:userId', async (req, res) => {
//   try {
//     const analysis = await analyzePerformance(req.params.userId);
//     res.json(analysis);
    
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get weak areas for a user
// router.get('/weak-areas/:userId', async (req, res) => {
//   try {
//     const weakAreas = await getWeakAreas(req.params.userId);
//     res.json(weakAreas);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get improvement trends for a user
// router.get('/improvement/:userId', async (req, res) => {
//   try {
//     const trends = await getImprovementTrends(req.params.userId);
//     res.json(trends);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;