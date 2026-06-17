document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('.section, .hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        const id = section.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // --- Navbar background on scroll ---
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // --- Smooth reveal on scroll ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.timeline-item, .project-card, .skill-category, .edu-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // --- Scroll indicator hide on scroll ---
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      scrollIndicator.style.opacity = window.scrollY > 300 ? '0' : '0.5';
      scrollIndicator.style.pointerEvents = window.scrollY > 300 ? 'none' : 'auto';
    });
  }

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
  });
});
