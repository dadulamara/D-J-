// =============================================
// Countdown Timer — Wedding: May 23, 2026 2:00 PM
// =============================================
(function () {
  const weddingDate = new Date('2026-05-23T14:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// =============================================
// Scroll-reveal for sections
// =============================================
(function () {
  const targets = document.querySelectorAll(
    '.sponsor-block, .role-card, .detail-card, .countdown__unit, .closing__inner'
  );

  targets.forEach(el => el.classList.add('reveal'));

  if (!window.IntersectionObserver) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
})();

// =============================================
// Slide dots — sync with scroll on mobile/tablet
// =============================================
(function () {
  const dots = document.querySelectorAll('.slide-dot');
  const main = document.querySelector('main');

  if (!dots.length || !main) return;

  // Click dot → scroll to section
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.slide);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Scroll → update active dot
  const sections = ['hero', 'countdown', 'entourage', 'details'];
  function updateDots() {
    const scrollTop = main.scrollTop;
    const viewH = main.clientHeight;
    let active = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollTop + viewH * 0.5) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  main.addEventListener('scroll', updateDots, { passive: true });
  updateDots();
})();

// =============================================
// Nav links — scroll inside main on mobile
// =============================================
(function () {
  const navLinks = document.querySelectorAll('.site-nav ul a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      const main = document.querySelector('main');
      if (target && main && window.innerWidth <= 768) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
