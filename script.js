// =============================================
// Countdown Timer — Wedding: May 23, 2026 2:00 PM
// =============================================
(function () {
  const weddingDate = new Date('2026-05-23T14:00:00');
  function pad(n) { return String(n).padStart(2, '0'); }
  function update() {
    const diff = weddingDate - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        document.getElementById(id).textContent = '00';
      });
      return;
    }
    document.getElementById('cd-days').textContent  = pad(Math.floor(diff / 86400000));
    document.getElementById('cd-hours').textContent = pad(Math.floor((diff % 86400000) / 3600000));
    document.getElementById('cd-mins').textContent  = pad(Math.floor((diff % 3600000) / 60000));
    document.getElementById('cd-secs').textContent  = pad(Math.floor((diff % 60000) / 1000));
  }
  update();
  setInterval(update, 1000);
})();

// =============================================
// Scroll-reveal (desktop)
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
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach(el => obs.observe(el));
})();

// =============================================
// Horizontal Swipe Slideshow — Mobile & Tablet
// =============================================
(function () {
  const BREAKPOINT = 768;

  const track    = document.getElementById('slide-track');
  const dots     = document.querySelectorAll('.slide-dot');
  const prevBtn  = document.getElementById('prev-btn');
  const nextBtn  = document.getElementById('next-btn');
  const navLinks = document.querySelectorAll('.site-nav ul a');

  if (!track) return;

  let current    = 0;
  const total    = dots.length; // 4 slides
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging  = false;

  function isMobile() { return window.innerWidth <= BREAKPOINT; }

  function goTo(index) {
    if (index < 0 || index >= total) return;
    current = index;
    if (isMobile()) {
      track.style.transform = `translateX(-${current * 100}vw)`;
    }
    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    // Update prev/next buttons
    if (prevBtn) prevBtn.classList.toggle('hidden', current === 0);
    if (nextBtn) nextBtn.classList.toggle('hidden', current === total - 1);
    // Update nav aria-current
    navLinks.forEach((link, i) => {
      link.toggleAttribute('aria-current', i === current);
    });
  }

  // Dot clicks
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Nav links
  navLinks.forEach((link, i) => {
    link.addEventListener('click', e => {
      if (isMobile()) {
        e.preventDefault();
        goTo(i);
      }
    });
  });

  // Touch swipe
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!isMobile()) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    // Only hijack horizontal swipes
    if (!isDragging && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging = true;
    }
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isMobile() || !isDragging) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
    isDragging = false;
  }, { passive: true });

  // Reset on resize
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      track.style.transform = '';
    } else {
      track.style.transform = `translateX(-${current * 100}vw)`;
    }
  });

  // Init
  goTo(0);
})();
