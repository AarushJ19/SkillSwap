// src/components/Homepage.js

import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';

const Homepage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = new URLSearchParams(window.location.search).get('user');
        const response = await axiosInstance.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    
    fetchData();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <p>Email: {userData.email}</p>
      {/* Display more user information as needed */}
    </div>
  );
};

export default Homepage;
