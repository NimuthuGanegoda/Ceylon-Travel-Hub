// Mobile nav toggle & close on link click
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Year in footer: set for any element whose id starts with "year"
const yearEls = document.querySelectorAll('[id^="year"]');
const yearStr = String(new Date().getFullYear());
yearEls.forEach(el => { el.textContent = yearStr; });

// Theme toggle
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', next);
    }
  });
}

// Active nav link highlighting by section intersection (derive from internal hash links)
const sectionIds = Array.from((navLinks || document).querySelectorAll('a[href^="#"]'))
  .map(a => a.getAttribute('href'))
  .filter(Boolean)
  .map(h => h.replace('#',''))
  .filter(id => id && document.getElementById(id));
const observerOptions = {root:null,rootMargin:'0px 0px -60% 0px',threshold:0};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;
    if (!id) return;
    const link = navLinks && navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, observerOptions);
sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// Lightbox (dialog) with ESC + basic focus management
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox && lightbox.querySelector('img');
const lbCap = lightbox && lightbox.querySelector('.lightbox-caption');
const lbClose = lightbox && lightbox.querySelector('.lightbox-close');
let previousFocus = null;

function openLightbox(href, cap){
  if (!lightbox || !lbImg || !lbCap) return;
  lbImg.src = href;
  lbCap.textContent = cap;
  previousFocus = document.activeElement;
  lightbox.showModal();
  lightbox.classList.remove('hidden');
  lbClose.focus();
}
function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.add('hidden');
  if (typeof lightbox.close === 'function') lightbox.close();
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll('.glightbox').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href || link.getAttribute('href');
    const cap = link.getAttribute('data-caption') || '';
    openLightbox(href, cap);
  });
});
if (lbClose && lightbox) {
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox();
  });
}

// Booking form validation (return date after pickup)
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    const pickup = bookingForm.querySelector('#pickup-date');
    const drop = bookingForm.querySelector('#drop-date');
    const note = bookingForm.querySelector('.form-note');
    if (pickup && drop && note) {
      const pVal = pickup.value;
      const dVal = drop.value;
      if (pVal && dVal && dVal < pVal) {
        e.preventDefault();
        note.textContent = 'Return date must be after pickup date.';
        drop.focus();
      } else {
        note.textContent = '';
      }
    }
  });
}

/* --- New enhancements: currency conversion, reveal/parallax, booking service handling, scroll progress --- */

// Scroll progress bar
const progress = document.getElementById('scroll-progress');
function updateProgress(){
  if (!progress) return;
  const h = document.documentElement;
  const scrollTop = h.scrollTop || document.body.scrollTop;
  const docHeight = h.scrollHeight - h.clientHeight;
  const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  progress.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length){
  const rObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('reveal','revealed');
        rObs.unobserve(en.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el => rObs.observe(el));
}

// Simple parallax for hero
const hero = document.querySelector('.hero-full');
function heroParallax(){
  if (!hero) return;
  const y = window.scrollY;
  hero.style.transform = `translateY(${Math.min(0, y * -0.06)}px)`;
}
window.addEventListener('scroll', heroParallax, {passive:true});

// Currency conversion (base prices stored in data-base as USD)
const currencySelect = document.getElementById('currency-select');
const moneyEls = document.querySelectorAll('.money');
const currencySymbolEls = document.querySelectorAll('.currency-symbol');
const currencySymbols = {USD:'$',LKR:'Rs',EUR:'€',GBP:'£',JPY:'¥',KRW:'₩'};
let rates = {USD:1};

async function fetchRates(){
  try{
    const resp = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=USD,LKR,EUR,GBP,JPY,KRW');
    if (!resp.ok) throw new Error('rate error');
    const data = await resp.json();
    rates = data.rates || rates;
  }catch(err){
    console.warn('Currency rates unavailable, using USD base', err);
    rates = {USD:1,LKR:1,rates:1};
  }
  renderPrices();
}

function renderPrices(){
  const cur = (currencySelect && currencySelect.value) || 'USD';
  moneyEls.forEach(el => {
    const base = parseFloat(el.dataset.base || '0');
    const rate = rates[cur] || 1;
    const val = base * rate;
    try{
      el.textContent = new Intl.NumberFormat(undefined, {style:'currency',currency:cur,maximumFractionDigits:0}).format(val).replace(/[0-9\.,\s]/g,'') ? new Intl.NumberFormat(undefined, {style:'currency',currency:cur,maximumFractionDigits:0}).format(val) : val;
      // Fallback: simply show numeric
    }catch(e){
      el.textContent = val.toFixed(0);
    }
  });
  // Update symbol elements (simple visual)
  currencySymbolEls.forEach(s => {
    const curSym = currencySymbols[currencySelect.value] || currencySymbols.USD;
    s.textContent = curSym;
  });
}

if (currencySelect){
  currencySelect.addEventListener('change', renderPrices);
  fetchRates();
}

// Booking service handling (show airport fields, seat/licence notes)
const serviceSelect = document.getElementById('service');
const airportFields = document.getElementById('airport-fields');
const formNote = document.querySelector('.form-note');
function updateServiceNote(){
  if (!serviceSelect) return;
  const v = serviceSelect.value;
  if (v === 'airport-transfer'){
    airportFields && airportFields.classList.remove('hidden-inline');
    airportFields && airportFields.removeAttribute('aria-hidden');
    formNote.textContent = 'Airport transfer selected — please provide flight number and airline.';
  } else {
    airportFields && airportFields.classList.add('hidden-inline');
    airportFields && airportFields.setAttribute('aria-hidden','true');
    if (v === 'self-drive'){
      formNote.textContent = 'Self-drive: valid driving licence required. International visitors should carry an International Driving Permit (IDP). Driver occupies one seat.';
    } else if (v === 'driver' || v === 'driver-guide'){
      formNote.textContent = 'Driver provided: seating is 4 adults + 1 child (driver occupies front seat). Guide can be the driver if requested.';
    } else {
      formNote.textContent = '';
    }
  }
}
if (serviceSelect){
  serviceSelect.addEventListener('change', updateServiceNote);
  updateServiceNote();
}

// Additional booking validation for airport transfer
if (bookingForm){
  bookingForm.addEventListener('submit', e => {
    const svc = bookingForm.querySelector('#service');
    if (svc && svc.value === 'airport-transfer'){
      const flight = bookingForm.querySelector('#flight-number');
      const airline = bookingForm.querySelector('#airline');
      if (!flight || !flight.value || !airline || !airline.value){
        e.preventDefault();
        (formNote).textContent = 'Please provide flight number and airline for airport transfers.';
        (flight || airline).focus();
      }
    }
  });
}
