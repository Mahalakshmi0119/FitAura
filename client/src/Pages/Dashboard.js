import React, { useEffect, useState } from "react";
import axios from "axios";
import TodayPlanCard from "../Components/TodayPlanCard";
import YesterdayMiniCard from "../Components/YesterdayMiniCard";
import WeeklyStreak from "../Components/WeeklyStreak";
import "./Dashboard.css";
import ProgressRing from "../Components/ProgressRing";
import Confetti from "react-confetti";
import Navbar from "../Components/Navbar";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [yesterday, setYesterday] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const user=JSON.parse(localStorage.getItem('user'));

  const token = localStorage.getItem("token");
  let greeting='hello';
   
const hour=new Date().getHours();
if(hour<12)greeting='Good morning';
else if(hour<18)greeting='Good Afternoon';
else greeting='Good Evening';
  

  

  /* ================= FETCH DATA ================= */
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/today",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDashboard(res.data.dailyPlan);
    } catch (err) {
      console.error("Failed to load dashboard", err);
    }
  };

  const fetchYesterday = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/yesterday",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setYesterday(res.data.dailyPlan);
    } catch (err) {
      console.error("Failed to load yesterday", err);
    }
  };

  const fetchWeekly = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/dashboard/weekly",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setWeekly(res.data.week);
  };

  /* ================= EFFECTS ================= */

  useEffect(() => {
    fetchDashboard();
    fetchYesterday();
    fetchWeekly();
  }, []);

  useEffect(() => {
    const now = new Date();
    const millisTillMidnight =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        2
      ) - now;

    const timer = setTimeout(() => {
      fetchDashboard();
    }, millisTillMidnight);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lastDate = localStorage.getItem("lastVisitDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastDate !== today) {
      localStorage.setItem("lastVisitDate", today);
      fetchDashboard();
    }
  }, []);

  /* ================= HANDLERS ================= */
  const handleWorkout = async () => {
    await axios.post(
      "http://localhost:5000/api/workouts/today",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchDashboard();
  };

const handleWater = async () => {

  await axios.post(
    "http://localhost:5000/api/water/log",
    {amount:0},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
   fetchDashboard();
};


  const handleSleep = async () => {
    try {
    await axios.post(
      "http://localhost:5000/api/sleep/today",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchDashboard();
  } catch(err){
    alert("⚠️ Warning:please record sleep time first in sleep page")
  }
}
  


  const handleMeditation = async () => {
    await axios.post(
      "http://localhost:5000/api/meditation/today",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchDashboard();
  };

 
   /* ================= PROGRESS ================= */
 const totalTasks = 4;
const completedCount = dashboard
  ? [
      dashboard.workoutDone,
      dashboard.waterDone,
      dashboard.sleepDone,
      dashboard.meditationDone,
    ].filter(Boolean).length
  : 0;


  const progressPercent = (completedCount / totalTasks) * 100;

  /* 🎉 CONFETTI */
  useEffect(() => {
    if (progressPercent === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [progressPercent]);


  useEffect(() => {
  const handleFocus = () => {
    fetchDashboard();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };
}, []);

  /* 🎨 COLOR */
  let progressColor = "#f59e0b";

  if (progressPercent >= 50 && progressPercent < 100) {
    progressColor = "#3b82f6";
  }

  if (progressPercent === 100) {
    progressColor = "#f59e0b";
  }
  let insightMessage = "";

if (completedCount === 4) {
  insightMessage = "🎉 Amazing work! You completed all habits today.";
} 
else if (completedCount === 3) {
  insightMessage = "🔥 Great effort! Just one more habit for a perfect day.";
} 
else if (completedCount >= 1) {
  insightMessage = "🌱 Good start! Try completing a few more habits.";
} 
else {
  insightMessage = "✨ Every day is a fresh start. Begin with one habit.";
}
   if (!dashboard) return <p>Loading...</p>;
  return (
    <div className="page-container"> 
    <div className="dashboard-container">
      {showConfetti && (
        <Confetti
          numberOfPieces={120}
          gravity={0.08}
          colors={["#facc15", "#93c5fd", "#ffffff"]}
        />
      )}

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
  <div className="dashboard-header">                
  <div className="left">
    <h2>Hello {user?.name} 👋</h2>
    <p className="sub-text">{greeting}</p>
  </div>


  </div>
        <span
          style={{
            fontSize: "14px",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>

      {/* STREAK */}
      <div style={{ marginBottom: "20px" }}>
        <h3>🔥 {dashboard.streak} Day Streak</h3>
        <p>Keep going! Consistency builds results 💪</p>
      </div>

      {/* PROGRESS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "30px",
        }}
      >
        <ProgressRing
          progress={progressPercent}
          color={progressColor}
        />

        <div>
          <p style={{ fontWeight: "600", margin: 0 }}>
            Progress
          </p>
          <p style={{ color: "#6b7280", margin: 0 }}>
            {completedCount} / {totalTasks} completed
          </p>
        </div>
      </div>

      {completedCount === totalTasks && (
        <div className="perfect-day">🏆 Perfect Day!</div>
      )}
     <p className="daily-insight">{insightMessage}</p>
      {/* YESTERDAY */}
      {yesterday && (
        <div className="section-box">
          <h3>📅 Yesterday</h3>

          <div style={{ display: "flex", gap: "14px" }}>
            <YesterdayMiniCard
              title="Workout"
              icon="🏋️"
              done={yesterday.workoutDone}
            />
            <YesterdayMiniCard
              title="Water"
              icon="💧"
              done={yesterday.waterDone}
            />
            <YesterdayMiniCard
              title="Sleep"
              icon="😴"
              done={yesterday.sleepDone}
            />
            <YesterdayMiniCard
              title="Meditation"
              icon="🧘"
              done={yesterday.meditationDone}
            />
          </div>
        </div>
      )}

      {/* WEEK */}
      <div className="section-box">
        <WeeklyStreak week={weekly} />
      </div>

      {/* TODAY */}
      <div className="section-box">
        <div className="today-section">
          <TodayPlanCard
            title="Workout"
            variant="workout"
            iconImage="/images/bellyfat.png"
            done={dashboard.workoutDone}
            onClick={handleWorkout}
          />

          <TodayPlanCard
            title="Water"
            variant="water"
            iconImage="/images/Water.png"
            done={dashboard.waterDone}
            onClick={handleWater}
          />

          <TodayPlanCard
            title="Sleep"
            variant="sleep"
            iconImage="/images/sleepicon.png"
            done={dashboard.sleepDone}
            onClick={handleSleep}
          />

          <TodayPlanCard
            title="Meditation"
            variant="meditation"
            iconImage="/images/meditation.png"
            done={dashboard.meditationDone}
            onClick={handleMeditation}
          />
        </div>
      </div>
    </div>
    
    </div>

  );
};

export default Dashboard;

