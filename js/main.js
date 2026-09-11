// ==================== DOM ELEMENTS ====================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const screenshotCarousel = document.getElementById('screenshot-carousel');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== MOBILE MENU TOGGLE ====================
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const svg = mobileMenuBtn.querySelector('svg');
    if (mobileMenu.classList.contains('active')) {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
    } else {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const svg = mobileMenuBtn.querySelector('svg');
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
    });
});

// ==================== SMOOTH SCROLL ====================
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

// ==================== SCREENSHOT CAROUSEL ====================
const carouselItems = screenshotCarousel.querySelectorAll('.snap-center');
const itemWidth = carouselItems[0]?.offsetWidth + 24 || 320; // width + gap

carouselNext.addEventListener('click', () => {
    screenshotCarousel.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
    });
});

carouselPrev.addEventListener('click', () => {
    screenshotCarousel.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
    });
});

// Touch/Swipe support for carousel
let startX, scrollLeft, isDragging = false;

screenshotCarousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - screenshotCarousel.offsetLeft;
    scrollLeft = screenshotCarousel.scrollLeft;
    screenshotCarousel.style.cursor = 'grabbing';
});

screenshotCarousel.addEventListener('mouseleave', () => {
    isDragging = false;
    screenshotCarousel.style.cursor = 'grab';
});

screenshotCarousel.addEventListener('mouseup', () => {
    isDragging = false;
    screenshotCarousel.style.cursor = 'grab';
});

screenshotCarousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - screenshotCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    screenshotCarousel.scrollLeft = scrollLeft - walk;
});

// Set cursor on carousel
screenshotCarousel.style.cursor = 'grab';

// ==================== SCROLL REVEAL ANIMATION ====================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for reveal animation
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ==================== FEATURE CARDS ANIMATION ====================
const featureCards = document.querySelectorAll('.feature-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ==================== LIGHTBOX ====================
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-close">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </div>
        <img src="" alt="Screenshot">
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    return lightbox;
}

const lightbox = createLightbox();

// Add click event to screenshot images
document.querySelectorAll('#screenshot-carousel img').forEach(img => {
    img.addEventListener('click', () => {
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
    });
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// ==================== BUTTON HOVER EFFECT ====================
document.querySelectorAll('.btn-primary, a[href="#download"]').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== STATS COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Observe stats section
const statsSection = document.querySelector('.grid.grid-cols-2');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class if needed
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ==================== DOWNLOAD BUTTON RIPPLE EFFECT ====================
document.querySelectorAll('a[href="downloads/app-release.apk"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(40);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
`;
backToTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 transition-all duration-300 opacity-0 invisible z-40';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
});

// ==================== CONSOLE LOG ====================
console.log('%c AgentNote 🐱', 'color: #6C3FC5; font-size: 24px; font-weight: bold;');
console.log('%c Digital Agent Management App', 'color: #8B5CF6; font-size: 14px;');
console.log('%c Made with ❤️ in Myanmar', 'color: #6B7280; font-size: 12px;');
