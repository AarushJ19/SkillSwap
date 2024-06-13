import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Assuming you have a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', res.data);
      alert('User successfully registered');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed');
    }
  };

  return (
    // <div classname="background">
    <div className="register-container">
      {/* <h1>Register</h1> */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    {/* </div> */}
    </div>
  );
};

export default Register;
