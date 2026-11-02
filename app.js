/**
 * The Brew House — app.js
 * Covers: sticky header, mobile drawer, active nav, menu filter,
 *         testimonial carousel, gallery lightbox, form validation,
 *         scroll-reveal, back-to-top.
 */

/* ── Utilities ───────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Theme toggle ───────────────────────────────────────────── */
const themeToggle = qs('#theme-toggle');
const themeStorageKey = 'brew-house-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} theme`;
  qs('span', themeToggle).textContent = isDark ? '☀' : '☾';
}

let initialTheme = 'light';
try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === 'dark' || savedTheme === 'light') initialTheme = savedTheme;
} catch (error) {
  console.warn('Unable to load the saved theme preference.', error);
}
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.warn('Unable to save the theme preference.', error);
  }
});

/* ─────────────────────────────────────────────────────────────
   1. STICKY HEADER — adds .is-scrolled after 40 px scroll
───────────────────────────────────────────────────────────── */
const header = qs('.site-header');

const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
  // Back-to-top visibility
  backToTop.hidden = window.scrollY < 400;
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ─────────────────────────────────────────────────────────────
   2. MOBILE DRAWER
───────────────────────────────────────────────────────────── */
const navToggle    = qs('#nav-toggle');
const mobileDrawer = qs('#mobile-drawer');
const overlay      = qs('#drawer-overlay');

function openDrawer() {
  mobileDrawer.classList.add('is-open');
  mobileDrawer.removeAttribute('aria-hidden');
  overlay.classList.add('is-visible');
  overlay.removeAttribute('aria-hidden');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close navigation menu');
  // Move focus into the drawer
  qs('.drawer-link', mobileDrawer)?.focus();
}

function closeDrawer() {
  mobileDrawer.classList.remove('is-open');
  mobileDrawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  navToggle.focus();
}

navToggle.addEventListener('click', () => {
  mobileDrawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) closeDrawer();
});

// Close when any drawer link is clicked
qsa('.drawer-link', mobileDrawer).forEach(link =>
  link.addEventListener('click', closeDrawer)
);

/* ─────────────────────────────────────────────────────────────
   3. ACTIVE NAV LINK — highlights the current section in both navs
───────────────────────────────────────────────────────────── */
const sections = qsa('main section[id]');
const navLinks = qsa('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${id}`;
      link.toggleAttribute('aria-current', active);
      if (active) link.setAttribute('aria-current', 'page');
      else        link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim()} 0px -55% 0px` });

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────────────────────────
   4. MENU CATEGORY FILTER
───────────────────────────────────────────────────────────── */
const tabBtns   = qsa('.tab-btn');
const menuCards = qsa('.menu-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update tab state
    tabBtns.forEach(b => {
      b.classList.remove('tab-btn--active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('tab-btn--active');
    btn.setAttribute('aria-selected', 'true');

    // Show / hide cards
    menuCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.hidden = !match;
    });
  });
});

/* ─────────────────────────────────────────────────────────────
   5. TESTIMONIAL CAROUSEL
───────────────────────────────────────────────────────────── */
const track    = qs('#testi-track');
const cards    = qsa('.testi-card', track);
const dotsWrap = qs('#testi-dots');
const prevBtn  = qs('#testi-prev');
const nextBtn  = qs('#testi-next');

let current = 0;
let autoplayTimer;

// Build dot buttons
cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = `dot${i === 0 ? ' is-active' : ''}`;
  dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(index) {
  current = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  qsa('.dot', dotsWrap).forEach((d, i) => d.classList.toggle('is-active', i === current));
  cards.forEach((c, i) => c.setAttribute('aria-hidden', i !== current));
  resetAutoplay();
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

// Keyboard arrow navigation on the section
qs('.testimonials').addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

// Autoplay (pauses on hover / focus)
function startAutoplay() {
  autoplayTimer = setInterval(() => goTo(current + 1), 5000);
}
function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

const testiSection = qs('.testimonials');
testiSection.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
testiSection.addEventListener('mouseleave', startAutoplay);
testiSection.addEventListener('focusin',   () => clearInterval(autoplayTimer));
testiSection.addEventListener('focusout',  startAutoplay);

// Init
goTo(0);
startAutoplay();

/* ─────────────────────────────────────────────────────────────
   6. GALLERY LIGHTBOX
───────────────────────────────────────────────────────────── */
const lightbox    = qs('#lightbox');
const lbClose     = qs('#lightbox-close');
const lbMedia     = qs('#lightbox-media');
const lbCaption   = qs('#lightbox-caption');
const galleryItems = qsa('.gallery-item');

function openLightbox(item) {
  const icon    = qs('.g-icon', item)?.textContent || '☕';
  const caption = item.dataset.caption || '';
  lbMedia.textContent   = icon;
  lbCaption.textContent = caption;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

/* ─────────────────────────────────────────────────────────────
   7. CONTACT FORM — inline validation + submit handler
───────────────────────────────────────────────────────────── */
const form       = qs('#contact-form');
const submitBtn  = qs('#submit-btn');
const feedback   = qs('#form-feedback');

const rules = {
  'f-name':    { test: v => v.trim().length >= 2,    msg: 'Please enter your name (at least 2 characters).' },
  'f-email':   { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
  'f-message': { test: v => v.trim().length >= 10,   msg: 'Please enter a message (at least 10 characters).' },
};

function validateField(input) {
  const rule   = rules[input.id];
  if (!rule) return true;
  const valid  = rule.test(input.value);
  const group  = input.closest('.form-group');
  const errEl  = qs(`#${input.id}-error`);
  group.classList.toggle('has-error', !valid);
  if (errEl) errEl.textContent = valid ? '' : rule.msg;
  return valid;
}

// Validate on blur
Object.keys(rules).forEach(id => {
  const el = qs(`#${id}`);
  if (el) el.addEventListener('blur', () => validateField(el));
});

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Run all validations
    const fields = Object.keys(rules).map(id => qs(`#${id}`)).filter(Boolean);
    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) {
      fields.find(f => !rules[f.id]?.test(f.value))?.focus();
      return;
    }

    // Show loading state
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    // Simulate async send — TODO: replace with real fetch() to your endpoint
    await new Promise(r => setTimeout(r, 1500));

    // Success
    submitBtn.classList.remove('is-loading');
    submitBtn.disabled = false;
    feedback.hidden = false;
    feedback.className = 'form-feedback is-success';
    feedback.textContent = "\u2713 Message sent! We\u2019ll be in touch within one working day.";
    form.reset();
    fields.forEach(f => f.closest('.form-group')?.classList.remove('has-error'));

    // Auto-hide after 6 s
    setTimeout(() => { feedback.hidden = true; feedback.className = 'form-feedback'; }, 6000);
  });
}

/* ─────────────────────────────────────────────────────────────
   8. SCROLL REVEAL — animates elements with .reveal
───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.15 });

qsa('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────────────────────────
   9. BACK-TO-TOP BUTTON
───────────────────────────────────────────────────────────── */
const backToTop = qs('#back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
// Initial state is set by onScroll above (hidden by default via HTML attr)
