// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const license = document.getElementById('license').value.trim();
    const pickupDate = document.getElementById('pickup-date').value;
    const returnDate = document.getElementById('return-date').value;
    const rentalPlan = document.getElementById('rental-plan').value;
    
    // Basic validation
    if (!name || !email || !phone || !license || !pickupDate || !returnDate || !rentalPlan) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Validate dates
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (pickup < today) {
        alert('Pick-up date cannot be in the past.');
        return;
    }
    
    if (returnD <= pickup) {
        alert('Return date must be after pick-up date.');
        return;
    }
    
    // Show success modal
    modal.style.display = 'block';
    
    // Reset form
    bookingForm.reset();
    
    // Log booking details (in real application, this would send to a server)
    console.log('Booking Details:', {
        name,
        email,
        phone,
        license,
        pickupDate,
        returnDate,
        rentalPlan
    });
});

// Close modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Set minimum date for date inputs to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('pickup-date').setAttribute('min', today);
document.getElementById('return-date').setAttribute('min', today);

// Update return date minimum when pickup date changes
document.getElementById('pickup-date').addEventListener('change', function() {
    const pickupDate = this.value;
    const returnDateInput = document.getElementById('return-date');
    returnDateInput.setAttribute('min', pickupDate);
    
    // Reset return date if it's before the new pickup date
    if (returnDateInput.value && returnDateInput.value <= pickupDate) {
        returnDateInput.value = '';
    }
});

// Add active state to navigation on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.spec-item, .pricing-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
    }
});

console.log('Elite Travel Rentals - Audi Q2 Website Loaded Successfully!');
