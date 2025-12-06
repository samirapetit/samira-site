// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-fade, .reveal-left, .reveal-right, .reveal-scale');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            this.checkElements();
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = this.windowHeight * 0.85;

            if (elementTop < revealPoint) {
                element.classList.add('active');
            }
        });
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const toggle = otherItem.querySelector('.faq-toggle');
                if (toggle) toggle.textContent = '+';
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const toggle = item.querySelector('.faq-toggle');
                if (toggle) toggle.textContent = '−';
            }
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.testimonial-card');

    if (!slider || !dots.length || !cards.length) return;

    let currentIndex = 0;
    let isScrolling = false;

    // Auto scroll testimonials
    function scrollToIndex(index) {
        if (isScrolling) return;
        isScrolling = true;

        const card = cards[index];
        if (card) {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;

        setTimeout(() => {
            isScrolling = false;
        }, 600);
    }

    // Dots click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToIndex(index));
    });


    // Update active dot on manual scroll
    slider.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollLeft = slider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 40; // card width + gap
        const newIndex = Math.round(scrollLeft / cardWidth);

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    });
}

// Form Validation and Submission
function initForm() {
    const form = document.querySelector('.reservation-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#bebebe';
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé!';
                submitBtn.style.backgroundColor = '#4caf50';

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }, 1500);
        }
    });

    // Remove error styling on input
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#bebebe';
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (!heroImage || !heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }

        if (heroContent) {
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });
}

// Floating Animation for Hero Elements
function initFloatingAnimation() {
    const benefitIcons = document.querySelectorAll('.benefit-icon');

    benefitIcons.forEach((icon, index) => {
        icon.style.animation = `float ${3 + (index * 0.5)}s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add hover effect to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.reason-card, .testimonial-card, .benefit-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if (!menuToggle || !navLinks) return;

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Add loading animation
function initLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');

        // Animate hero elements on load
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');

        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateX(-50px)';

            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
            }, 300);
        }

        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(50px)';

            setTimeout(() => {
                heroImage.style.transition = 'all 0.8s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 500);
        }
    });
}

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);

        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Add ripple effect to buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .btn-submit');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, .btn-submit {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll reveal
    new ScrollReveal();

    // Initialize all features
    initSmoothScroll();
    initFAQ();
    initTestimonialsSlider();
    initForm();
    initParallax();
    initFloatingAnimation();
    initCardHoverEffects();
    initNavbarScroll();
    initMobileMenu();
    initLoadingAnimation();
    initRippleEffect();

    console.log('🚀 Site Samira Petit loaded successfully!');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized, recalculating layouts...');
    }, 250);
});

// Smooth scroll to top button (optional)
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
initScrollToTop();

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading if needed
// initLazyLoading();

// Add smooth entrance animations for sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialize section animations
setTimeout(() => {
    initSectionAnimations();
}, 100);
