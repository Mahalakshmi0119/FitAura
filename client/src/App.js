import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import WorkoutPage from "./Features/Workout/WorkoutPage";
import WaterPage from "./Pages/WaterPage";
import SleepPage from "./Pages/SleepPage";
import DietPage from "./Pages/DietPage";
import MealDetailsPage from "./Pages/MealDetailsPage";
import WeeklyChartPage from "./Pages/WeeklyChartPage";
import Register from './Pages/Register';
import "./App.css";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";

// 🔥 LAYOUT (NO Router here)
function AppLayout() {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/register"]; // "/" = login

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/sleep" element={<SleepPage />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/diet/:meal" element={<MealDetailsPage />} />
        <Route path="/weekly" element={<WeeklyChartPage />} />
      </Routes>
    </>
  );
}

// 🔥 ROOT (ONLY ONE Router HERE)
export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}




