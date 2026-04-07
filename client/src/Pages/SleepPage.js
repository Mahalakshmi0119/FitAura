import React,{useState} from "react";
import "./SleepPage.css";
import SleepClock from '../Components/SleepClock';
import axios from 'axios';
import token from 'react';
import Navbar from "../Components/Navbar";

const SleepPage = () => {
    // 🧠 STATE (single source of truth)
   const [sleepAngle, setSleepAngle] = useState(300); // 🌙 10:00 PM approx
  const [wakeAngle, setWakeAngle] = useState(90);   // ☀️ 7:00 AM approx
  const [totalSleep, setTotalSleep] = useState("7h 30m");
 
  const token=localStorage.getItem("token");


    const getSleepArcAngle = (sleepAngle, wakeAngle) => {
    if (wakeAngle >= sleepAngle) {
      return wakeAngle - sleepAngle;
    }
    return 360 - sleepAngle + wakeAngle;
  };

  const sleepArcAngle = getSleepArcAngle(sleepAngle, wakeAngle);
  const R = 145;
  const CIRC = 2 * Math.PI * R;
  const arcLength = (sleepArcAngle / 360) * CIRC;


const handleDrag = (e, setAngle) => {
  const rect = e.currentTarget.parentElement.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const move = (event) => {
    const x = event.clientX - cx;
    const y = event.clientY - cy;

    let rawAngle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (rawAngle < 0) rawAngle += 360;

    // 👇 DO NOT SNAP HERE
    setAngle(rawAngle);
  };

const stop = () => { saveSleepToDB(); 
   setAngle(prev => Math.round(prev / 15) * 15); 
   window.removeEventListener("mousemove", move); 
   window.removeEventListener("mouseup", stop); };
    window.addEventListener("mousemove", move);
     window.addEventListener("mouseup", stop); 
    };
  
const angleToTime = (angle, type) => {
  const totalMinutes = Math.round((angle / 360) * 12 * 60);

  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;

  // 🌙 Sleep = PM, ☀️ Wake = AM
  const period = type === "sleep" ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes === 0 ? "00" : "30"} ${period}`;
};

const getTotalSleep = (sleepAngle, wakeAngle) => {
  let diff = wakeAngle - sleepAngle;
  if (diff < 0) diff += 360;

  const totalMinutes = Math.round((diff / 360) * 12 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return `${h}h ${m}m`;
};

const getSleepHours = (sleepAngle, wakeAngle) => {
  let diff = wakeAngle - sleepAngle;
  if (diff < 0) diff += 360;

  const totalMinutes = Math.round((diff / 360) * 12 * 60);
  return totalMinutes / 60;
};

const saveSleepToDB = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/sleep/today",
      { sleepAngle, wakeAngle },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.log(err);
  }
};

const SleepHours=getSleepHours(sleepAngle,wakeAngle);
let SleepQuote = "";

if (SleepHours < 4) {
  SleepQuote = "⚠ Worry less, sleep more.";
}
else if (SleepHours >= 4 && SleepHours < 6) {
  SleepQuote = "🙂 Sleep better, feel better.";
}
else if (SleepHours >= 6 && SleepHours < 8) {
  SleepQuote = "🌙 Sleep is self-care too.";
}
else {
  SleepQuote = "✨ Sleep is the best medicine.";
}



return (
  <div className="page-container">    
 <div className="sleep-wrapper">
    <h2 className="sleep-title">😴 Sleep Tracker</h2>
    <p className="sleep-subtitle">Set your sleep & wake time</p>

    {/* TIME BOXES */}
    <div className="sleep-time-boxes">
      <div className="time-box">
        <span className="time-icon">🌙</span>
        <div>
          <p className="time-label">Bedtime</p>
          <p className="time-value">{angleToTime(sleepAngle,'sleep')}</p>
        </div>
      </div>

      <div className="time-box">
        <span className="time-icon">☀️</span>
        <div>
          <p className="time-label">Wake</p>
            <p className="time-value">{angleToTime(wakeAngle,'wake')}</p>
        </div>
      </div>
    </div>

    {/* CLOCK */}
    <div className="clock-wrapper">
      <div className="clock-outer">

        {/* ARC */}
        <div className="arc-layer">
          <svg
  width="310"
  height="310"
  viewBox="0 0 310 310"
  className="sleep-arc"
>
  <circle
    cx="155"
    cy="155"
    r="145"
    fill="none"
    stroke="url(#sleepGradient)"
    strokeWidth="20"
    strokeLinecap="round"
    strokeDasharray={`${arcLength} ${CIRC}`}
    transform={`rotate(${sleepAngle - 90} 155 155)`}
  />
  <defs>
  <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#38bdf8" />
    <stop offset="100%" stopColor="#6366f1" />
  </linearGradient>
</defs>

</svg>

        </div>

        {/* SLEEP HANDLE */}
        <div
          className="clock-handle sleep-handle"
          style={{ transform: `rotate(${sleepAngle}deg) translateY(-155px)` }}
          onMouseDown={(e) => handleDrag(e, setSleepAngle)}
        >
          🌙
        </div>

        {/* WAKE HANDLE */}
        <div
          className="clock-handle wake-handle"
          style={{ transform: `rotate(${wakeAngle}deg) translateY(-155px)` }}
          onMouseDown={(e) => handleDrag(e, setWakeAngle)}
        >
          ☀️
        </div>

        {/* INNER CIRCLE */}
        <div className="clock-inner">
          <div className="clock-numbers">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="clock-number"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-95px) rotate(-${i * 30}deg)`
                }}
              >
                {i === 0 ? 12 : i}
              </span>
            ))}
          </div>

          <div className="clock-center">
           <p className="sleep-hours">
  {getTotalSleep(sleepAngle, wakeAngle)}
</p>
            <span className="sleep-label">Total Sleep</span>
          </div>
        </div>

      </div>
    </div>
    <p className="sleep-quote">{SleepQuote}</p>
  </div>
  
  </div>
);
};

export default SleepPage;    

