document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get user input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send POST request to validate login
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });

    const data = await response.json();
    
    if (response.ok) {
        // If login is successful
        console.log(data.userId);
        sessionStorage.setItem('userId', data.userId);
        window.location.href = '../../confirm.html';
    } else {
        // If login fails
        alert(data.message || 'Login failed');
    }
});
