// ============ TYPING EFFECT ============
const roles = [
  "DevOps Engineer",
  "Cloud Architect",
  "Kubernetes Specialist",
  "Terraform Expert",
  "CI/CD Automation Engineer",
  "Infrastructure Expert"
];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");
const typingSpeed = 80;
const deletingSpeed = 40;
const delayBetweenRoles = 2000;

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(deleteRole, delayBetweenRoles);
  }
}

function deleteRole() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(deleteRole, deletingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 500);
  }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
  typeRole();
});

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      animateCounters();
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

function animateCounters() {
  counters.forEach((counter) => {
    const target = parseFloat(counter.dataset.target);
    const increment = target / 50;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = current.toFixed(1);
        setTimeout(updateCounter, 50);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// ============ SCROLL ANIMATIONS ============
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.skill-card, .project-card, .timeline-item, .cert-card, .about-card'
).forEach((el) => observer.observe(el));

// ============ PROJECT FILTER ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('show'), 10);
      } else {
        card.classList.remove('show');
        setTimeout(() => (card.style.display = 'none'), 300);
      }
    });
  });
});

// ============ SCROLL TO TOP BUTTON ============
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLink = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLink.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navLinks.classList.remove('active');
  }
});

// ============ CONTACT FORM VALIDATION & SUBMISSION ============
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function showError(input, message) {
  const errorElement = document.getElementById(input.id + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

function clearError(input) {
  const errorElement = document.getElementById(input.id + 'Error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Please enter a valid name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      // Show success message
      formSuccess.textContent = '✓ Message sent successfully! I will get back to you soon.';
      formSuccess.classList.add('show');

      // Reset form
      contactForm.reset();
      nameInput.focus();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.textContent = '';
        formSuccess.classList.remove('show');
      }, 5000);

      // Here you could send the form data to a server
      console.log({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      });
    }
  });

  // Real-time validation
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Please enter a valid name');
    } else {
      clearError(nameInput);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
    } else {
      clearError(emailInput);
    }
  });

  messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
    } else {
      clearError(messageInput);
    }
  });
}

// ============ SMOOTH SCROLL FOR NAVIGATION LINKS ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============ ADD ANIMATION DELAY TO CARDS ============
const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ============ NAVBAR ACTIVE STATE ON SCROLL ============
window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLink.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});