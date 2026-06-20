document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen and Welcome Cartoon
    const loadingScreen = document.getElementById('loadingScreen');
    const welcomeCartoon = document.getElementById('welcomeCartoon');
    const mainContent = document.getElementById('mainContent');
    
    mainContent.style.opacity = '0';
    mainContent.style.visibility = 'hidden';
    mainContent.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            welcomeCartoon.classList.add('show');
            
            // Fade out welcome cartoon after 2 seconds
            setTimeout(() => {
                welcomeCartoon.classList.add('fade-out');
                setTimeout(() => {
                    welcomeCartoon.style.display = 'none';
                    mainContent.style.opacity = '1';
                    mainContent.style.visibility = 'visible';
                }, 800);
            }, 2000);
        }, 800);
    }, 1500);

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .testimonial-card, .stat-card, .timeline-content, .contact-card, .education-card, .filter-btn, .slider-dot, .skills-category, .logo, .vip-text');
    
    let lastTrailTime = 0;
    const trailInterval = 40; // ms between trails

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        
        // Update main cursor
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Update follower with smooth delay
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
        
        // Create trailing particles
        if (now - lastTrailTime > trailInterval) {
            createTrail(e.clientX, e.clientY);
            lastTrailTime = now;
        }
    });
    
    // Create colorful trail particles
    function createTrail(x, y) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        
        const trail = document.createElement('div');
        trail.classList.add('trail');
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        trail.style.background = randomColor;
        trail.style.boxShadow = `0 0 ${size}px ${randomColor}`;
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
        }, 800);
    }

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    let isDarkMode = localStorage.getItem('theme') !== 'light';

    function applyTheme() {
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        }
    }

    applyTheme();

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        applyTheme();
    });

    // Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Typing Animation
    const typingText = document.getElementById('typingText');
    const texts = ['Front-End Web Developer', 'Graphic Designer', 'UI/UX Designer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Skills Animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }

    // Scroll Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll('.about-content > *, .services-grid > *, .portfolio-item, .timeline-item, .contact-card, .contact-form');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal');
                element.classList.add('active');
            }
        });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                animateSkills();
            }
        }
    }

    window.addEventListener('scroll', reveal);
    reveal();

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            sliderDots[i].classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
        sliderDots[index].classList.add('active');
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    function startAutoSlide() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoSlide() {
        clearInterval(testimonialInterval);
    }

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    showTestimonial(0);
    startAutoSlide();

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        }
    });

    // Project Modal
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    portfolioLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
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
});