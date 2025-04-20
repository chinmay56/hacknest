// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('.login-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'flex';
    } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Search functionality for hackathons
function searchHackathons() {
    const searchInput = document.querySelector('.search-input');
    const hackathonCards = document.querySelectorAll('.hackathon-card');
    
    if (!searchInput || !hackathonCards.length) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        hackathonCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const techStack = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const isVisible = 
                title.includes(searchTerm) || 
                description.includes(searchTerm) ||
                techStack.some(tech => tech.includes(searchTerm));
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    });
}

// Filter hackathons by category
function filterHackathons() {
    const filterSelect = document.querySelector('.filter-select');
    const hackathonCards = document.querySelectorAll('.hackathon-card');
    
    if (!filterSelect || !hackathonCards.length) return;
    
    filterSelect.addEventListener('change', (e) => {
        const category = e.target.value.toLowerCase();
        
        if (category === 'all') {
            hackathonCards.forEach(card => card.style.display = 'block');
            return;
        }
        
        hackathonCards.forEach(card => {
            const cardCategory = card.dataset.category.toLowerCase();
            card.style.display = cardCategory === category ? 'block' : 'none';
        });
    });
}

// Animate stats when they come into view
function animateStats() {
    const stats = document.querySelectorAll('.stat-card h4');
    
    if (!stats.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.value);
                animateValue(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Helper function to animate numbers
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        obj.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Handle navigation buttons
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Get all navigation buttons
    const aboutBtn = document.querySelector('.about-btn');
    const loginBtn = document.querySelector('.login-btn');
    const recruiterBtn = document.querySelector('.recruiter-btn');
    const studentBtn = document.querySelector('.student-btn');
    const hackathonBtn = document.querySelector('.hackathon-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const registerBtns = document.querySelectorAll('.register-btn');
    const userMenu = document.querySelector('.user-menu');
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const userMenuItems = document.querySelectorAll('.user-menu-item');

    console.log('Found CTA buttons:', ctaButtons.length);

    // Handle user menu dropdown
    if (userMenuToggle) {
        userMenuToggle.addEventListener('click', () => {
            userMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target) && !userMenuToggle.contains(e.target)) {
                userMenu.classList.remove('active');
            }
        });
    }

    // Handle user menu items
    userMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            switch(action) {
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
                case 'dashboard':
                    window.location.href = 'dashboard.html';
                    break;
                case 'settings':
                    window.location.href = 'settings.html';
                    break;
                case 'logout':
                    handleLogout();
                    break;
            }
            userMenu.classList.remove('active');
        });
    });

    // Add click event listeners
    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => {
            window.location.href = 'index.html#about-section';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Handle recruiter button
    if (recruiterBtn) {
        recruiterBtn.addEventListener('click', () => {
            window.location.href = 'recruiters.html';
        });
    }

    // Handle student button
    if (studentBtn) {
        studentBtn.addEventListener('click', () => {
            window.location.href = 'students.html';
        });
    }

    // Handle hackathon button
    if (hackathonBtn) {
        hackathonBtn.addEventListener('click', () => {
            window.location.href = 'hackathons.html';
        });
    }

    // Handle view all button
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            window.location.href = 'hackathons.html';
        });
    }

    // Handle CTA buttons based on page context
    ctaButtons.forEach(button => {
        console.log('Setting up CTA button:', button.textContent);
        button.addEventListener('click', () => {
            console.log('CTA button clicked:', button.textContent);
            const currentPage = window.location.pathname;
            console.log('Current page:', currentPage);
            
            if (currentPage.includes('recruiters.html') && button.textContent.includes('Get Started')) {
                console.log('Redirecting to recruiter signup');
                window.location.href = 'recruiter-signup.html';
            } else if (currentPage.includes('students.html') && button.textContent.includes('Sign Up')) {
                console.log('Redirecting to student signup');
                window.location.href = 'student-signup.html';
            } else if (button.textContent.includes('Get Started')) {
                console.log('Redirecting to login');
                window.location.href = 'login.html';
            } else if (button.textContent.includes('Sign Up')) {
                console.log('Redirecting to signup');
                window.location.href = 'signup.html';
            }
        });
    });

    // Handle register buttons in hackathon cards
    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (isLoggedIn) {
                // Get the hackathon title from the card
                const hackathonTitle = btn.closest('.hackathon-card').querySelector('h3').textContent;
                // Store the selected hackathon in localStorage
                localStorage.setItem('selectedHackathon', hackathonTitle);
                // Redirect to registration page
                window.location.href = 'registration.html';
            } else {
                // If not logged in, redirect to login page
                window.location.href = 'login.html';
            }
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    checkLoginStatus();
    searchHackathons();
    filterHackathons();
    animateStats();
    setupNavigation();
    
    // Handle logout button click
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Add data-value attributes to stats for animation
    const stats = document.querySelectorAll('.stat-card h4');
    stats.forEach(stat => {
        const value = stat.textContent.replace(/[^0-9]/g, '');
        stat.setAttribute('data-value', value);
    });
}); 