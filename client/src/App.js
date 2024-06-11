import react, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const[formData, setformData] = useState({
        username:'',
        email:'',
        password:''
    });

    const { username, email, password } = formData;

  const onChange = e => setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', formData);
      console.log(res.data); // Handle success response
    } catch (err) {
      console.error(err.response.data); // Handle error response
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};


export default Register;