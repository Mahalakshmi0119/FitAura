import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const getTodayDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getYesterday = (token) =>
  axios.get(`${API}/yesterday`, {
    headers: { Authorization: `Bearer ${token}` },
  });