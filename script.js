// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target); // sirf ek dafa animate ho
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Number Counter for Results Stats =====
const statNumbers = document.querySelectorAll('.stats h3');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent.trim();
      const suffix = text.replace(/[0-9]/g, ''); // e.g. "%" nikal lega
      const target = parseInt(text.replace(/[^0-9]/g, ''));
      let current = 0;
      const increment = target / 60; // 60 steps mein count up

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(counter);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, 20);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
      } else {
        alert('Something went wrong. Please try again or email me directly.');
      }
    })
    .catch(() => {
      alert('Something went wrong. Please try again or email me directly.');
    });
  });
}
