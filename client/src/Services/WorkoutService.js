import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get logged-in user's workouts
export const getUserWorkouts = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

// ✅ Add workout for logged-in user
export const addWorkout = async (workoutData) => {
  const response = await axios.post(
    `${API_URL}/add`,
    workoutData,
    getAuthHeader()
  );
  return response.data;
};

