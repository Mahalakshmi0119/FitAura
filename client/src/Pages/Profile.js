import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../Components/Navbar";
import { FaCog, FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔥 UI STATES
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // 🔥 DATA STATES
  const [workout, setWorkout] = useState(false);
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [tasks, setTasks] = useState({ done: 0, total: 3 });
  const [streak, setStreak] = useState(0);

  // 🔥 IMAGE
  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  // 🔥 VIDEO
  const [videoIndex, setVideoIndex] = useState(0);

  // 🔥 QUOTE CAROUSEL
  const [index, setIndex] = useState(0);

  const quotes = [
    "🌿 Stay consistent. Small steps build big results.",
    "🔥 Discipline beats motivation every day.",
    "💪 Push yourself, because no one else will.",
    "🚀 Great things take time. Keep going.",
    "🏆 You are stronger than your excuses.",
     "🌿 Stay consistent. Small steps build big results.",
    "🔥 Discipline beats motivation every day.",
    "💪 Push yourself, because no one else will.",
    "🚀 Great things take time. Keep going.",
    "🏆 You are stronger than your excuses."
  ];

  const videos = [
    {
      url: "https://www.youtube.com/embed/ZXsQAXx_ao0",
      title: "Stay Consistent"
    },
    {
      url: "https://www.youtube.com/embed/mgmVOuLgFB0",
      title: "Discipline = Freedom"
    },
    {
      url: "https://www.youtube.com/embed/wnHW6o8WMas",
      title: "Push Yourself"
    }
  ];

  // 🔥 AUTO VIDEO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 AUTO QUOTE SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashRes = await axios.get(
          "http://localhost:5000/api/dashboard/today",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const plan = dashRes.data.dailyPlan;

        setWorkout(plan.workoutDone || false);
        setStreak(plan.streak || 0);

        const waterRes = await axios.get(
          "http://localhost:5000/api/water/today-data",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const waterValue = waterRes.data.intake || 0;
        setWater(waterValue);

        const sleepRes = await axios.get(
          "http://localhost:5000/api/sleep/check",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const sleepValue = sleepRes.data.hours || 0;
        setSleep(sleepValue);

        const done =
          (plan.waterDone ? 1 : 0) +
          (plan.sleepDone ? 1 : 0) +
          (plan.workoutDone ? 1 : 0);

        setTasks({ done, total: 3 });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔥 SETTINGS MENU CLOSE
  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  

  const handleLogout = () => {
  const confirm = window.confirm("Are you sure you want to logout?");
  if (!confirm) return;

  localStorage.clear();
  window.location.href = "/";
};


  return (
    <>
      <div className="profile-container">

        {/* HEADER */}
        <div className="profile-top">

          <div className="profile-info">
            <div className="profile-img">
              {image ? (
                <img src={image} alt="profile" className="profile-photo" />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h3>{user?.name}</h3>
              <p>Fitness Tracker</p>
            </div>
          </div>

          <button
            className="settings-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <FaCog />
          </button>

          {showMenu && (
            <div className="settings-menu" onClick={(e) => e.stopPropagation()}>
              
              <div onClick={() => setShowEdit(true)}>
                Edit Profile
              </div>

              <div onClick={() => {
                document.getElementById("profileUpload").click();
                setShowMenu(false);
              }}>
                <FaUserCircle /> {image ? "Change Profile Photo" : "Set Profile Photo"}
              </div>

              <div onClick={() => setShowPassword(true)}>
                Change Password
              </div>
              <div onClick={handleLogout}>
  🚪 Logout
</div>
            </div>
          )}

          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="stat-card">
            <div className="circle">✔</div>
            <p>Tasks</p>
            <small>{tasks.done}/{tasks.total}</small>
          </div>

          <div className="stat-card">
            <div className="circle">🔥</div>
            <p>Streak</p>
            <small>{streak} days</small>
          </div>

          <div className="stat-card">
            <div className="circle">💧</div>
            <p>Water</p>
            <small>{water} ml</small>
          </div>

          <div className="stat-card">
            <div className="circle">😴</div>
            <p>Sleep</p>
            <small>{sleep} h</small>
          </div>

          <div className="stat-card">
            <div className="circle">🏋️</div>
            <p>Workout</p>
            <small>{workout ? "Done" : "Pending"}</small>
          </div>

        </div>

        {/* CONTENT */}
        <div className="content">

          <h4>Watch Now</h4>

          <div className="video-carousel">
            <div
              className="video-track"
              style={{
                transform: `translateX(-${videoIndex * 100}%)`
              }}
            >
              {videos.map((v, i) => (
                <div className="video-slide" key={i}>
                  <iframe src={v.url} title={v.title} allowFullScreen></iframe>
                  <p className="video-title">{v.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="dots">
            {videos.map((_, i) => (
              <span
                key={i}
                className={i === videoIndex ? "dot active" : "dot"}
                onClick={() => setVideoIndex(i)}
              ></span>
            ))}
          </div>

          <h4>Motivation</h4>

      <div className="card-ctn">
  {quotes.map((q, i) => (
    <div className="quote-card" key={i}>
      {q}
    </div>
  ))}
</div>



        </div>

      </div>

    </>
  );
};

export default Profile;


