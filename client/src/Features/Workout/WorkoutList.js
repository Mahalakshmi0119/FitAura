import React, { useState } from "react";
import "./WorkoutList.css";


const workouts = [
  {
    title: "BELLY FAT BURNER",
    img: "/images/bellyfat.png",
    time: "⏱️20 min",
    video:'https://www.youtube.com/embed/Th97oQ4eF9U?si=yUycaY86Kvp-qHFc',
  },
  {
    title: "ABS WORKOUT",
    img: "/images/abs.png",
    time: "⏱️15 min",
    video:'https://www.youtube.com/embed/2pLT-olgUJs?si=9TcoLTdQSP5SQDGV',
  },
  {
    title: "TONED ARMS",
    img: "/images/tonnedarms.png",
    time: "⏱️15 min",
    video:"https://www.youtube.com/embed/j64BBgBGNIU?si=QCT-ulBvz6-lmT-L",
  },
  {
    title: "FULL BODY WORKOUT",
    img: "/images/fullbody.png",
    time: "⏱️30 min",
    video:'https://www.youtube.com/embed/CGmr02bfHUo?si=BCWSwG__2ZAvtngo',
  },
  {
    title: "MEDITATION",
    img: "/images/meditation.png",
    time: "⏱️20 min",
    video:'https://www.youtube.com/embed/4pLUleLdwY4?si=ESFCjJFbxL70BHWy',
  },
  {
    title: "STRESS RELIEF YOGA",
    img: "/images/stress relief.png",
    time: "⏱️15 min",
    video:'https://www.youtube.com/embed/TGdNZTl86Qs?si=4VkjdhmUzFMTLhHw',
  },
  {
    title: "WEIGHT LOSS YOGA",
    img: "/images/weight loss.png",
    time: " ⏱️10 min",
    video:'https://www.youtube.com/embed/Vu_NnDWxKY4?si=SobqFpDX_EYOW1DQ',
  },
   {
    title: "SLEEP YOGA",
    img: "/images/sleep.png",
    time: " ⏱️10 min",
    video:'https://www.youtube.com/embed/8QGvtgPCsnA?si=V1-xSnPuQyY1Sex5',
  },
   {
    title: "PRANAYAMA",
    img: "/images/breathing.png",
    time: "  ⏱️10 min",
    video:'https://www.youtube.com/embed/JoDKbXEUrvQ?si=kSkJ3RfSwVHUvqLR',
  },
     {
    title: "FACE YOGA",
    img: "/images/face.png",
    time: "⏱️10 min",
    video:'https://www.youtube.com/embed/hqfkApYMsac?si=VKlKIHhAA82lL7e1',
  },
];

const WorkoutList = () => {

  return (
    <div className="page-container">      
    <div style={{ marginTop: "28px" }}>
      <h2 style={{ marginBottom: "14px" }}>🔥 Choose a Workout</h2>

      <div className="workout-grid">
  {workouts.map((w, index) => (
    <div key={index} className="workout-tile">

      <img
        src={w.img}
        alt={w.title}
        className="workout-img"
      />

      <h4>{w.title}</h4>
      <p>{w.time}</p>

      <button className="workout-start-btn"
      onClick={()=>window.open(w.video,'_blank')}
      >
      start
      </button>

    </div>
  ))}
</div>
    </div>
    </div>
  );
};
 
export default WorkoutList;

