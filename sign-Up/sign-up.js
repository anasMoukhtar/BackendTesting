document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        document.querySelector('.error-message').textContent = 'Passwords do not match!';
        return;
    }

    const data = { name, email, password };

    try {
        const response = await fetch('http://localhost:3000/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.text();
        if (response.ok) {
            document.querySelector('.success-message').textContent = result;
        } else {
            document.querySelector('.error-message').textContent = result;
        }
    } catch (error) {
        document.querySelector('.error-message').textContent = 'Error connecting to server.';
    }
});
