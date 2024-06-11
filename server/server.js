// server.js
require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGODB_URI); // Debugging line
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.get('/', (req, res) => {
    res.send('Welcome to the home screen!');
});
// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
