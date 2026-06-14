# 🏋️ AI Fitness Tracker

A modern full-stack fitness tracking application that helps users monitor workouts, analyze fitness metrics, and visualize progress through interactive dashboards.

Built with **React**, **Node.js**, **Express**, **MongoDB Atlas**, and **JWT Authentication**.

---

## 🚀 Live Demo

### Frontend

https://ai-fitness-black.vercel.app

### Backend API

https://ai-fitness-w90y.onrender.com

---

## 📸 Preview

> Add screenshots of your landing page, dashboard, analytics, and workout history here.

---

## ✨ Features

### 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected API Routes
* Password Hashing using bcryptjs

### 💪 Workout Management

* Create Workouts
* View Workout History
* Update Existing Workouts
* Delete Workouts
* User-Specific Workout Data

### 📊 Fitness Assessment

* BMI Calculation
* Daily Calorie Estimation
* Fitness Category Classification
* Personalized Fitness Recommendations

### 📈 Progress Analytics

* Workout Progress Tracking
* Training Volume Calculation
* Interactive Charts
* Workout History Dashboard

### ☁️ Cloud Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Token)
* bcryptjs
* CORS

### Deployment

* Vercel
* Render

---

## 🏗️ Architecture

```text
Client (React + Tailwind)
        │
        ▼
REST API (Express.js)
        │
        ▼
MongoDB Atlas
```

---

## 📂 Project Structure

```text
AI-FITNESS-TRACKER
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📊 Fitness Analysis Logic

### BMI Formula

```text
BMI = Weight (kg) / Height² (m²)
```

### BMI Categories

| BMI Range   | Category    |
| ----------- | ----------- |
| < 18.5      | Underweight |
| 18.5 - 24.9 | Normal      |
| 25 - 29.9   | Overweight  |
| ≥ 30        | Obese       |

### Training Volume

```text
Volume = Sets × Reps × Weight
```

Used to measure workout intensity and progress over time.

---

## 🔌 API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

#### Login User

```http
POST /api/auth/login
```

---

### Workouts

#### Create Workout

```http
POST /api/workouts
```

#### Get Workouts

```http
GET /api/workouts
```

#### Update Workout

```http
PUT /api/workouts/:id
```

#### Delete Workout

```http
DELETE /api/workouts/:id
```

---

### Fitness Analysis

```http
POST /api/fitness/analyze
```

---

## ⚙️ Local Development Setup

### Clone Repository

```bash
git clone https://github.com/abhinand-ab/AI-FITNESS.git
cd AI-FITNESS
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🎯 Learning Outcomes

This project demonstrates:

* Full-Stack Web Development
* REST API Design
* JWT Authentication
* MongoDB Database Integration
* React State Management
* Data Visualization
* Cloud Deployment
* CRUD Operations
* Secure Backend Development

---

## 🔮 Future Enhancements

* AI Workout Recommendations
* AI Diet Planning
* User Profile Management
* Goal Tracking System
* Exercise Library
* Progress Photo Tracking
* Email Verification
* Password Reset Functionality
* Social Fitness Community
* Mobile Application

---

## 👨‍💻 Author

**Abhinand T V**

GitHub: https://github.com/abhinand-ab

---

## ⭐ Support

If you found this project helpful, consider giving it a star on GitHub.

---

## 📄 License

This project is licensed under the MIT License.
