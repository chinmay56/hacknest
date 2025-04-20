// Smooth scroll for navigation
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);

        // Add button click effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);

        // Handle specific button actions
        if (this.classList.contains('about-btn')) {
            const footer = document.querySelector('footer');
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.hero, .talent-management, .branded-hackathons').forEach(section => {
        const rate = section.dataset.parallax || 0.5;
        const yPos = -(scrolled * rate);
        section.style.transform = `translateY(${yPos}px)`;
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect to children
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Add hover effects for buttons
document.querySelectorAll('.action-buttons button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to the hackathon image
const hackathonImage = document.querySelector('.hackathon-image');
if (hackathonImage) {
    setInterval(() => {
        hackathonImage.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            hackathonImage.style.transform = 'translateY(0)';
        }, 1000);
    }, 2000);
}

// Add typing effect to the hero title
const heroTitle = document.querySelector('.hero h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing when the hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeWriter();
        }
    });
    
    heroObserver.observe(heroTitle);
}

// Add smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Network Visualization
function createNetworkConnections() {
    const visualization = document.querySelector('.network-visualization');
    const nodes = visualization.querySelectorAll('.developer-node');
    
    // Remove existing lines
    visualization.querySelectorAll('.connection-line').forEach(line => line.remove());
    
    // Create connections between nodes
    nodes.forEach((node1, i) => {
        nodes.forEach((node2, j) => {
            if (i < j) { // Avoid duplicate connections
                const rect1 = node1.getBoundingClientRect();
                const rect2 = node2.getBoundingClientRect();
                
                const x1 = rect1.left + rect1.width / 2 - visualization.getBoundingClientRect().left;
                const y1 = rect1.top + rect1.height / 2 - visualization.getBoundingClientRect().top;
                const x2 = rect2.left + rect2.width / 2 - visualization.getBoundingClientRect().left;
                const y2 = rect2.top + rect2.height / 2 - visualization.getBoundingClientRect().top;
                
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                const line = document.createElement('div');
                line.className = 'connection-line';
                line.style.width = `${length}px`;
                line.style.left = `${x1}px`;
                line.style.top = `${y1}px`;
                line.style.transform = `rotate(${angle}deg)`;
                
                visualization.appendChild(line);
            }
        });
    });
}

// Initialize network visualization
if (document.querySelector('.network-visualization')) {
    createNetworkConnections();
    window.addEventListener('resize', createNetworkConnections);
    
    // Add floating animation to nodes
    document.querySelectorAll('.developer-node').forEach((node, index) => {
        node.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

// Check login state
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    
    const loginBtn = document.querySelector('.login-btn');
    if (isLoggedIn && loginBtn) {
        loginBtn.innerHTML = `
            <span class="user-avatar">${user.name ? user.name[0].toUpperCase() : 'U'}</span>
            <span class="user-name">${user.name || 'User'}</span>
        `;
        loginBtn.classList.add('logged-in');
        
        // Add logout option
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user');
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('user');
                window.location.reload();
            }
        });
    } else if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
}

// Call check login state on page load
document.addEventListener('DOMContentLoaded', checkLoginState);

// Add styles for logged-in state
const style = document.createElement('style');
style.textContent = `
    .login-btn.logged-in {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
    }

    .user-avatar {
        width: 30px;
        height: 30px;
        background: var(--gradient-2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1rem;
    }

    .user-name {
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style); 