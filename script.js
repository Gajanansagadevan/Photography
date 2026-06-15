/* ============================================
   GAJANAN'S PHOTOGRAPHY — script.js
   ============================================ */

/* ---- GALLERY DATA ---- */
const galleryItems = [
  { category: 'wedding',  label: 'Wedding Ceremony',       img: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'event',    label: 'Corporate Event',         img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { category: 'drone',    label: 'Aerial Landscape',        img: 'https://images.unsplash.com/photo-1544015759-237f87d55ef3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWVyaWFsJTIwbGFuZHNjYXBlJTIwaW4lMjBzcmlsYW5rYXxlbnwwfHwwfHx8MA%3D%3D' },
  { category: 'portrait', label: 'Pre-shoot Portrait',      img: 'https://images.unsplash.com/photo-1610173824790-235077c19589?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { category: 'wedding',  label: 'Reception Hall',          img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80' },
  { category: 'event',    label: 'Birthday Celebration',    img: 'https://images.unsplash.com/photo-1544155892-b2b6c64204fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJpcnRoZGF5JTIwY2VsZWJyYXRpb24lMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D' },
  { category: 'drone',    label: 'Drone City View',         img: 'https://media.istockphoto.com/id/2225321032/photo/aerial-panorama-of-tea-plantations-and-gregory-lake-in-nuwara-eliya-sri-lanka.jpg?s=612x612&w=0&k=20&c=RaYBWsqEOXak6Cz1E7J_Re1Gg3MOa2n4EwJ3-nKMOZU=' },
  { category: 'portrait', label: 'Studio Portrait',         img: 'https://media.istockphoto.com/id/2236739542/photo/newborn-baby-wrapped-in-a-hospital-blanket-held-by-a-loving-asian-mother-in-the-hospital.jpg?s=1024x1024&w=is&k=20&c=whV609leBlV5mEvCSWvJ934YS2xR35u0Go1q2vvKn9s=' },
  { category: 'wedding',  label: 'Couple Portrait',         img: 'https://media.istockphoto.com/id/1146935866/photo/outside-indian-couple.jpg?s=612x612&w=0&k=20&c=_QCwa8XPdouRCOTsO5ZW9Z5kp8JL8UWOjgUXIJn2bvA=' },
  { category: 'event',    label: 'School Sports Day',       img: 'https://images.unsplash.com/photo-1700914299961-d8f91559d85d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHNjaG9vbCUyMHNwb3J0cyUyMGV2YW50fGVufDB8fDB8fHww' },
  { category: 'drone',    label: 'Real Estate Aerial',      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { category: 'portrait', label: 'Big Girl Function',       img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBHVkydmxUGGsKfeMunEJkr2c0xU631aIlNhfPaSaOjUu2-0TPWoHRACO&s=10' },
];

/* ---- RENDER GALLERY ---- */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  filtered.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item reveal';
    el.setAttribute('data-category', item.category);
    el.setAttribute('data-label', item.label);

    el.innerHTML = `
      <div class="gallery-placeholder" style="background:#0a1525;padding:0;overflow:hidden;">
        <img src="${item.img}" alt="${item.label}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s ease;" onerror="this.style.display='none'"/>
      </div>
      <div class="gallery-overlay">
        <span>${item.label}</span>
      </div>
    `;

    el.addEventListener('click', () => openLightbox(item));
    grid.appendChild(el);

    // stagger reveal
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 60);
  });
}

/* ---- GALLERY FILTER ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

/* ---- LIGHTBOX ---- */
function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  img.src = item.img;
  img.style.display = 'block';
  cap.textContent = item.label + ' — Gajanan\'s Photography';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ---- MOBILE HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- SCROLL REVEAL ---- */
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- BOOKING FORM VALIDATION ---- */
function validateField(id, errorId, message) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(errorId);
  const value = el.value.trim();

  if (!value) {
    el.classList.add('error');
    errEl.textContent = message;
    return false;
  }

  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    el.classList.add('error');
    errEl.textContent = 'Please enter a valid email address.';
    return false;
  }

  if (id === 'phone' && !/^[\d\s+\-()]{7,}$/.test(value)) {
    el.classList.add('error');
    errEl.textContent = 'Please enter a valid phone number.';
    return false;
  }

  if (id === 'date') {
    const today = new Date(); today.setHours(0,0,0,0);
    const chosen = new Date(value);
    if (chosen < today) {
      el.classList.add('error');
      errEl.textContent = 'Please select a future date.';
      return false;
    }
  }

  el.classList.remove('error');
  errEl.textContent = '';
  return true;
}

['name','phone','email','service','date'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errEl = document.getElementById(id + '-error');
      if (errEl) errEl.textContent = '';
    });
  }
});

function submitBooking() {
  const validations = [
    validateField('name',    'name-error',    'Please enter your full name.'),
    validateField('phone',   'phone-error',   'Please enter your phone number.'),
    validateField('email',   'email-error',   'Please enter your email.'),
    validateField('service', 'service-error', 'Please select a service.'),
    validateField('date',    'date-error',    'Please select an event date.'),
  ];

  const allValid = validations.every(Boolean);
  if (!allValid) return;

  const btn      = document.getElementById('submit-btn');
  const btnText  = document.getElementById('btn-text');
  const btnLoader = document.getElementById('btn-loader');

  btn.disabled = true;
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  setTimeout(() => {
    document.getElementById('booking-form-container').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');
  }, 1600);
}

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
function updateActiveNav() {
  const sections = ['home','services','gallery','about','booking','contact'];
  const scrollY = window.scrollY + 120;

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + id) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

/* ---- SERVICE CARD REVEAL ---- */
function addRevealToCards() {
  document.querySelectorAll('.service-card, .contact-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 40) + 'ms';
  });
}

/* ---- SET MIN DATE FOR BOOKING ---- */
function setMinDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm   = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd   = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
}

/* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- HERO PARALLAX (subtle) ---- */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
});

/* ---- GALLERY IMAGE HOVER ZOOM ---- */
document.addEventListener('mouseover', (e) => {
  const img = e.target.closest('.gallery-placeholder')?.querySelector('img');
  if (img) img.style.transform = 'scale(1.08)';
});
document.addEventListener('mouseout', (e) => {
  const img = e.target.closest('.gallery-placeholder')?.querySelector('img');
  if (img) img.style.transform = 'scale(1)';
});

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  addRevealToCards();
  observeReveal();
  setMinDate();
});
