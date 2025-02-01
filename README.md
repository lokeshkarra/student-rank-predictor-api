# 📊 Student Rank Predictor

This project is a **Student Rank Predictor** based on **NEET quiz performance**. It analyzes quiz performance data, generates insights, and predicts ranks using historical data. Additionally, it provides **topic-wise performance analysis, weak area identification, and improvement trends**.  

---

## 🚀 Features

✅ **Performance Analysis** – Computes accuracy, topic-wise performance, strengths, and weak areas.  
✅ **Weak Areas Identification** – Identifies topics where students struggle the most and suggests improvements.  
✅ **Improvement Trends** – Tracks quiz performance over time to observe trends in accuracy, speed, and scores.  
✅ **NEET Rank Prediction** – Predicts NEET Rank prediction based on past quiz performance over time. 

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
└── README.md                    # Project documentation

```

---

## 🚀 Installation & Setup

### 1⃣ Clone the Repository
```bash
git clone https://github.com/your-username/student-rank-predictor.git
cd student-rank-predictor
```

### 2⃣ Install Dependencies
```bash
npm install
```

### 3⃣ Run the Server
```bash
npm start
```
By default, the server runs on **http://localhost:3000**.

---

## 🛠 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/performance/:userId` | `GET` | Get detailed performance analysis of a student |
| `/api/weak-areas/:userId` | `GET` | Identify weak areas and recommended focus |
| `/api/improvement/:userId` | `GET` | Fetch improvement trends over time |
| `/api/prediction/rank/:userId` | `GET` | Predicts Neet rank based on performance |

📌 **Example Usage**  
for userId : YcDFSO4ZukTJnnFMgRNVwZTE4j42
```bash
GET http://localhost:3000/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42
```

---

## 🧪 Testing the API

### **Using cURL**
```bash
curl -X GET http://localhost:3000/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42
```

### **Using Postman**
1. Open Postman  
2. Make a `GET` request to `http://localhost:3000/performance/YcDFSO4ZukTJnnFMgRNVwZTE4j42`  
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

