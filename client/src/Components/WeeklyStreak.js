import React from "react";
import "./WeeklyStreak.css";

const WeeklyStreak = ({ week, history }) => {

  const todayDate = new Date().toISOString().split("T")[0];

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // 🔥 calculate streak up to 365 days (FROM TODAY BACKWARDS)
  const calculateStreak = (days) => {
    if (!days || days.length === 0) return 0;

    let streak = 0;

    const sortedDays = [...days].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    for (let day of sortedDays) {

      const completed =
        day.workoutDone &&
        day.waterDone &&
        day.sleepDone &&
        day.meditationDone;

      if (completed) {
        streak++;
        if (streak === 365) break;
      } else {
        break;
      }
    }

    return streak;
  };

  const streakCount = calculateStreak(history || week);

  const weekWithFlags = week
    .map((day) => {
      const label = new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      const isRest =
        !day.workoutDone &&
        !day.waterDone &&
        !day.sleepDone &&
        !day.meditationDone;

      const completed =
        day.workoutDone &&
        day.waterDone &&
        day.sleepDone &&
        day.meditationDone;

      return {
        ...day,
        label,
        isRest,
        completed,
        isToday: day.date === todayDate
      };
    })
    .sort(
      (a, b) => dayOrder.indexOf(a.label) - dayOrder.indexOf(b.label)
    );

  return (
    <div style={{ marginTop: "30px" }}>

      <h3 style={{ marginBottom: "6px" }}>
        📊 This Week
      </h3>

      <div
        style={{
          width: "60px",
          height: "4px",
          background: "linear-gradient(90deg, #22c55e, #86efac)",
          borderRadius: "10px",
          marginBottom: "14px",
        }}
      />

      {/* 🔥 STREAK DISPLAY */}
      <div style={{ marginBottom: "12px", fontWeight: "600" }}>

      </div>

      <div className="week-wrapper">
        {weekWithFlags.map((day) => (
          <div
            key={day.date}
            className={`week-card 
              ${day.completed ? "done" : day.isRest ? "rest" : "missed"} 
              ${day.isToday ? "today" : ""}`}
          >
            <div className="week-day">{day.label}</div>

            <div className="week-status">
              {day.isRest ? "REST" : day.completed ? "✓" : "✕"}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyStreak;











