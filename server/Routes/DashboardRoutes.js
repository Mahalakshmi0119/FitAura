const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middleware/authMiddleware");
const { getTodayDashboard,
     getYesterdayDashboard,
      getWeeklyDashboard ,
 } = require("../Controllers/DashboardController");

// 🔐 Get today’s dashboard
router.get("/today", authMiddleware, getTodayDashboard);

router.get("/yesterday", authMiddleware, getYesterdayDashboard);
// 📊 Weekly streak
router.get("/weekly", authMiddleware, getWeeklyDashboard);


module.exports = router;
