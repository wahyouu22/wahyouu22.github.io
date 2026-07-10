/* ============================================================
   main.js — Portfolio Adjie Wahyudi | Premium Interactions
============================================================ */

/* ── 1. NAVBAR: scroll effect + active link ── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

/* ── 2. MOBILE MENU ── */
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileClose  = document.getElementById('mobile-close');
const mobileLinks  = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

function openMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
if (mobileClose)  mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(a => a.addEventListener('click', closeMenu));

/* ── 3. REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    // Animate skill bars inside this element
    entry.target.querySelectorAll('.sk-bar').forEach(bar => {
      setTimeout(() => { bar.style.width = bar.getAttribute('data-w'); }, 200);
    });
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));

/* ── 4. SKILL BARS: also trigger when tabs switch ── */
function animateBars(container) {
  if (!container) return;
  container.querySelectorAll('.sk-bar').forEach(bar => {
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = bar.getAttribute('data-w'); }, 200);
  });
}

/* ── 5. SKILLS TABS ── */
const stabs  = document.querySelectorAll('.stab');
const panels = document.querySelectorAll('.skills-panel');

stabs.forEach(tab => {
  tab.addEventListener('click', () => {
    stabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.getAttribute('data-tab'));
    if (target) {
      target.classList.add('active');
      // reveal cards inside panel
      target.querySelectorAll('.sk-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        setTimeout(() => {
          card.style.transition = 'opacity .5s ease, transform .5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      });
      animateBars(target);
    }
  });
});

/* Initial bar animation for default active tab */
const defaultPanel = document.querySelector('.skills-panel.active');
if (defaultPanel) {
  const panelObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateBars(defaultPanel); panelObs.disconnect(); }
    });
  }, { threshold: 0.2 });
  panelObs.observe(defaultPanel);
}

/* ── 6. PROFILE CARD: 3D tilt ── */
const profileCard = document.getElementById('profile-card');
if (profileCard) {
  profileCard.addEventListener('mousemove', (e) => {
    const r   = profileCard.getBoundingClientRect();
    const x   = e.clientX - r.left - r.width / 2;
    const y   = e.clientY - r.top  - r.height / 2;
    const rx  = -y / 22;
    const ry  =  x / 22;
    profileCard.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    profileCard.style.transition = 'none';
  });
  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = '';
    profileCard.style.transition = 'transform .5s ease';
  });
}

/* ── 7. TYPEWRITER in profile card ── */
const roles     = ['Sistem Informasi @ BSI', 'Programmer & Developer', 'Data Analyst', 'Office Support Pro'];
let rIdx = 0, cIdx = 0, isDeleting = false;
const roleEl = document.getElementById('prole-text');

function typeRole() {
  if (!roleEl) return;
  const cur = roles[rIdx];
  roleEl.textContent = isDeleting
    ? cur.substring(0, cIdx - 1)
    : cur.substring(0, cIdx + 1);
  isDeleting ? cIdx-- : cIdx++;
  if (!isDeleting && cIdx === cur.length) {
    setTimeout(() => { isDeleting = true; typeRole(); }, 2200);
    return;
  }
  if (isDeleting && cIdx === 0) {
    isDeleting = false;
    rIdx = (rIdx + 1) % roles.length;
  }
  setTimeout(typeRole, isDeleting ? 40 : 72);
}
window.addEventListener('load', () => setTimeout(typeRole, 900));

/* ── 8. CONTACT FORM (demo) ── */
const cfForm  = document.getElementById('contact-form');
const cfToast = document.getElementById('cf-toast');
const cfBtn   = document.getElementById('cf-submit');

if (cfForm) {
  cfForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const name  = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg   = document.getElementById('cf-msg').value.trim();
    if (!name || !email || !msg) return;

    // Simulate sending
    cfBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    cfBtn.disabled = true;
    setTimeout(() => {
      cfBtn.innerHTML = '<i class="fa-solid fa-check"></i> Terkirim!';
      cfToast.classList.add('show-ok');
      cfForm.reset();
      setTimeout(() => {
        cfBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
        cfBtn.disabled = false;
        cfToast.classList.remove('show-ok');
      }, 4000);
    }, 1600);
  });
}

/* ── 9. SMOOTH scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── 10. MICRO-ANIMATIONS: stagger cards on first load ── */
window.addEventListener('load', () => {
  // Hero badge entrance is handled by CSS animation
  // Trigger active nav on load
  updateActiveNav();

  // Add parallax subtlety to bg orbs
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 8;
      orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
    });
  }, { passive: true });
});

/* ── 11. COUNTER animation for stats ── */
function animateCount(el, target, isFloat) {
  const dur = 1800;
  const start = performance.now();
  const from = 0;
  const to = parseFloat(target);
  function step(now) {
    const progress = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = from + (to - from) * ease;
    el.textContent = isFloat ? current.toFixed(2) : Math.floor(current) + (progress < 1 ? '' : el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.pstat-n').forEach(el => {
      const txt = el.textContent.trim();
      if (txt === '3.56') animateCount(el, 3.56, true);
      else if (!isNaN(parseInt(txt))) {
        const num = parseInt(txt);
        const suf = txt.replace(String(num), '');
        el.dataset.suffix = suf;
        animateCount(el, num, false);
      }
    });
    statsObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const profileCardEl = document.getElementById('profile-card');
if (profileCardEl) statsObserver.observe(profileCardEl);