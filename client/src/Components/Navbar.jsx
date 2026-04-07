import { useNavigate, useLocation } from "react-router-dom";
import { IoNutrition } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import {
  FaHome,
  FaDumbbell,
  FaTint,
  FaBed,
  FaUser,
  FaChartLine,
  FaAppleAlt
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: <FaHome /> },
    { path: "/profile", icon: <FaUser /> },
    { path: "/workouts", icon: <FaDumbbell /> },
    { path: "/water", icon: <FaTint /> },
    { path: "/sleep", icon: <FaBed /> },
    { path: "/diet", icon: <IoNutrition /> },
    { path: "/weekly", icon: <FaChartLine /> },
    
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={location.pathname === item.path ? "active" : ""}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Navbar;