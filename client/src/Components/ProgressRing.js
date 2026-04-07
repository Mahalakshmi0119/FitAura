import React from "react";
import "./ProgressRing.css";

const ProgressRing = ({ progress, color, size = 90, stroke = 8 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={`progress-ring ${progress === 100 ? "perfect" : ""}`}
    >
      {/* Background circle */}
      <circle
        className="ring-bg"
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress circle */}
      <circle
        className="ring-progress"
        stroke={color}                 // ✅ USE DASHBOARD COLOR
        strokeWidth={stroke}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />

      {/* Center text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="ring-text"
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

export default ProgressRing;


