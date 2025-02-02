const axios = require('axios');

async function predictRank(userId) {
  try {
    // Fetch user's performance data
    const [submissionData, historicalData] = await Promise.all([
      axios.get('https://api.jsonserve.com/rJvd7g'),
      axios.get('https://api.jsonserve.com/XgAgFJ')
    ]);

    const userHistory = historicalData.data.filter(entry => entry.user_id === userId);
    
    // Calculate prediction factors
    const predictionFactors = calculatePredictionFactors(userHistory);
    
    // Predict rank based on performance metrics
    const predictedRank = calculatePredictedRank(predictionFactors);

    return {
      userId,
      predictedRank,
      confidenceScore: calculateConfidenceScore(predictionFactors),
      factors: predictionFactors
    };
  } catch (error) {
    throw new Error(`Error predicting rank: ${error.message}`);
  }
}

function calculatePredictionFactors(history) {
  return {
    averageAccuracy: calculateAverageAccuracy(history),
    topicCoverage: calculateTopicCoverage(history),
    consistencyScore: calculateConsistencyScore(history),
    improvementRate: calculateImprovementRate(history),
    speedScore: calculateSpeedScore(history)
  };
}

function calculateAverageAccuracy(history) {
  return history.reduce((acc, entry) => 
    acc + parseFloat(entry.accuracy), 0) / history.length;
}

function calculateTopicCoverage(history) {
  const uniqueTopics = new Set(history.map(entry => entry.quiz.topic));
  return (uniqueTopics.size / 79) * 100; // Assuming 79 total topics in NEET
}

function calculateConsistencyScore(history) {
  const accuracies = history.map(entry => parseFloat(entry.accuracy));
  const mean = accuracies.reduce((a, b) => a + b) / accuracies.length;
  const variance = accuracies.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / accuracies.length;
  return 100 - (Math.sqrt(variance) * 10); // Higher consistency = lower variance
}

function calculateImprovementRate(history) {
  const sortedHistory = history.sort((a, b) => 
    new Date(a.submitted_at) - new Date(b.submitted_at)
  );
  
  if (sortedHistory.length < 2) return 0;
  
  const firstScore = parseFloat(sortedHistory[0].final_score);
  const lastScore = parseFloat(sortedHistory[sortedHistory.length - 1].final_score);
  
  return ((lastScore - firstScore) / firstScore) * 100;
}

function calculateSpeedScore(history) {
  return history.reduce((acc, entry) => 
    acc + parseInt(entry.speed), 0) / history.length;
}

function calculatePredictedRank(factors) {
  // Weighted calculation based on various factors
  const weights = {
    accuracy: 0.4,
    topicCoverage: 0.2,
    consistency: 0.2,
    improvement: 0.1,
    speed: 0.1
  };

  const score = (
    factors.averageAccuracy * weights.accuracy +
    factors.topicCoverage * weights.topicCoverage +
    factors.consistencyScore * weights.consistency +
    factors.improvementRate * weights.improvement +
    factors.speedScore * weights.speed
  );

  // Convert score to rank (example mapping)
  const baseRank = 50000; // Median NEET rank
  const rankFactor = 500; // Rank change per point
  return Math.max(1, Math.round(baseRank - (score * rankFactor)));
}

function calculateConfidenceScore(factors) {
  // Calculate confidence based on data quality and quantity
  const consistencyWeight = 0.4;
  const coverageWeight = 0.3;
  const improvementWeight = 0.3;

  return Math.round(
    factors.consistencyScore * consistencyWeight +
    factors.topicCoverage * coverageWeight +
    Math.abs(factors.improvementRate) * improvementWeight
  );
}

module.exports = {
  predictRank
};