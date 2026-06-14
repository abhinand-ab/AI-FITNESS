# 🏋️ AI Fitness Tracker

A full-stack fitness tracking application built using React, Node.js, Express, MongoDB Atlas, and JWT Authentication.

Users can register, log in securely, track workouts, analyze fitness metrics, monitor progress, and visualize workout data through interactive analytics.

---

## 🌐 Live Demo

### Frontend

https://ai-fitness-black.vercel.app

### Backend API

https://ai-fitness-w90y.onrender.com

---

## ✨ Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing with bcryptjs

### Workout Management

* Create Workout
* View Workout History
* Update Existing Workouts
* Delete Workouts
* User-specific workout records

### Fitness Analysis

* BMI Calculation
* Daily Calorie Estimation
* Fitness Category Detection
* Personalized Recommendations

### Analytics

* Total Workouts Counter
* Total Training Volume Calculation
* Progress Tracking
* Interactive Charts

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Database hosted on MongoDB Atlas

---

## 🛠 Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs
* CORS

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
AI-FITNESS
│
├── client
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers an account.
2. Password is hashed using bcryptjs.
3. User logs in with email and password.
4. Server generates JWT token.
5. Token is stored in localStorage.
6. Protected routes verify JWT before allowing access.

---

## 📊 Fitness Assessment Logic

### BMI Formula

BMI = Weight (kg) / Height² (m²)

BMI Categories:

| BMI         | Category    |
| ----------- | ----------- |
| < 18.5      | Underweight |
| 18.5 - 24.9 | Normal      |
| 25 - 29.9   | Overweight  |
| ≥ 30        | Obese       |

---

### Calorie Estimation

Calories are estimated using:

* Age
* Gender
* Height
* Weight
* Activity Level
* Fitness Goal

---

## 📈 Workout Analytics

The dashboard provides:

* Total workouts completed
* Total training volume
* Workout history
* Progress chart visualization

Training Volume:

```text
Volume = Sets × Reps × Weight
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/abhinand-ab/AI-FITNESS.git
cd AI-FITNESS
```

---

## Backend Setup

```bash
cd server
npm install
```

Create `.env`

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

## Frontend Setup

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

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

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

## 📸 Screenshots

### Landing Page

Add screenshot here.

### Dashboard

Add screenshot here.

### Fitness Assessment

Add screenshot here.

### Workout Analytics

Add screenshot here.

---

## 🔮 Future Improvements

* AI Workout Recommendations
* AI Diet Planning
* Exercise Library
* User Profile Management
* Dark/Light Theme Toggle
* Social Features
* Progress Photos
* Goal Tracking
* Email Verification
* Password Reset

---

## 👨‍💻 Author

**Abhinand T V**

GitHub:
https://github.com/abhinand-ab

---

## 📄 License

This project is licensed under the MIT License.
