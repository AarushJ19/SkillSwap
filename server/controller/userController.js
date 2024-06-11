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
        res.json({ 
          message: 'User successfully registered',
          username: user.username,
          email: user.email,
          token 
        });
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
    const { username } = req.body;
    // const { username: currentUsername } = req.user; // Assuming the token contains the username
    const { newUsername, newEmail, newPassword } = req.body;
  
    try {
      // Find the user by username
      let user = await User.findOne({ username });
      // console.log('User:', user); // Log the user object
      if (!user) {
          return res.status(404).json({ msg: 'User not found 404' });
      }
  
      if (newUsername) user.username = newUsername;
      if (newEmail) user.email = newEmail;
      if (newPassword) user.password = await bcrypt.hash(newPassword, 10);
  
      await user.save();
      res.json({ msg: 'User details updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
};

  
  // Delete user
  const deleteUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        let user = await User.findOne({ username });
        // console.log('User:', user); // Log the user object
        if (!user) {
            return res.status(404).json({ msg: 'User not found 404' });
        }

        // Verify user's password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Incorrect password' });
        }

        // Remove the user
        await User.deleteOne({ _id: user._id }); // or await User.deleteOne({ username }) if username is unique
        res.json({ msg: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
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
