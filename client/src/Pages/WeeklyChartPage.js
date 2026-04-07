import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Cell } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import "./WeeklyChart.css";


const WeeklyChartPage= () => {
const[chartData,setChartData]=useState([]);
const data = [
  { day: "Mon", score: 2 },
  { day: "Tue", score: 1 },
  { day: "Wed", score: 3 },
  { day: "Thu", score: 2 },
  { day: "Fri", score: 3 },
  { day: "Sat", score: 1 },
  { day: "Sun", score: 2 }
];

const token=localStorage.getItem('token');
useEffect(()=>{
  fetchWeekly();
},[]);
 
const fetchWeekly = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/dashboard/weekly",
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  const formatted = res.data.week.map(day => ({
    day: new Date(day.date).toLocaleDateString("en-US",{weekday:"short"}),
   score:
(
  (day.workoutDone ? 1 : 0) +
  (day.waterDone ? 1 : 0) +
  (day.sleepDone ? 1 : 0)+
  (day.meditationDone ? 1:0)
)* 25
  }));

  setChartData(formatted);
};
const perfectWeek=chartData.every(day=>day.score===100);



  return (
    <div className="page-container">         
    <div className="weekly-wrapper">
      <h2>📊 Weekly Consistency</h2>
    {perfectWeek && (<div className='perfect-week-badge'> 🏆Perfect Week!</div>)}

  <div className="chart-box">
  <ResponsiveContainer width="100%" height="100%">
  <LineChart data={chartData}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="day"
      stroke="#cbd5f5"
    />

    <YAxis
      domain={[0,100]}
      stroke="#cbd5f5"
    />

   < Tooltip formatter={(value) => `${value}% completed`} />

    <Line
      type="monotone"
      dataKey="score"
      stroke="#38bdf8"
      strokeWidth={3}
      dot={{ r: 5 }}
      activeDot={{ r: 7 }}
      isAnimationActive={true}
      animationDuration={1200}
    />
    {chartData.map((entry, index) => (
  <Cell
    key={`cell-${index}`}
    fill={index === 6 ? "#facc15" : "#38bdf8"}
  />
))}

  </LineChart>
  
</ResponsiveContainer>
</div>
</div>

</div>
  );
};


export default WeeklyChartPage;
