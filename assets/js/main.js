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

// Automatic OS theme: handled purely by CSS prefers-color-scheme; JS toggle removed.

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

// Lightbox removed (gallery links now open images directly)

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
// Enhanced scroll-fx elements
const fxEls = document.querySelectorAll('.scroll-fx');
if ('IntersectionObserver' in window && fxEls.length){
  const fxObs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('visible');
        fxObs.unobserve(en.target);
      }
    });
  }, {threshold:0.15});
  fxEls.forEach(el=>fxObs.observe(el));
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
    // Show number only; the symbol is shown separately in .currency-symbol
    // Decide decimals: explicit data-decimals overrides; else 2 if small value, otherwise 0
    const decimalsAttr = el.getAttribute('data-decimals');
    const decimals = decimalsAttr !== null ? Math.max(0, parseInt(decimalsAttr,10)||0) : (val < 10 ? 2 : 0);
    try{
      el.textContent = new Intl.NumberFormat(undefined, {style:'decimal',maximumFractionDigits:decimals,minimumFractionDigits:decimals}).format(val);
    }catch(e){
      el.textContent = (decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString());
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

/* ---- Generic AJAX submission for Apps Script forms (mobile friendly) ---- */
function setupAjaxForms(){
  const forms = document.querySelectorAll('form[data-ajax="true"]');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      // If earlier validation prevented default, skip ajax
      if (e.defaultPrevented) return;
      const action = form.getAttribute('action') || '';
      if (!/script.google.com\/macros/.test(action)) return; // only intercept Apps Script
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      const noteEl = form.querySelector('.form-note') || form.querySelector('#t-note');
      if (noteEl) noteEl.textContent = 'Submitting…';
      if (submitBtn){
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Please wait…';
      }
      try{
        const fd = new FormData(form);
        // Basic spam check: honeypot
        if (fd.get('_honey')){
          if (noteEl) noteEl.textContent = 'Submission blocked (spam detected).';
          submitBtn && (submitBtn.disabled = false, submitBtn.textContent = submitBtn.dataset.originalText);
          return;
        }
        const res = await fetch(action, {method:'POST', body:fd});
        const isJson = res.headers.get('content-type')?.includes('application/json');
        let payload = {};
        if (isJson){
          payload = await res.json();
        } else {
          payload = {status: res.ok ? 'ok' : 'error'};
        }
        if (payload.status === 'ok'){
          if (noteEl) noteEl.textContent = 'Submitted successfully. We will respond soon.';
          form.reset();
        } else {
          if (noteEl) noteEl.textContent = 'Submission error. Please retry.';
        }
      }catch(err){
        if (noteEl) noteEl.textContent = 'Network error. Check connection and retry.';
      }finally{
        if (submitBtn){
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
        }
      }
    });
  });
}
setupAjaxForms();

/* ---- Vehicles dynamic loader + booking selection integration ---- */
const vehicleGrid = document.getElementById('vehicle-grid');
const vehiclesNote = document.getElementById('vehicles-note');
// Vehicle select removed (booking-first workflow). Keep graceful handling.
const vehicleSelect = null;
const vehicleField = null;

function attachVehicleBookHandlers(){
  const links = document.querySelectorAll('[data-vehicle-id]');
  links.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('data-vehicle-id');
      if (vehicleSelect && id){
        vehicleSelect.value = id;
      }
    });
  });
}

async function loadVehicles(){
  if (!vehicleGrid) return;
  try{
    const resp = await fetch('assets/data/vehicles.json');
    if (!resp.ok) throw new Error('Network');
    const data = await resp.json();
    vehicleGrid.innerHTML = '';
    const available = [];
    data.forEach(v => {
      const art = document.createElement('article');
      art.className = 'vehicle-card';
      art.setAttribute('aria-label', v.name);
      if (v.status === 'coming-soon') art.classList.add('coming-soon');
      art.innerHTML = `
        <div class="vehicle-media">
          <img src="${v.thumbImage}" alt="${v.name}" loading="lazy" />
        </div>
        <div class="vehicle-info">
          <h3>${v.name}</h3>
          <p class="segment">${v.segment || ''}</p>
          <ul class="mini-features">${(v.keyFeatures||[]).slice(0,4).map(f=>`<li>${f}</li>`).join('')}</ul>
          ${v.status === 'available' ? `<a class="btn btn-secondary" href="#book" data-vehicle-id="${v.id}" data-vehicle-name="${v.name}">Book Now</a>` : '<span class="fineprint">Coming Soon</span>'}
        </div>`;
      vehicleGrid.appendChild(art);
      if (v.status === 'available') available.push(v);
    });
    if (vehiclesNote) vehiclesNote.textContent = '';

    // Vehicle selection deferred; no select population required.
    // Vehicle selection absent; nothing to adjust.
    attachVehicleBookHandlers();
  }catch(err){
    console.warn('Vehicle load failed', err);
    if (vehiclesNote) vehiclesNote.textContent = 'Showing fallback vehicle. More coming soon.';
    if (vehicleSelect && vehicleField){
      vehicleField.classList.add('hidden-inline');
    }
    attachVehicleBookHandlers();
  }
}
loadVehicles();

// Hero video removed; no toggle logic required.

/* Testimonials loader and local preview */
const testimonialsGrid = document.getElementById('testimonials-grid');
const testimonialForm = document.getElementById('testimonial-form');

function renderTestimonials(list){
  if (!testimonialsGrid) return;
  testimonialsGrid.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.setAttribute('role','listitem');
    const initials = (item.name||'').trim().split(/\s+/).map(p=>p[0]).slice(0,2).join('').toUpperCase();
    const stars = '★'.repeat(Math.max(1,Math.min(5, item.rating||5)));
    card.innerHTML = `
      <div class="testimonial-header">
        <div class="t-avatar" aria-hidden="true">${initials||'?'}</div>
        <div class="t-meta">
          <p class="t-name">${item.name || 'Anonymous'}</p>
          <p class="t-country">${(item.country||'').toUpperCase()}</p>
        </div>
      </div>
      <div class="t-rating" aria-label="Rating: ${stars.length} out of 5">${stars}</div>
      <p class="t-message">${item.message}</p>
    `;
    testimonialsGrid.appendChild(card);
  });
}

async function loadTestimonials(){
  if (!testimonialsGrid) return;
  try{
    const resp = await fetch('assets/data/testimonials.json');
    if (!resp.ok) throw new Error('network');
    const data = await resp.json();
    // Merge with any locally stored previews
    const previews = JSON.parse(localStorage.getItem('testimonial_previews')||'[]');
    renderTestimonials([...previews, ...data]);
  }catch(err){
    testimonialsGrid.innerHTML = '<p class="fineprint">Testimonials unavailable right now.</p>';
  }
}
loadTestimonials();

if (testimonialForm){
  testimonialForm.addEventListener('submit', () => {
    try{
      const preview = {
        name: document.getElementById('t-name').value,
        country: document.getElementById('t-country').value,
        rating: parseInt(document.getElementById('t-rating').value,10)||5,
        message: document.getElementById('t-message').value,
        date: new Date().toISOString().slice(0,10),
        permission: document.getElementById('t-permission').value
      };
      const previews = JSON.parse(localStorage.getItem('testimonial_previews')||'[]');
      previews.unshift(preview);
      localStorage.setItem('testimonial_previews', JSON.stringify(previews.slice(0,5)));
      // Re-render with new preview on top
      loadTestimonials();
      const note = document.getElementById('t-note');
      if (note) note.textContent = 'Submitted. Your testimonial appears locally pending review.';
    }catch(e){
      console.warn('Preview store failed', e);
    }
  });
}
