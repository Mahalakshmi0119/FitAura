const express = require('express');
const { registerUser, loginUser } = require('../Controllers/authController');
const { updateProfile } = require('../Controllers/authController');


const { changePassword } = require('../Controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;
