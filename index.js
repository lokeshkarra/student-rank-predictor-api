// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const dotenv = require('dotenv');

// const analysisRoutes = require('./routes/analysis');
// const predictionRoutes = require('./routes/prediction');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());

// // Routes
// app.use('/api/analysis', analysisRoutes);
// app.use('/api/prediction', predictionRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const analysisRoutes = require('./routes/analysis');
const predictionRoutes = require('./routes/prediction');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Default API Endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Student Rank Predictor API!',
        description: 'This API provides endpoints for analyzing student quiz performance and predicting ranks.',
        endpoints: {
            '/api/analysis/performance/:userId': {
                method: 'GET',
                description: 'Get performance metrics for a specific user.'
            },
            '/api/analysis/weak-areas/:userId': {
                method: 'GET',
                description: 'Get weak areas and recommendations for a specific user.'
            },
           '/api/analysis/improvement-trends/:userId': {
               method: 'GET',
               description: 'Get improvement trends for a specific user.'
            },
            '/api/prediction/rank/:userId': {
              method: 'GET',
                description: 'Predict rank for a specific user.'
            }

        },
        version: '1.0.0',
    });
});


// Routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/prediction', predictionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});