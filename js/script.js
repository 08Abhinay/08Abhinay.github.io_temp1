// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
    }

    applyTheme() {
        document.body.className = this.theme === 'dark' ? 'dark-theme' : '';
        this.updateThemeIcons();
        localStorage.setItem('theme', this.theme);
    }

    updateThemeIcons() {
        const icons = document.querySelectorAll('.theme-toggle i');
        icons.forEach(icon => {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
    }

    setupEventListeners() {
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.mobileMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        icon.className = this.mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        const icon = this.mobileMenuBtn.querySelector('i');
        icon.className = 'fas fa-bars';
    }

    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            let current = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        this.setupEventListeners();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 50 : 80;
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.y > this.canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
    }

    drawParticle(particle) {
        const isDark = document.body.classList.contains('dark-theme');
        this.ctx.fillStyle = isDark 
            ? `rgba(59, 130, 246, ${particle.opacity})` 
            : `rgba(37, 99, 235, ${particle.opacity * 0.7})`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Add animation classes to elements
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        const publicationCards = document.querySelectorAll('.publication-card');
        publicationCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.2}s`;
        });

        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.transitionDelay = `${index * 0.2}s`;
        });

        const certificationCards = document.querySelectorAll('.certification-card');
        certificationCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        const aboutParagraphs = document.querySelectorAll('.about-paragraph');
        aboutParagraphs.forEach((paragraph, index) => {
            paragraph.classList.add('fade-in');
            paragraph.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        // Create and show a temporary message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 5000);
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.setupScrollListener();
    }

    setupParallaxElements() {
        // Add parallax effect to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            this.elements.push({
                element: section,
                speed: 0.5
            });
        });
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(({ element, speed }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
                const yPos = -(scrollTop - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Reduce animations on low-end devices
        if (this.isLowEndDevice()) {
            document.body.classList.add('reduced-motion');
            this.disableHeavyAnimations();
        }
    }

    isLowEndDevice() {
        // Simple heuristic for low-end device detection
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 2 ||
               /Android.*Chrome\/[.0-9]*\s/.test(navigator.userAgent);
    }

    disableHeavyAnimations() {
        // Disable particle system on low-end devices
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
        
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers and systems
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const particleSystem = new ParticleSystem('particleCanvas');
    const scrollAnimations = new ScrollAnimations();
    const formHandler = new FormHandler();
    const parallaxEffects = new ParallaxEffects();
    const performanceMonitor = new PerformanceMonitor();

    // Add loading animation
    document.body.classList.add('loaded');

    // Smooth reveal of content
    setTimeout(() => {
        document.querySelectorAll('section').forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});