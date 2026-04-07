import { useEffect, useState } from "react";
import "./TodayPlanCard.css";

const TodayPlanCard = ({
  title,
  iconImage,
  done,
  onClick,
  variant,
  delay = 0,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (done) return;
    onClick();
  };

  return (
    <div
      className={`plan-card ${variant} ${mounted ? "enter" : ""} ${
        done ? "completed disabled" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={handleClick}
    >
      <div className="plan-accent" />

      <div className="plan-body">
        <div className="plan-image-wrap">
          <img src={iconImage} alt={title} className="plan-image" />
        </div>

        <div className="plan-text">
          <h3>{title}</h3>
          <p className={`status ${done ? "done" : "pending"}`}>
            {done ? "✓ Completed" : "Pending"}
          </p>
        </div>
      </div>
<div className={`plan-action ${done ? "done" : ""}`}>
  <span className="ring" />
  {done && <span className="tick">✓</span>}
</div>

     
    </div>
  );
};

export default TodayPlanCard;








