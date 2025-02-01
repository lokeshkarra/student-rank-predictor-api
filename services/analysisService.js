const axios = require('axios');

const HISTORICAL_DATA_URL = 'https://api.jsonserve.com/XgAgFJ';

// Fetch and filter user history
async function getUserHistory(userId) {
  try {
    const response = await axios.get(HISTORICAL_DATA_URL);
    return response.data.filter(entry => entry.user_id === userId);
  } catch (error) {
    throw new Error(`Failed to fetch user history: ${error.message}`);
  }
}

// Analyze performance metrics
async function analyzePerformance(userId) {
  try {
    const userHistory = await getUserHistory(userId);

    const performanceMetrics = {
      averageAccuracy: calculateAverageAccuracy(userHistory),
      topicWisePerformance: calculateTopicWisePerformance(userHistory),
      strengthAreas: identifyStrengthAreas(userHistory),
      weakAreas: identifyWeakAreas(userHistory),
    };

    

    return performanceMetrics;
  } catch (error) {
    throw new Error(`Error analyzing performance: ${error.message}`);
  }
}

// Get weak areas with recommendations
async function getWeakAreas(userId) {
  try {
    const userHistory = await getUserHistory(userId);
    const weakAreas = identifyWeakAreas(userHistory);

    return {
      topics: weakAreas,
      recommendedFocus: generateRecommendations(weakAreas),
    };
  } catch (error) {
    throw new Error(`Error getting weak areas: ${error.message}`);
  }
}

// Get improvement trends
async function getImprovementTrends(userId) {
  try {
    const userHistory = await getUserHistory(userId);
    return calculateImprovementTrends(userHistory);
  } catch (error) {
    throw new Error(`Error getting improvement trends: ${error.message}`);
  }
}

// Helper functions
function calculateAverageAccuracy(history) {
  if (!history.length) return 0;
  return (
    history.reduce((acc, entry) => acc + parseFloat(entry.accuracy), 0) / history.length
  );
}

function calculateTopicWisePerformance(history) {
  const topicPerformance = {};

  history.forEach(entry => {
    const topic = entry.quiz.topic;
    if (!topicPerformance[topic]) {
      topicPerformance[topic] = {
        totalQuestions: 0,
        correctAnswers: 0,
      };
    }
    topicPerformance[topic].totalQuestions += entry.total_questions;
    topicPerformance[topic].correctAnswers += entry.correct_answers;
  });

  return Object.entries(topicPerformance).map(([topic, data]) => ({
    topic,
    accuracy: (data.correctAnswers / data.totalQuestions) * 100,
  }));
}

function identifyStrengthAreas(history) {
  return calculateTopicWisePerformance(history)
    .filter(topic => topic.accuracy >= 75)
    .map(topic => topic.topic);
}

function identifyWeakAreas(history) {
  return calculateTopicWisePerformance(history)
    .filter(topic => topic.accuracy < 60)
    .map(topic => topic.topic);
}

function calculateImprovementTrends(history) {
  const sortedHistory = history.sort((a, b) =>
    new Date(a.submitted_at) - new Date(b.submitted_at)
  );

  return sortedHistory.map(entry => ({
    date: entry.submitted_at,
    accuracy: parseFloat(entry.accuracy),
    speed: parseInt(entry.speed),
    score: parseFloat(entry.final_score),
  }));
}

function generateRecommendations(weakAreas) {
  return weakAreas.map(topic => ({
    topic,
    recommendedPractice: 'Daily 30-minute focused practice',
    resources: `Study materials for ${topic}`,
  }));
}

module.exports = {
  analyzePerformance,
  getWeakAreas,
  getImprovementTrends,
};





// const axios = require('axios');




// const HISTORICAL_DATA_URL = 'https://api.jsonserve.com/XgAgFJ';


// async function analyzePerformance(userId) {
//   try {

//     const historicalData = await axios.get(HISTORICAL_DATA_URL);
    



//     // Rest of your code remains unchanged
//     const userHistory = historicalData.data.filter(entry => entry.user_id === userId);

//     const performanceMetrics = {
//       averageAccuracy: calculateAverageAccuracy(userHistory),
//       topicWisePerformance: analyzeTopicWisePerformance(userHistory),
//       strengthAreas: identifyStrengthAreas(userHistory),
//       weakAreas: identifyWeakAreas(userHistory)
//     };

//     return performanceMetrics;
//   } catch (error) {
//     throw new Error(`Error analyzing performance: ${error.message}`);
//   }
// }

// // Continue with your existing implementation


// async function getWeakAreas(userId) {
//   try {
//     const historicalData = await axios.get(HISTORICAL_DATA_URL);
//     const userHistory = historicalData.data.filter(entry => entry.user_id === userId);

//     return analyzeWeakAreas(userHistory);
//   } catch (error) {
//     throw new Error(`Error getting weak areas: ${error.message}`);
//   }
// }

// async function getImprovementTrends(userId) {
//   try {
//     const historicalData = await axios.get(HISTORICAL_DATA_URL);
//     const userHistory = historicalData.data.filter(entry => entry.user_id === userId);

//     return calculateImprovementTrends(userHistory);
//   } catch (error) {
//     throw new Error(`Error getting improvement trends: ${error.message}`);
//   }
// }

// // Helper functions
// function calculateAverageAccuracy(history) {
//   return history.reduce((acc, entry) => {
//     return acc + parseFloat(entry.accuracy);
//   }, 0) / history.length;
// }

// function analyzeTopicWisePerformance(history) {
//   const topicPerformance = {};
  
//   history.forEach(entry => {
//     const topic = entry.quiz.topic;
//     if (!topicPerformance[topic]) {
//       topicPerformance[topic] = {
//         totalQuestions: 0,
//         correctAnswers: 0
//       };
//     }
    
//     topicPerformance[topic].totalQuestions += entry.total_questions;
//     topicPerformance[topic].correctAnswers += entry.correct_answers;
//   });

//   return Object.entries(topicPerformance).map(([topic, data]) => ({
//     topic,
//     accuracy: (data.correctAnswers / data.totalQuestions) * 100
//   }));
// }

// function identifyStrengthAreas(history) {
//   const topicPerformance = analyzeTopicWisePerformance(history);
//   return topicPerformance
//     .filter(topic => topic.accuracy >= 75)
//     .map(topic => topic.topic);
// }

// function identifyWeakAreas(history) {
//   const topicPerformance = analyzeTopicWisePerformance(history);
//   return topicPerformance
//     .filter(topic => topic.accuracy < 60)
//     .map(topic => topic.topic);
// }

// function analyzeWeakAreas(history) {
//   const weakAreas = identifyWeakAreas(history);
//   return {
//     topics: weakAreas,
//     recommendedFocus: generateRecommendations(weakAreas)
//   };
// }

// function calculateImprovementTrends(history) {
//   const sortedHistory = history.sort((a, b) => 
//     new Date(a.submitted_at) - new Date(b.submitted_at)
//   );

//   return sortedHistory.map(entry => ({
//     date: entry.submitted_at,
//     accuracy: parseFloat(entry.accuracy),
//     speed: parseInt(entry.speed),
//     score: parseFloat(entry.final_score)
//   }));
// }

// function generateRecommendations(weakAreas) {
//   return weakAreas.map(topic => ({
//     topic,
//     recommendedPractice: 'Daily 30-minute focused practice',
//     resources: `Study materials for ${topic}`
//   }));
// }

// module.exports = {
//   analyzePerformance,
//   getWeakAreas,
//   getImprovementTrends
// };