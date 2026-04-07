import React from "react";

const YesterdayMiniCard = ({ title, icon, done }) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "14px",
        borderRadius: "25px",

        // 📜 HISTORY STYLE
        background: done ? "#fab9e2" :"#fab9e2",
        borderLeft: done
          ? "6px solid #4caf50"
          : "6px solid #f44336",

        textAlign: "center",
        boxShadow: "none",
        opacity: 0.95,
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "6px" }}>
        {icon}
      </div>

      <p style={{ margin: "6px 0", fontWeight: "600" }}>
        {title}
      </p>

      <p
        style={{
          fontSize: "14px",
          color: done ? "#2e7d32" : "#c62828",
          fontWeight: "600",
        }}
      >
        {done ? "✓ Done" : "✗ Missed"}
      </p>
    </div>
  );
};

export default YesterdayMiniCard;


