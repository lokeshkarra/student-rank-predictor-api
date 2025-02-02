# 📊 Student Rank Predictor

This project is a **Student Rank Predictor** based on **NEET quiz performance**. It analyzes quiz performance data, generates insights, and predicts ranks using historical data. Additionally, it provides **topic-wise performance analysis, weak area identification, and improvement trends**.  

---

## 🚀 Features

✅ **Performance Analysis** – Computes accuracy, topic-wise performance, strengths, and weak areas.  
✅ **Weak Areas Identification** – Identifies topics where students struggle the most and suggests improvements.  
✅ **Improvement Trends** – Tracks quiz performance over time to observe trends in accuracy, speed, and scores.  
✅ **NEET Rank Prediction** – Predicts NEET Rank prediction based on past quiz performance over time. (❗️ Note : Rank is not accurate, soon machine learning model is added to improve results)

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Data Handling**: Axios (for fetching historical quiz data)  
- **Version Control**: Git, GitHub  

---

## 💂️ Project Structure

```
/student-rank-predictor
│️── /routes
│️   ├── analysisRoutes.js        # API endpoints for performance analysis
│️   └── prediction.js
│️   
│️── /services
│️   ├── analysisService.js       # Core logic for analyzing performance
│️   └── predictionService.js
│️── package.json                 # Dependencies and scripts
│️── server.js                    # Entry point for the backend
│️──.env                          # Environment variables file
└── README.md                    # Project documentation

```

---

## 🚀 Installation & Setup

### </> Clone the Repository
```bash
git clone https://github.com/your-username/student-rank-predictor.git
cd student-rank-predictor
```

### </> Install Dependencies
```bash
npm install
```

### </> Run the Server
```bash
npm start
```
By default, the server runs on **http://localhost:3000**.

---

## Environment Variables

This application uses the following environment variables:

- `PORT`: The port on which the server will listen (e.g., `3000`).
- `NODE_ENV`: The environment in which the application is running (e.g., `development`, `production`).
- `HISTORICAL_DATA_URL`: The URL for fetching historical quiz data.
- `CURRENT_QUIZ_URL`: The URL for fetching current quiz data.
- `QUIZ_SUBMISSION_URL`: The URL for fetching quiz submission data.

**Example .env file:**

---

## 🛠 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/analysis/performance/:userId` | `GET` | Get detailed performance analysis of a student |
| `/api/analysis/weak-areas/:userId` | `GET` | Identify weak areas and recommended focus |
| `/api/analysis/improvement/:userId` | `GET` | Fetch improvement trends over time |
| `/api/prediction/rank/:userId` | `GET` | Predicts Neet rank based on performance |

📌 **Example Usage**  
for userId : YcDFSO4ZukTJnnFMgRNVwZTE4j42
```bash
GET https://student-rank-predictor-api.onrender.com/api/analysis/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42
```

---

## 🧪 Testing the API

### **Using cURL**
```bash
curl -X GET https://student-rank-predictor-api.onrender.com/analysis/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42
```

### **Using Postman**
1. Open Postman  
2. Make a `GET` request to `https://student-rank-predictor-api.onrender.com/analysis/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42`  
3. View the JSON response  


---

## 📌 Future Improvements

🔹 Predicting potential **college admissions** based on performance and predicted rank.  
🔹 Implementing **ML-based rank prediction**.  
🔹 Improving **data visualization** for trends and analytics.  

---

## 🐟 License

This project is licensed under the **MIT License**.  

---

💡 **Suggestions or Issues?**  
Feel free to open an [issue](https://github.com/lokeshkarra/student-rank-predictor-api/issues) or contribute via a pull request! 🚀

