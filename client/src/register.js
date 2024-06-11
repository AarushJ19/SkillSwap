import axios from 'axios'; // Import Axios for making HTTP requests

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

        axios.post('/api/register', { username, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                // Handle success (e.g., show a success message to the user)
            })
            .catch(error => {
                console.error('Registration failed:', error);
                // Handle error (e.g., display an error message to the user)
            });
    });
});
