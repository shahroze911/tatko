/* ============================================
   TATKOVIC CONSULTING — MAIN SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Sticky header shadow ----
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            header && header.classList.add('scrolled');
        } else {
            header && header.classList.remove('scrolled');
        }
    });

    // ---- Mobile hamburger ----
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            mobileNav.classList.toggle('open');
        });
    }

    // ---- Scroll reveal ----
    const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
        observer.observe(el);
    });

    // ---- Active nav highlight ----
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = '#b89c6e';
        }
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile nav if open
                mobileNav && mobileNav.classList.remove('open');
            }
        });
    });

    // ---- Form submission ----
    const forms = document.querySelectorAll('.inquiry-form, form');
    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const original = btn.textContent;
                btn.textContent = 'SENDING...';
                btn.disabled = true;
                setTimeout(function () {
                    btn.textContent = '✓ INQUIRY SENT';
                    btn.style.backgroundColor = '#b89c6e';
                    setTimeout(function () {
                        btn.textContent = original;
                        btn.disabled = false;
                        btn.style.backgroundColor = '';
                        form.reset();
                    }, 3000);
                }, 1200);
            }
        });
    });

});
