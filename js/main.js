// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Language handling
let currentLanguage = localStorage.getItem('preferred-language') || 'en';

// Keyboard shortcut for language switching
document.addEventListener('keydown', function(event) {
    // Alt + L to switch language
    if (event.altKey && (event.key.toLowerCase() === 'l')|| (event.key ==='م')) {
        const newLang = currentLanguage === 'en' ? 'ar' : 'en';
        changeLanguage(newLang);
    }
});

function changeLanguage(lang) {
    currentLanguage = lang;
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translations
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update the language switcher tooltip
    updateLanguageSwitcherTooltip();

    // Reinitialize Typed.js with new language
    if (typedInstance) {
        typedInstance.destroy();
    }
    initTyped(lang);
}

// Update language switcher tooltip
function updateLanguageSwitcherTooltip() {
    const tooltip = document.getElementById('language-shortcut-tooltip');
    if (tooltip) {
        tooltip.textContent = currentLanguage === 'en' ? 
            'Press Alt + L to switch to Arabic' : 
            'اضغط Alt + L للتبديل إلى الإنجليزية';
    }
}

let typedInstance;

function initTyped(lang) {
    const strings = lang === 'ar' ? [
        'محلل نظم',
        'مطور شامل',
        'حلال المشكلات',
        'عاشق التقنية'
    ] : [
        'System Analyst',
        'Full-Stack Developer',
        'Problem Solver',
        'Tech Enthusiast'
    ];

    typedInstance = new Typed('.typed-text', {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}

// Dark Mode Functionality
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed
    initTyped(currentLanguage);

    // Initialize theme
    initTheme();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.padding = '1rem 0';
        }
    });

    // Theme toggle event listener
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Portfolio items data
    const portfolioItems = [
        {
            title: 'Project 1',
            category: 'Web Development',
            image: 'path/to/image1.jpg',
            description: 'Description of project 1',
            demoLink: '#',
            githubLink: '#'
        },
        // Add more portfolio items as needed
    ];

    // Function to create portfolio items
    function createPortfolioItems() {
        const portfolioContainer = document.querySelector('#portfolio .row');
        if (!portfolioContainer) return;

        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'col-md-4 col-sm-6';
            portfolioItem.setAttribute('data-aos', 'fade-up');
            
            portfolioItem.innerHTML = `
                <div class="portfolio-item">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid">
                    <div class="portfolio-overlay">
                        <div class="portfolio-info text-center">
                            <h4>${item.title}</h4>
                            <p>${item.category}</p>
                            <div class="portfolio-links">
                                <a href="${item.demoLink}" target="_blank" class="btn btn-light btn-sm me-2">Live Demo</a>
                                <a href="${item.githubLink}" target="_blank" class="btn btn-light btn-sm">GitHub</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioContainer.appendChild(portfolioItem);
        });
    }

    // Initialize portfolio items
    createPortfolioItems();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Skills animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Call skills animation when skills section is in view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}
