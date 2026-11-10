// ==================== DOM ELEMENTS ====================
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const screenshotCarousel = document.getElementById('screenshot-carousel');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');

    // ==================== NAVBAR SCROLL EFFECT ====================
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==================== MOBILE MENU TOGGLE ====================
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const svg = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('active')) {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            } else {
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            }
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const svg = mobileMenuBtn.querySelector('svg');
                svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            });
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==================== SCREENSHOT CAROUSEL ====================
    if (screenshotCarousel && carouselPrev && carouselNext) {
        const carouselItems = screenshotCarousel.querySelectorAll('.snap-center');
        const itemWidth = carouselItems[0]?.offsetWidth + 24 || 320;

        carouselNext.addEventListener('click', () => {
            screenshotCarousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });

        carouselPrev.addEventListener('click', () => {
            screenshotCarousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

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

        screenshotCarousel.style.cursor = 'grab';
    }

    // ==================== SCROLL REVEAL ANIMATION ====================
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

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

        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });

        return lightbox;
    }

    const lightbox = createLightbox();

    document.querySelectorAll('#screenshot-carousel img').forEach(img => {
        img.addEventListener('click', () => {
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');
        if (loading) loading.classList.add('hidden');
    });

    // ==================== 🔥 AUTO DATE & PRICING SCRIPT ====================
    (function () {
        const PROMO_START = new Date('2026-11-10T00:00:00+06:30');
        const PROMO_END   = new Date('2026-11-25T23:59:59+06:30');
        const BASE_PRICE  = 15000;

        const PROMO_DISCOUNTS = { 1: 30, 2: 32, 3: 35, 6: 40, 12: 45, 0: 0 };
        const NORMAL_DISCOUNTS = { 1: 0, 2: 5, 3: 8, 6: 12, 12: 15, 0: 0 };
        const LIFETIME_PRICE = 500000;

        const now = new Date();
        const isPromo = now >= PROMO_START && now <= PROMO_END;

        function buildPackages() {
            const disc = isPromo ? PROMO_DISCOUNTS : NORMAL_DISCOUNTS;
            const list = [
                { months: 1, label: '၁ လ' },
                { months: 2, label: '၂ လ' },
                { months: 3, label: '၃ လ' },
                { months: 6, label: '၆ လ' },
                { months: 12, label: '၁၂ လ' }
            ];
            return list.map(item => {
                const original = BASE_PRICE * item.months;
                const pct = disc[item.months] || 0;
                const price = Math.round(original * (100 - pct) / 100);
                return { ...item, original, pct, price, isLifetime: false };
            });
        }

        function packageCard(pkg) {
            if (pkg.isLifetime) {
                return `
                    <div class="border-2 border-yellow-400 bg-yellow-50 rounded-xl p-4 hover:border-yellow-500 transition-all">
                        <div class="flex justify-between items-center">
                            <span class="font-bold text-gray-800">Life Time</span>
                            <span class="bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">BEST</span>
                        </div>
                        <p class="text-primary-600 font-bold text-lg mt-1">${LIFETIME_PRICE.toLocaleString('en-US')} ကျပ်</p>
                        <p class="text-gray-400 text-xs">တစ်သက်တာ အသုံးပြုနိုင်</p>
                    </div>
                `;
            }
            const pctBadge = pkg.pct > 0
                ? `<span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">-${pkg.pct}%</span>`
                : `<span class="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-semibold">0%</span>`;
            const originalStrike = pkg.pct > 0
                ? `<p class="text-gray-400 text-xs line-through">${pkg.original.toLocaleString('en-US')} ကျပ်</p>`
                : ``;
            return `
                <div class="border-2 border-gray-200 rounded-xl p-4 hover:border-primary-400 transition-all">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-gray-800">${pkg.label}</span>
                        ${pctBadge}
                    </div>
                    <p class="text-primary-600 font-bold text-lg mt-1">${pkg.price.toLocaleString('en-US')} ကျပ်</p>
                    ${originalStrike}
                </div>
            `;
        }

        function renderPackages() {
            const grid = document.getElementById('packageGrid');
            if (!grid) return;
            const packages = buildPackages();
            let html = packages.map(packageCard).join('');
            html += packageCard({ isLifetime: true });
            grid.innerHTML = html;
        }

        function togglePromoElements() {
            const promoBanner = document.getElementById('promoBanner');
            const downloadPromoBox = document.getElementById('downloadPromoBox');
            if (isPromo) {
                if (promoBanner) promoBanner.classList.remove('hidden');
                if (downloadPromoBox) downloadPromoBox.classList.remove('hidden');
            } else {
                if (promoBanner) promoBanner.classList.add('hidden');
                if (downloadPromoBox) downloadPromoBox.classList.add('hidden');
            }
        }

        renderPackages();
        togglePromoElements();

        console.log('%c AgentNote Pricing Auto-Check', 'color:#6C3FC5;font-weight:bold;');
        console.log('ယခုရက်စွဲ:', now.toString());
        console.log('ပရိုမိုးကာလအတွင်း:', isPromo ? '✅ ရှိ' : '❌ မရှိ');
    })();

    // ==================== CONSOLE LOG ====================
    console.log('%c AgentNote 🐱', 'color: #6C3FC5; font-size: 24px; font-weight: bold;');
    console.log('%c Digital Agent Management App', 'color: #8B5CF6; font-size: 14px;');
    console.log('%c Made with ❤️ in Myanmar', 'color: #6B7280; font-size: 12px;');

});