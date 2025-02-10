// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupNavigation();
    setupFormValidation();
    setupScrollAnimations();
    setupLazyLoading();
    setupAnalytics();
}

// Setup responsive navigation
function setupNavigation() {
    const nav = document.querySelector('nav');
    const menuItems = nav.querySelectorAll('a');

    // Smooth scroll for internal links
    menuItems.forEach(item => {
        if (item.hash) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(item.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// Form validation setup
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

// Form submission handler
async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        // Here you would add your actual form submission logic
        await submitFormData(data);
        showSuccessMessage();
        form.reset();
    } catch (error) {
        showErrorMessage(error);
    }
}

// Simulated form submission
async function submitFormData(data) {
    // Simulates an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', data);
            resolve();
        }, 1000);
    });
}

// Scroll animations setup
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
}

// Image lazy loading setup
function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        // You could add a lazy loading library here
    }
}

// Analytics setup
function setupAnalytics() {
    logPageView();
}

// Utility functions
function showSuccessMessage() {
    alert('Message sent successfully!');
}

function showErrorMessage(error) {
    console.error('Error sending message:', error);
    alert('Error sending message. Please try again.');
}

function logPageView() {
    console.log('Page viewed:', window.location.pathname);
}

// CTA button handler
function handleCTA() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Detect when user reaches bottom of page
const handleScroll = debounce(() => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
        console.log('Near bottom of page');
    }
}, 100);

window.addEventListener('scroll', handleScroll);