// controller/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect email or password' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
      username: user.username,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    const { username: usernameToUpdate, password: userPassword } = req.user;
  
    try {
      let user = await User.findOne({ username: usernameToUpdate });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Verify user's password
      const isMatch = await bcrypt.compare(userPassword, password);
      if (!isMatch) {
        return res.status(401).json({ msg: 'Incorrect password' });
      }
  
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
  
      await user.save();
      res.json({ msg: 'User updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  
  // Delete user
  const deleteUser = async (req, res) => {
    const { password } = req.body;
    const { username: usernameToDelete } = req.user;
  
    try {
      let user = await User.findOne({ username: usernameToDelete });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Verify user's password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: 'Incorrect password' });
      }
  
      await user.remove();
      res.json({ msg: 'User deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUser,
  updateUser,
};
