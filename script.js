/**
 * Mosope Mogaji — Portfolio
 * Vanilla JS: nav scroll-spy + mobile menu, custom cursor, magnetic
 * buttons, IntersectionObserver-based scroll reveals (including a
 * character-reveal effect for the hero name), and contact form
 * validation. No dependencies, no frameworks.
 */

// ---------- Sticky nav background + scroll-spy ----------
function initNav() {
  const nav = document.getElementById('site-nav');
  const links = document.querySelectorAll('[data-nav-link]');
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    let currentId = null;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

// ---------- Mobile menu ----------
function initMobileNav() {
  const toggle = document.getElementById('nav-mobile-toggle');
  const panel = document.getElementById('nav-mobile-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ---------- Custom cursor (desktop / fine-pointer devices only) ----------
function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    document.body.classList.add('cursor-ready');
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .magnetic, .magnetic-soft').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

// ---------- Magnetic buttons ----------
function initMagneticButtons() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ---------- Scroll-triggered reveals ----------
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-word');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  // Stagger siblings within the same parent container
  const groups = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((group) => {
    group.forEach((el, i) => el.style.setProperty('--stagger', i));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach((el) => observer.observe(el));
}

// ---------- Hero name character reveal ----------
function initHeroTextReveal() {
  const lines = document.querySelectorAll('[data-reveal-chars]');
  lines.forEach((line, lineIndex) => {
    const text = line.textContent;
    line.textContent = '';
    line.setAttribute('aria-hidden', 'true'); // visual only; real text lives on the parent h1's aria-label

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      span.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${lineIndex * 0.15 + i * 0.03}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${lineIndex * 0.15 + i * 0.03}s`;
      line.appendChild(span);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      });
    });
  });
}

// ---------- Contact form validation + real submission ----------
// Update this once the contact backend is deployed (see contact-backend/README.md).
const CONTACT_API_URL = 'https://portfolio-z39k.onrender.com/api/contact';

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function showError(input, message) {
    input.classList.add('error');
    const err = input.parentElement.querySelector('.field-error');
    if (err) { err.textContent = message; err.style.display = 'block'; }
  }
  function clearError(input) {
    input.classList.remove('error');
    const err = input.parentElement.querySelector('.field-error');
    if (err) err.style.display = 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const message = document.getElementById('cf-message');
    const submitBtn = document.getElementById('cf-submit');
    const successEl = document.getElementById('cf-success');

    if (name.value.trim().length < 2) { showError(name, 'Please enter your name.'); isValid = false; }
    else clearError(name);

    if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email address.'); isValid = false; }
    else clearError(email);

    if (message.value.trim().length < 10) { showError(message, 'Message should be at least 10 characters.'); isValid = false; }
    else clearError(message);

    if (!isValid) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    successEl.classList.remove('is-error');
    successEl.style.display = 'none';

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        successEl.textContent = data.error || 'Could not send your message. Please try again, or reach out directly.';
        successEl.classList.add('is-error');
        successEl.style.display = 'block';
        return;
      }

      form.style.display = 'none';
      successEl.textContent = 'Message sent — thanks for reaching out. I\'ll get back to you soon.';
      successEl.style.display = 'block';
    } catch (err) {
      successEl.textContent = 'Could not reach the server. Please try again, or reach out directly using the details alongside this form.';
      successEl.classList.add('is-error');
      successEl.style.display = 'block';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileNav();
  initCustomCursor();
  initMagneticButtons();
  initHeroTextReveal();
  initScrollReveal();
  initContactForm();
});
