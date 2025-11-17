// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = String(new Date().getFullYear());

// Simple lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox?.querySelector('img');
const lbCap = lightbox?.querySelector('.lightbox-caption');
const lbClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.glightbox').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const href = (a as HTMLAnchorElement).href;
    const cap = (a as HTMLAnchorElement).getAttribute('data-caption') || '';
    if (lightbox && lbImg && lbCap) {
      (lbImg as HTMLImageElement).src = href;
      lbCap.textContent = cap;
      lightbox.classList.remove('hidden');
    }
  });
});

if (lbClose && lightbox) {
  lbClose.addEventListener('click', () => lightbox.classList.add('hidden'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.add('hidden');
  });
}
