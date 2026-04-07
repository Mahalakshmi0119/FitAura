import React, { useRef, useState } from "react";
import "./SleepClock.css";

const SIZE = 300;               // circle size
const RADIUS = SIZE / 2 - 18;   // outer circle radius (handle size aware)

const SleepClock = ({ icon, label }) => {
  const clockRef = useRef(null);
  const [angle, setAngle] = useState(330); // 11:00
  const [time, setTime] = useState("11:00");
  


  const getAngleFromCenter = (x, y, cx, cy) => {
    const dx = x - cx;
    const dy = y - cy;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI);
    return deg < 0 ? deg + 360 : deg;
  };


const hourToTime = (h) =>
   { const hour = Math.floor(h) % 12 || 12; 
    const min = h % 1 === 0 ? "00" : "30";
     return `${hour}:${min}`
     }; 
const size=300; 
const radius = 135; 
const CIRC = 2 * Math.PI * radius;

const getArcLength = (start, end) =>
   { let diff = end - start; if (diff < 0) diff += 360; 
    return (diff / 360) * CIRC; };



  const handleMove = (e) => {
    const rect = clockRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const a = getAngleFromCenter(e.clientX, e.clientY, cx, cy);
 
  };





  return (
    <div className="clock-face" 
 ref={clockRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
    >

  {/* 🌙 HANDLE */}
  <div
    className="clock-handle sleep-handle"
    style={{ transform: `rotate(${angle}deg) translateY(-155px)` }}
  >
    🌙
  </div>


      {/* OUTER HANDLE */}
      <div
        className="clock-handle wake-handle"
        style={{
          transform: `rotate(${angle}deg) translateY(-${RADIUS}px)`
        }}
      >
        <span className="handle-icon">{icon}</span>
      </div>

      {/* CENTER */}
      <div className="clock-center">
        <div className="sleep-hours">{time}</div>
        <div className="sleep-label">{label}</div>
      </div>
    </div>
  );
};

export default SleepClock;

