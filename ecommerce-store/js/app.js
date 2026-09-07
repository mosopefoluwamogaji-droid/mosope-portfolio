/**
 * LUXEMART — app.js
 * Shared functionality loaded on every page: mobile nav, sticky header
 * effects, dark/light mode, toast notifications, back-to-top, smooth
 * scroll, active nav highlighting, scroll-reveal animations, and the
 * cart-count badge (kept in sync via cart.js's exposed helpers).
 */

// ---------- Toasts ----------
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast${type === 'error' ? ' toast-error' : ''}`;
  toast.innerHTML = `${type === 'error' ? Icons.alertCircle() : Icons.checkCircle()}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 220);
  }, 2800);
}
window.showToast = showToast;

// ---------- Dark / Light mode ----------
function initTheme() {
  const stored = localStorage.getItem('luxemart_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('luxemart_theme', next);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// ---------- Mobile nav ----------
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.innerHTML = isOpen ? Icons.close() : Icons.menu();
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.innerHTML = Icons.menu();
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ---------- Active nav highlighting ----------
function highlightActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ---------- Back to top ----------
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 480);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- Sticky header shadow on scroll ----------
function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 4 ? '0 2px 12px rgba(0,0,0,0.06)' : 'none';
  });
}

// ---------- Scroll-reveal ----------
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((el) => observer.observe(el));
}

// ---------- Newsletter form ----------
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const errorEl = form.querySelector('.field-error');
    const email = input.value.trim();

    if (!Validation.isValidEmail(email)) {
      if (errorEl) { errorEl.textContent = 'Please enter a valid email address.'; errorEl.style.display = 'block'; }
      input.classList.add('error');
      return;
    }

    if (errorEl) errorEl.style.display = 'none';
    input.classList.remove('error');
    input.value = '';
    showToast('Subscribed! Watch your inbox for LUXEMART offers.');
  });
}

// ---------- FAQ accordion ----------
function initFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ---------- Page loader ----------
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 250);
  });
}

// ---------- Init everything shared ----------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  highlightActiveNav();
  initBackToTop();
  initHeaderScrollEffect();
  initScrollReveal();
  initNewsletterForm();
  initFaqAccordion();
  initPageLoader();

  if (window.Cart && typeof window.Cart.updateCartBadge === 'function') {
    window.Cart.updateCartBadge();
  }
  if (window.Cart && typeof window.Cart.updateWishlistBadge === 'function') {
    window.Cart.updateWishlistBadge();
  }
});
