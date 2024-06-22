const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, deleteUser, updateUser, getUserHomepage } = require('../controller/usercontroller');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, getUserProfile);
router.delete('/deleteUser', authenticateUser, deleteUser);
router.put('/updateUser', authenticateUser, updateUser);
router.get('/homepage', authenticateUser, getUserHomepage); // Separate handler for homepage

module.exports = router;
