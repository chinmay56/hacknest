document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'index.html';
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update eye icon
        const eyeIcon = togglePassword.querySelector('svg');
        if (type === 'password') {
            eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
        } else {
            eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
        }
    });

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For demo purposes, accept any email/password
            const user = {
                email,
                name: email.split('@')[0]
            };

            // Save login state
            if (rememberCheckbox.checked) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('user', JSON.stringify(user));
            }

            // Show success animation
            loginForm.classList.add('login-success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    });

    // Handle social login buttons
    document.querySelectorAll('.social-login button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Social login coming soon!');
        });
    });
}); 