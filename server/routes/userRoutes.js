const express = require('express');
const { registerUser, loginUser, getUserProfile, deleteUser, updateUser } = require('../controller/usercontroller');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.delete('/deleteUser', authenticateUser, deleteUser);
router.put('/updateUser', authenticateUser, updateUser);
module.exports = router;
