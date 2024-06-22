document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
    console.log('Login successful:', response.data);
    alert('Login successful');
    // Save the token in localStorage or cookies
    localStorage.setItem('token', response.data.token);
    
    // Redirect to user homepage
    window.location.href = '/homepage.html';
  } catch (error) {
    console.error('Login failed:', error.response.data);
    alert('Login failed: ' + error.response.data.msg);
  }
});
