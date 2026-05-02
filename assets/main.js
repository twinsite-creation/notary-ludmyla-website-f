/* =============================================
   НОТАРІУС СЕМЕНЮК — main.js v2
   ============================================= */

(function () {
  'use strict';

  /* ---------- HEADER: scroll state ---------- */
  const header = document.getElementById('header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 48);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- BURGER MENU ---------- */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  function closeMobileNav() {
    burger.classList.remove('active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        /* Stagger siblings */
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const idx   = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 70, 320);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const offset = header.offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    const scrollY  = window.scrollY + header.offsetHeight + 72;
    let   current  = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('nav__link--active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();
