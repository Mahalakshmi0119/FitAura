require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const DashboardRoutes = require("./Routes/DashboardRoutes");
const waterRoutes = require("./Routes/WaterRoutes");
const sleepRoutes = require("./Routes/SleepRoutes");
const meditationRoutes = require("./Routes/MeditationRoutes");




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./Routes/authRoutes');
const workoutRoutes = require('./Routes/WorkoutRoutes');






app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/meditation", meditationRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("FitAura backend running...");
});

// DB connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


