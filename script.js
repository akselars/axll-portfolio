// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference, default to dark if none found
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

// Handle theme switch
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Custom cursor with trail effect
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Create trail elements
const trailCount = 2; // Only two trailing circles
const trails = [];
for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    trails.push({
        element: trail,
        x: 0,
        y: 0
    });
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Initialize cursor position at mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorX = mouseX;
    cursorY = mouseY;
    cursor.style.left = (cursorX - cursor.offsetWidth / 2) + 'px';
    cursor.style.top = (cursorY - cursor.offsetHeight / 2) + 'px';
    
    // Initialize trail positions
    trails.forEach((trail, index) => {
        trail.x = mouseX;
        trail.y = mouseY;
        trail.element.style.left = (trail.x - trail.element.offsetWidth / 2) + 'px';
        trail.element.style.top = (trail.y - trail.element.offsetHeight / 2) + 'px';
    });
}, { once: true }); // Only run once on first mouse move

// Smooth cursor movement
function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    cursor.style.left = (cursorX - cursor.offsetWidth / 2) + 'px';
    cursor.style.top = (cursorY - cursor.offsetHeight / 2) + 'px';
    
    // Update trail positions with different delays
    trails.forEach((trail, index) => {
        const delay = (index + 1) * 0.15; // Increased delay for more noticeable trailing
        trail.x += (cursorX - trail.x) * delay;
        trail.y += (cursorY - trail.y) * delay;
        trail.element.style.left = (trail.x - trail.element.offsetWidth / 2) + 'px';
        trail.element.style.top = (trail.y - trail.element.offsetHeight / 2) + 'px';
    });
    
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Start the animation
updateCursor();

// Add active class to cursor when hovering over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .about-content');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        trails.forEach(trail => {
            trail.element.style.opacity = '0.6';
        });
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        trails.forEach((trail, index) => {
            trail.element.style.opacity = index === 0 ? '0.3' : '0.4';
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.project-card, .about-content, .contact-content');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add a simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}); 