// ===== MOBILE NAVBAR TOGGLE =====
const menuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link-item').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 800 && navLinks) {
      navLinks.classList.remove('active');
    }
  });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const currentPage = window.location.pathname.split('/').pop() || 'home.html';
document.querySelectorAll('.nav-link-item').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ===== DARK MODE TOGGLE =====
const darkBtn = document.getElementById('darkModeBtn');
if (darkBtn) {
  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    darkBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
  }

  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('darkMode', 'enabled');
      darkBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
    }
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(msg, isError = false) {
  const toastDiv = document.getElementById('toastMessage');
  if (!toastDiv) return;
  toastDiv.textContent = msg;
  toastDiv.style.backgroundColor = isError ? '#c44536' : '#0f6b4a';
  toastDiv.style.opacity = '1';
  setTimeout(() => {
    toastDiv.style.opacity = '0';
  }, 2800);
}

// ===== CONTACT FORM VALIDATION (on contact page) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedbackDiv = document.getElementById('formFeedback');

    if (!name || !email || !message) {
      feedbackDiv.innerHTML = '<span class="error-msg">All fields are required!</span>';
      showToast('Please fill in all fields', true);
      return;
    }
    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailPattern.test(email)) {
      feedbackDiv.innerHTML = '<span class="error-msg">Enter a valid email address.</span>';
      showToast('Invalid email format', true);
      return;
    }
    feedbackDiv.innerHTML = '<span style="color:green;">✓ Message sent! We\'ll get back to you soon.</span>';
    showToast(`Thank you ${name}, we've received your message!`);
    contactForm.reset();
    setTimeout(() => {
      feedbackDiv.innerHTML = '';
    }, 3500);
  });
}

// ===== SCROLL ANIMATIONS =====
const animatedSections = document.querySelectorAll('section, .about-card, .leadership-grid, .events-grid, .contact-wrapper, .gallery-grid');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animatedSections.forEach(section => {
  if (section && !section.classList.contains('hero')) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(18px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
    observer.observe(section);
  }
});

// ===== GALLERY FILTERING (on gallery page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}