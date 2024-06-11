const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controller/usercontroller');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);

module.exports = router;
