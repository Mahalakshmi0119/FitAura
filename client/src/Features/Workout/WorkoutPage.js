import React from "react";
import WorkoutList from "./WorkoutList";
import "./WorkoutPage.css";
import Navbar from "../../Components/Navbar";

const WorkoutPage = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "16px" }}>🏋️ Workouts</h2>


      {/* 🧾 Workout History */}
      <WorkoutList />
      <Navbar/>
    </div>
  );
};

export default WorkoutPage;
