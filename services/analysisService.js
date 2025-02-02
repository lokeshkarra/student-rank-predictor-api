const axios = require('axios');
const dotenv = require('dotenv');

// --------------------- Utility functions -----------------------------//

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
}

// Fetch and filter user history
async function getUserHistory(userId) {
    const history = await fetchData(process.env.HISTORICAL_DATA_URL);
  return history.filter(entry => entry.user_id === userId);
}

// Fetch current quiz and submission data

async function getCurrentQuizAndSubmission() {
  const quizData = await fetchData(process.env.CURRENT_QUIZ_URL);
  const submissionData = await fetchData(process.env.QUIZ_SUBMISSION_URL);
 
return {
  quiz: quizData.quiz,
  submission: submissionData
};
}


// --------------------- Analysis functions -----------------------------//

// Analyze performance metrics
async function analyzePerformance(userId) {
  try {
    const userHistory = await getUserHistory(userId);
    const {quiz, submission} = await getCurrentQuizAndSubmission();
    

    const performanceMetrics = {
      averageAccuracy: calculateAverageAccuracy(userHistory),
      topicWisePerformance: calculateTopicWisePerformance(userHistory),
      strengthAreas: identifyStrengthAreas(userHistory),
      weakAreas: identifyWeakAreas(userHistory, submission, quiz),
      currentQuizAnalysis: analyzeCurrentQuiz(submission,quiz),

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
      const { quiz, submission } = await getCurrentQuizAndSubmission();
      const weakAreas = identifyWeakAreas(userHistory, submission, quiz);
      
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


// --------------------- Helper functions -----------------------------//
// function calculateAverageAccuracy(history) {
//     if (!history || !history.length) return 0;
//     return (
//       history.reduce((acc, entry) => acc + parseFloat(entry.accuracy), 0) / history.length
//     );
//   }

function calculateAverageAccuracy(history) {
  if (!history || !history.length) return 0;

  let totalCorrectAnswers = 0;
  let totalQuestions = 0;

  history.forEach(entry => {
      totalCorrectAnswers += entry.correct_answers;
    totalQuestions += entry.total_questions;
  });


  return totalQuestions > 0 ? (totalCorrectAnswers / totalQuestions) * 100 : 0;
}

function calculateTopicWisePerformance(history) {
  const topicPerformance = {};

  if(!history || !history.length) return topicPerformance;
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


function identifyWeakAreas(history, submission, quiz) {
    const historicalWeakAreas = calculateTopicWisePerformance(history)
      .filter(topic => topic.accuracy < 60)
      .map(topic => topic.topic);
  
    const currentQuizWeakAreas =  getCurrentQuizWeakAreas(submission, quiz);
  
    // Combine and deduplicate weak areas
    return Array.from(new Set([...historicalWeakAreas, ...currentQuizWeakAreas]));
}



function calculateImprovementTrends(history) {
  if (!history || !history.length) return [];

  const sortedHistory = history.sort((a, b) => new Date(a.submitted_at) - new Date(b.submitted_at));

  const trendsData = sortedHistory.map(entry => ({
    date: entry.submitted_at,
    accuracy: parseFloat(entry.accuracy.replace('%', '')),
    speed: parseInt(entry.speed),
    score: parseFloat(entry.final_score),
  }));

    const rollingAccuracy = calculateRollingAverage(trendsData, 3);

    const trendAnalysis =  calculateTrendAnalysis(trendsData)
  return {
      trends: trendsData,
      rollingAccuracy,
      trendAnalysis
  }
}

function calculateRollingAverage(data, windowSize) {
  if(data.length < windowSize) return [];
  return data.map((entry, index) => {
    if (index < windowSize - 1) {
        return null;
    }

    let sum = 0;
      for (let i = 0; i < windowSize; i++) {
          sum += data[index - i].accuracy;
      }
    return {
        date: entry.date,
      rollingAverage: (sum / windowSize).toFixed(2),
    };
  }).filter(item => item !== null)
}

function calculateTrendAnalysis(data) {
    if (data.length < 2) {
        return {
            overallAccuracyTrend: "Insufficient data",
        };
      }
    const firstAccuracy = data[0].accuracy;
    const lastAccuracy = data[data.length - 1].accuracy;

    let overallAccuracyTrend = "";
    if (lastAccuracy > firstAccuracy) {
        overallAccuracyTrend = "Improving";
    } else if (lastAccuracy < firstAccuracy) {
        overallAccuracyTrend = "Declining";
    } else {
        overallAccuracyTrend = "Stable";
    }
    return {
        overallAccuracyTrend,
        firstAccuracy,
        lastAccuracy
    };
}

function generateRecommendations(weakAreas) {
  return weakAreas.map(topic => ({
    topic,
    recommendedPractice: 'Daily 30-minute focused practice',
    resources: `Study materials for ${topic}`,
  }));
}
function getCurrentQuizWeakAreas(submission, quiz) {
    if(!submission || !quiz || !quiz.questions) return [];
    const questionMap = {};
  
    // Create map of question IDs to question objects
    quiz.questions.forEach(q => (questionMap[q.id] = q));
  
    // Find incorrect answers from response_map
    const incorrectQuestions = Object.keys(submission.response_map).filter(
      questionId => {
        const selectedOptionId = submission.response_map[questionId];
        const question = questionMap[questionId];
        if (!question) return false;
        const correctOption = question.options.find(option => option.is_correct);
        return correctOption && correctOption.id !== selectedOptionId;
      }
    );
    // Get Topics of incorrectly answered questions
    return incorrectQuestions.map(id=> questionMap[id].topic)
  }



function analyzeCurrentQuiz(submission, quiz) {
  if (!submission || !quiz || !quiz.questions) return {};

  const questionMap = {};
  quiz.questions.forEach(q => (questionMap[q.id] = q));

  let correctAnswersCount = 0;
  const incorrectQuestions = [];

  for (const questionId in submission.response_map) {
    const selectedOptionId = submission.response_map[questionId];
    const question = questionMap[questionId];

    if (!question) continue; // Skip if question not found

    const correctOption = question.options.find(option => option.is_correct);

    if (correctOption && correctOption.id === selectedOptionId) {
        correctAnswersCount++;
    } else {
      incorrectQuestions.push(questionId);
    }
  }

  const incorrectQuestionsAnalysis = incorrectQuestions.map(id => {
    const question = questionMap[id];
    return {
      questionId: id,
      topic: question.topic,
      difficulty_level: question.difficulty_level
    };
  });
  
    const totalQuestions = quiz.questions.length;
    const accuracy = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

  return {
    total_questions: totalQuestions,
    correct_answers_count: correctAnswersCount,
    incorrect_questions_count: incorrectQuestions.length,
    accuracy: accuracy.toFixed(2),       // Accuracy up to 2 decimal places
    incorrect_questions: incorrectQuestionsAnalysis,
    
     
  };
}


module.exports = {
  analyzePerformance,
  getWeakAreas,
  getImprovementTrends,
};