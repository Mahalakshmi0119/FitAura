import React, { useState ,useEffect} from "react";
import "./WaterPage.css";
import axios from'axios';




const WaterPage = () => {
  const [intake, setIntake] = useState(0);
    const [age, setAge] = useState("");
const [weight, setWeight] = useState("");
const [dailyGoal, setDailyGoal] = useState(2000);

 const token = localStorage.getItem("token");

useEffect(() => {
  if (age && weight) {
    calculateGoal();
  }
}, [age, weight]);

  const buttons = [50,150,250,350,500];

  const percent = Math.min((intake / dailyGoal) * 100, 100);
  const remaining = Math.max(dailyGoal - intake, 0);

const addWater = async (ml) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/water/log",
      { amount: ml},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIntake(res.data.intake);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};

useEffect(() => {
  fetchTodayData();
}, []);

const fetchTodayData = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/water/today-data",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setIntake(res.data.intake);
    setDailyGoal(res.data.target);

  } catch (err) {
    console.log(err);
  }
};




  const calculateGoal = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/water/goal",
      { age, weight },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setDailyGoal(res.data.target);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const now = new Date();

  const millisTillMidnight =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 1
    ) - now;

  const timer = setTimeout(() => {
    setIntake(0); // reset UI
  }, millisTillMidnight);

  return () => clearTimeout(timer);
}, []);


  return (
    <div className="page-container">     
    <div className="water-wrapper">
  

      <h2 className="water-title">💧 Drink Water</h2>
      <p className="water-subtitle">One-click Record</p>


<div className="wave-container">

  <div className="wave wave1"></div>
  <div className="wave wave2"></div>
      {/* CIRCLE BUTTONS */}
      <div className="water-buttons">
        {buttons.map((ml) => (
          <div
            key={ml}
            className="water-circle"
            onClick={() => addWater(ml)}
          >
            💧
            <span>{ml}</span>
          </div>
        ))}
      </div>
      </div>

      {/* INFO */}
      <div className="progress-wrapper">   
      <div className="water-info">
        <p>{intake} ml · {Math.round(percent)}%</p>
        <p>Remaining: {remaining} ml</p>
      </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="user-input-card">

  {/* AGE */}
  <div className="row">
    <span>Age</span>
    <input
      type="number"
      placeholder="Enter age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
    />
  </div>

  {/* WEIGHT */}
  <div className="row">
    <span>Weight</span>
    <input
      type="number"
      placeholder="Enter weight (kg)"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
    />
  </div>

  {/* DAILY TARGET */}
  <div className="row">
    <span>Daily target</span>
    <strong>{dailyGoal} ml</strong>
  </div>

</div>
    </div>
    </div>
  );
};

export default WaterPage;
