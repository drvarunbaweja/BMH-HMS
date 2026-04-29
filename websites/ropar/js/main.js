/**
 * ============================================================
 * BAWEJA HOSPITAL — ROPAR
 * main.js — Premium Vanilla JS
 * bawejahospital.com
 * ============================================================
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/**
 * Shorthand querySelector
 * @param {string} selector
 * @param {Element} [context=document]
 */
const $ = (selector, context = document) => context.querySelector(selector);

/**
 * Shorthand querySelectorAll (returns real array)
 * @param {string} selector
 * @param {Element} [context=document]
 */
const $$ = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector));

/**
 * Throttle: limits how often fn is called (leading edge)
 */
const throttle = (fn, limit = 100) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

/**
 * Debounce: delays fn until after wait ms of inactivity
 */
const debounce = (fn, wait = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

/**
 * Detect touch / mobile device
 */
const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches ||
  ('ontouchstart' in window) ||
  navigator.maxTouchPoints > 0;

/* ============================================================
   01. CUSTOM CURSOR
   ============================================================ */
const initCursor = () => {
  // Skip on touch devices
  if (isTouchDevice()) return;

  const dot  = $('.cursor-dot');
  const ring = $('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let rafId;

  // Smooth ring follow via rAF
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(animateRing);
  };

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Hover detection on interactive elements
  const hoverTargets = 'a, button, .service-card, .doctor-card, .blog-card, .carousel-arrow, .dot, .t-arrow, .faq-question, input, textarea, select, [role="button"]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.add('hovering');
      dot.style.transform += ' scale(0.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      ring.classList.remove('hovering');
    }
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.6';
  });

  animateRing();
};

/* ============================================================
   02. NAVIGATION
   ============================================================ */
const initNavigation = () => {
  const header      = $('.site-header');
  const hamburger   = $('.hamburger');
  const mobileMenu  = $('.mobile-nav-menu');
  const mobileOverlay = $('.mobile-nav-overlay');
  const topBar      = $('.top-bar');

  if (!header) return;

  // ── Scroll behaviour ───────────────────────────────────────
  const onScroll = throttle(() => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 50);

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile menu ────────────────────────────────────────────
  const openMobileMenu = () => {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.classList.add('mobile-open');
    hamburger?.setAttribute('aria-expanded', 'true');
  };

  const closeMobileMenu = () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.classList.remove('mobile-open');
    hamburger?.setAttribute('aria-expanded', 'false');
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  // Close on overlay click
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Close when a real mobile nav destination is clicked. Dropdown toggles stay open.
  $$('.mobile-nav-link, .mobile-nav-sub a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.matches('button, [data-has-dropdown], [aria-controls]')) return;
      closeMobileMenu();
    });
  });

  $$('.nav-item-dropdown').forEach(item => {
    const toggle = $('.nav-dropdown-toggle', item);
    const menu = $('.nav-dropdown', item);
    if (!toggle || !menu) return;

    const closeDropdown = () => {
      item.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    item.addEventListener('mouseleave', closeDropdown);
    menu.addEventListener('click', closeDropdown);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ── Active link highlight ──────────────────────────────────
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  $$('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.replace(/\/$/, '');
    if (
      linkPath &&
      (currentPath === linkPath || currentPath.startsWith(linkPath + '/'))
    ) {
      link.classList.add('active');
    }
    // Home edge case
    if (linkPath === '' || linkPath === '/' || linkPath === 'index.html') {
      if (currentPath === '/' || currentPath === '' || currentPath.endsWith('index.html')) {
        link.classList.add('active');
      }
    }
  });

  // ── Smooth scroll for anchor links ────────────────────────
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    closeMobileMenu();

    const headerH = header.offsetHeight + (topBar?.offsetHeight || 0);
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  });

  // ── Offset body for sticky header + top bar ───────────────
  const setHeaderOffset = () => {
    const totalH = header.offsetHeight + (topBar?.offsetHeight || 0);
    // For pages with page-hero, no offset needed (hero has padding-top)
    if (!$('.page-hero') && !$('.hero-section')) {
      document.body.style.paddingTop = totalH + 'px';
    }
  };

  setHeaderOffset();
  window.addEventListener('resize', debounce(setHeaderOffset, 150));
};

/* ============================================================
   03. HERO CAROUSEL
   ============================================================ */
const initHeroCarousel = () => {
  const carousel = $('.hero-carousel');
  if (!carousel) return;

  const slides    = $$('.hero-slide', carousel);
  const dotsWrap  = $('.carousel-dots');
  const prevBtn   = $('.carousel-arrow[data-dir="prev"]');
  const nextBtn   = $('.carousel-arrow[data-dir="next"]');

  if (!slides.length) return;

  let current   = 0;
  let autoTimer = null;
  let isPaused  = false;
  const INTERVAL = 5000;

  // Build dots dynamically if container exists
  let dots = [];
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = i === 0 ? 'dot active' : 'dot';
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });
    dots = $$('.dot', dotsWrap);
  }

  // Animate slide content in
  const animateSlideIn = (slide) => {
    const animatables = $$('.hero-badge, .hero-title, .hero-subtitle, .hero-cta-group', slide);
    animatables.forEach(el => {
      el.classList.remove('animate-in');
      // Force reflow to restart transition
      void el.offsetWidth;
    });
    // Small delay then add class (CSS handles transitions)
    requestAnimationFrame(() => {
      animatables.forEach(el => el.classList.add('animate-in'));
    });
  };

  const goTo = (index) => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // Update ARIA
    slides[current].setAttribute('aria-hidden', 'false');
    slides.filter((_, i) => i !== current).forEach(s => s.setAttribute('aria-hidden', 'true'));

    animateSlideIn(slides[current]);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Auto-advance
  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => {
      if (!isPaused) next();
    }, INTERVAL);
  };

  const stopAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  };

  // Arrow buttons
  nextBtn?.addEventListener('click', () => { next(); startAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); startAuto(); });

  // Pause on hover
  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX   = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
      startAuto();
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!$('.hero-section')) return;
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
  });

  // Init first slide
  goTo(0);
  startAuto();
};

/* ============================================================
   04. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const initScrollReveal = () => {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything
    $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
};

/* ============================================================
   05. COUNTER ANIMATION
   ============================================================ */
const initCounters = () => {
  if (!('IntersectionObserver' in window)) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3); // cubic ease-out

  const animateCounter = (el) => {
    const target   = parseFloat(el.dataset.target) || 0;
    const duration = 2000; // ms
    const isFloat  = target % 1 !== 0;
    const decimals = isFloat ? 1 : 0;
    let startTime  = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);
      const value    = eased * target;

      el.textContent = value.toFixed(decimals);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  $$('.stat-number[data-target]').forEach(el => observer.observe(el));
};

/* ============================================================
   06. TESTIMONIALS CAROUSEL
   ============================================================ */
const initTestimonialsCarousel = () => {
  const track   = $('.testimonials-track');
  if (!track) return;

  const wrapper = track.closest('.testimonials-track-wrapper');
  const cards   = $$('.testimonial-card', track);
  if (!cards.length) return;

  const navContainer = $('.testimonials-nav');
  let current    = 0;
  let autoTimer  = null;
  const INTERVAL = 4000;

  // Determine cards per view based on viewport
  const getPerView = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  let perView = getPerView();
  let maxIndex = Math.max(0, cards.length - perView);

  // Build dots
  const buildDots = () => {
    if (!navContainer) return;
    const existingDots = $$('.t-dot', navContainer);
    existingDots.forEach(d => d.remove());

    const total = maxIndex + 1;
    // Insert dots before arrows
    const firstArrow = $('.t-arrow', navContainer);

    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = i === 0 ? 't-dot active' : 't-dot';
      d.setAttribute('aria-label', `Go to testimonial group ${i + 1}`);
      d.addEventListener('click', () => { goTo(i); startAuto(); });
      if (firstArrow) {
        navContainer.insertBefore(d, firstArrow);
      } else {
        navContainer.appendChild(d);
      }
    }
  };

  const updateDots = () => {
    $$('.t-dot', navContainer || document).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  };

  const goTo = (index) => {
    current = Math.max(0, Math.min(index, maxIndex));

    // Card width including gap (gap is 24px from CSS)
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    updateDots();
  };

  const next = () => goTo(current + 1 > maxIndex ? 0 : current + 1);
  const prev = () => goTo(current - 1 < 0 ? maxIndex : current - 1);

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(next, INTERVAL);
  };

  const stopAuto = () => {
    if (autoTimer) clearInterval(autoTimer);
  };

  // Arrow buttons
  const prevArrow = $('.t-arrow[data-dir="prev"]', navContainer || document);
  const nextArrow = $('.t-arrow[data-dir="next"]', navContainer || document);

  prevArrow?.addEventListener('click', () => { prev(); startAuto(); });
  nextArrow?.addEventListener('click', () => { next(); startAuto(); });

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  wrapper?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  wrapper?.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
      startAuto();
    }
  }, { passive: true });

  // Recalculate on resize
  window.addEventListener('resize', debounce(() => {
    perView  = getPerView();
    maxIndex = Math.max(0, cards.length - perView);
    current  = Math.min(current, maxIndex);
    buildDots();
    goTo(current);
  }, 250));

  buildDots();
  goTo(0);
  startAuto();
};

/* ============================================================
   07. FAQ ACCORDION
   ============================================================ */
const initFAQ = () => {
  const faqItems = $$('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
};

/* ============================================================
   08. APPOINTMENT MODAL
   ============================================================ */
const initModal = () => {
  const overlay = $('.modal-overlay');
  if (!overlay) return;

  const modal      = overlay.querySelector('.appt-modal');
  const closeBtn   = overlay.querySelector('.modal-close');
  const form       = overlay.querySelector('form');
  const successDiv = overlay.querySelector('.modal-success');

  const openModal = () => {
    overlay.classList.add('open');
    document.body.classList.add('mobile-open');
    // Focus first input
    requestAnimationFrame(() => {
      const firstInput = modal?.querySelector('input, select, textarea');
      firstInput?.focus();
    });
  };

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.classList.remove('mobile-open');
  };

  // Open triggers
  $$('.open-modal, [data-modal="appointment"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close triggers
  closeBtn?.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // Form submission
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    // Simulate async submission
    setTimeout(() => {
      form.style.display = 'none';
      if (successDiv) {
        successDiv.classList.add('show');
      }

      // Auto close after 4 seconds
      setTimeout(() => {
        closeModal();
        // Reset form after close animation
        setTimeout(() => {
          form.style.display = '';
          form.reset();
          if (successDiv) successDiv.classList.remove('show');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Book Appointment';
          }
        }, 400);
      }, 4000);
    }, 1200);
  });
};

/* ============================================================
   09. WHATSAPP FLOAT
   ============================================================ */
const initWhatsApp = () => {
  const floatEl = $('.whatsapp-float');
  if (!floatEl) return;

  // Delayed pulse effect
  setTimeout(() => {
    floatEl.classList.add('pulsing');
  }, 3000);

  // Show tooltip after 5s then hide (hint to user)
  setTimeout(() => {
    const tooltip = floatEl.querySelector('.wa-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(0)';
      setTimeout(() => {
        tooltip.style.opacity = '';
        tooltip.style.transform = '';
      }, 3000);
    }
  }, 5000);
};

/* ============================================================
   10. STICKY HEADER OFFSET FOR SERVICE/BLOG PAGES
   ============================================================ */
const initPageHeroOffset = () => {
  const pageHero = $('.page-hero, .post-hero');
  const header   = $('.site-header');
  const topBar   = $('.top-bar');
  if (!pageHero || !header) return;

  const setOffset = () => {
    const totalH = header.offsetHeight + (topBar?.offsetHeight || 0);
    pageHero.style.paddingTop = (totalH + 40) + 'px';
  };

  setOffset();
  window.addEventListener('resize', debounce(setOffset, 150));
};

/* ============================================================
   11. BLOG POST READING PROGRESS BAR
   ============================================================ */
const initReadingProgress = () => {
  const postBody = $('.post-body');
  if (!postBody) return;

  // Create progress bar
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.prepend(bar);

  const updateProgress = throttle(() => {
    const docTop    = document.documentElement.scrollTop;
    const docH      = document.documentElement.scrollHeight;
    const winH      = window.innerHeight;
    const postTop   = postBody.offsetTop;
    const postH     = postBody.offsetHeight;

    // Progress based on scroll through the post body
    const start    = postTop;
    const end      = postTop + postH - winH;
    const progress = Math.max(0, Math.min(1, (docTop - start) / (end - start)));

    bar.style.width = (progress * 100) + '%';
  }, 16);

  window.addEventListener('scroll', updateProgress, { passive: true });
};

/* ============================================================
   12. SERVICE CARD 3D TILT
   ============================================================ */
const initCardTilt = () => {
  // Only on non-touch devices
  if (isTouchDevice()) return;

  const cards = $$('.service-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;

      // Max tilt ±6 degrees
      const rotateY =  ((x - cx) / cx) * 6;
      const rotateX = -((y - cy) / cy) * 4;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      card.style.transition = 'box-shadow 0.35s ease, border-color 0.35s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
    });
  });
};

/* ============================================================
   13. DOCTOR CARD TILT (lighter version)
   ============================================================ */
const initDoctorCardTilt = () => {
  if (isTouchDevice()) return;

  $$('.doctor-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;

      const rotateY =  ((x - cx) / cx) * 4;
      const rotateX = -((y - cy) / cy) * 3;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ============================================================
   14. HERO SECTION PARALLAX
   ============================================================ */
const initHeroParallax = () => {
  if (isTouchDevice()) return;

  const hero   = $('.hero-section');
  const shapes = $$('.hero-shape', hero || document);
  if (!hero || !shapes.length) return;

  const onScroll = throttle(() => {
    const scrolled = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = 0.08 + i * 0.04;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, 16);

  window.addEventListener('scroll', onScroll, { passive: true });
};

/* ============================================================
   15. LAZY LOADING IMAGES
   ============================================================ */
const initLazyImages = () => {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    },
    { rootMargin: '200px 0px' }
  );

  $$('img[data-src]').forEach(img => observer.observe(img));
};

/* ============================================================
   16. SMOOTH SECTION TRANSITIONS
   ============================================================ */
const initSectionAnimations = () => {
  // Stagger children of grids when they come into view
  if (!('IntersectionObserver' in window)) return;

  const grids = $$('.services-grid, .doctors-grid, .blog-grid');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = Array.from(entry.target.children);
          children.forEach((child, i) => {
            setTimeout(() => {
              child.style.opacity    = '1';
              child.style.transform  = 'none';
            }, i * 80);
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach(child => {
      // Only if not already a .reveal element
      if (!child.classList.contains('reveal') &&
          !child.classList.contains('reveal-left') &&
          !child.classList.contains('reveal-scale')) {
        child.style.opacity   = '0';
        child.style.transform = 'translateY(24px)';
        child.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      }
    });
    observer.observe(grid);
  });
};

/* ============================================================
   17. TRUST BAR — SLOW MARQUEE ON MOBILE
   ============================================================ */
const initTrustBar = () => {
  // Just ensure trust items are visible; no marquee overhead on desktop
  const bar = $('.trust-bar');
  if (!bar) return;

  // Add subtle entrance stagger
  const items = $$('.trust-logo-item', bar);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.05}s`;
  });
};

/* ============================================================
   18. FORM VALIDATION HELPERS (Modal + Contact)
   ============================================================ */
const initForms = () => {
  $$('form').forEach(form => {
    const inputs = $$('input[required], select[required], textarea[required]', form);

    inputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateInput(input);
      });
    });

    const validateInput = (input) => {
      const val  = input.value.trim();
      const type = input.type;
      let valid  = val.length > 0;

      if (type === 'email' && val) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      if (type === 'tel' && val) {
        valid = /^[6-9]\d{9}$/.test(val.replace(/\D/g, ''));
      }

      input.classList.toggle('error', !valid);
      input.classList.toggle('valid', valid);

      // Show/hide inline error
      let errEl = input.parentElement.querySelector('.field-error');
      if (!valid && !errEl) {
        errEl = document.createElement('span');
        errEl.className = 'field-error';
        errEl.style.cssText = 'display:block;font-size:0.75rem;color:#dc2626;margin-top:4px;font-family:Inter,sans-serif;';
        input.parentElement.appendChild(errEl);
      }
      if (errEl) {
        errEl.textContent = valid ? '' : (
          type === 'email' ? 'Please enter a valid email address.' :
          type === 'tel'   ? 'Please enter a valid 10-digit mobile number.' :
          'This field is required.'
        );
        errEl.style.display = valid ? 'none' : 'block';
      }

      return valid;
    };
  });
};

/* ============================================================
   19. PHONE NUMBER FORMATTER
   ============================================================ */
const initPhoneInputs = () => {
  $$('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 10) val = val.slice(0, 10);
      e.target.value = val;
    });
  });
};

/* ============================================================
   20. COPY PHONE NUMBER ON CLICK (Top Bar)
   ============================================================ */
const initCopyPhone = () => {
  $$('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const num = link.href.replace('tel:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(num).catch(() => {});
      }
    });
  });
};

/* ============================================================
   21. BACK TO TOP BUTTON
   ============================================================ */
const initBackToTop = () => {
  // Create button
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
  btn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 32px;
    width: 46px;
    height: 46px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 800;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
  `;

  document.body.appendChild(btn);

  const toggle = throttle(() => {
    if (window.scrollY > 400) {
      btn.style.opacity   = '1';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity   = '0';
      btn.style.transform = 'translateY(10px)';
    }
  }, 100);

  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ============================================================
   22. ACTIVE NAV SECTION HIGHLIGHT (scroll spy)
   ============================================================ */
const initScrollSpy = () => {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => observer.observe(sec));
};

/* ============================================================
   23. VIDEO MODAL (for YouTube embeds, if used)
   ============================================================ */
const initVideoModal = () => {
  $$('[data-video]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = trigger.dataset.video;
      if (!videoId) return;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.85);
        z-index:2000;display:flex;align-items:center;justify-content:center;
        cursor:pointer;
      `;
      overlay.innerHTML = `
        <div style="width:min(900px,90vw);aspect-ratio:16/9;position:relative;">
          <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            frameborder="0" allowfullscreen
            allow="autoplay; encrypted-media"
            style="width:100%;height:100%;border-radius:12px;">
          </iframe>
          <button style="position:absolute;top:-44px;right:0;background:rgba(255,255,255,0.15);
            border:none;color:white;padding:8px 16px;border-radius:8px;cursor:pointer;
            font-family:Inter,sans-serif;font-size:0.85rem;">
            ✕ Close
          </button>
        </div>`;

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay || ev.target.tagName === 'BUTTON') {
          overlay.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });
};

/* ============================================================
   24. MOBILE NAV DROPDOWN TOGGLE
   ============================================================ */
const initMobileDropdowns = () => {
  $$('.mobile-nav-link[data-has-dropdown]').forEach(link => {
    const sub = link.nextElementSibling;
    if (!sub) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = sub.style.maxHeight && sub.style.maxHeight !== '0px';
      link.setAttribute('aria-expanded', String(!isOpen));
      sub.style.maxHeight   = isOpen ? '0px' : sub.scrollHeight + 'px';
      sub.style.overflow    = 'hidden';
      sub.style.transition  = 'max-height 0.35s ease';

      const chevron = link.querySelector('.mobile-chevron');
      if (chevron) chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
};

/* ============================================================
   25. ANNOUNCEMENT BANNER DISMISS
   ============================================================ */
const initAnnouncementBanner = () => {
  const banner = $('.announcement-banner');
  const dismiss = $('.announcement-dismiss');
  if (!banner || !dismiss) return;

  const dismissed = sessionStorage.getItem('bh-ropar-banner-dismissed');
  if (dismissed) {
    banner.style.display = 'none';
    return;
  }

  dismiss.addEventListener('click', () => {
    banner.style.height   = banner.offsetHeight + 'px';
    banner.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      banner.style.transition = 'height 0.3s ease, opacity 0.3s ease';
      banner.style.height     = '0';
      banner.style.opacity    = '0';
    });
    setTimeout(() => { banner.style.display = 'none'; }, 350);
    sessionStorage.setItem('bh-ropar-banner-dismissed', '1');
  });
};

/* ============================================================
   INIT — DOM READY
   ============================================================ */
const init = () => {
  initCursor();
  initNavigation();
  initHeroCarousel();
  initScrollReveal();
  initCounters();
  initTestimonialsCarousel();
  initFAQ();
  initModal();
  initWhatsApp();
  initPageHeroOffset();
  initReadingProgress();
  initCardTilt();
  initDoctorCardTilt();
  initHeroParallax();
  initLazyImages();
  initSectionAnimations();
  initTrustBar();
  initForms();
  initPhoneInputs();
  initCopyPhone();
  initBackToTop();
  initScrollSpy();
  initVideoModal();
  initMobileDropdowns();
  initAnnouncementBanner();
};

// Run after DOM is parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ============================================================
   EXPORT (for module usage if needed)
   ============================================================ */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCursor,
    initNavigation,
    initHeroCarousel,
    initScrollReveal,
    initCounters,
    initTestimonialsCarousel,
    initFAQ,
    initModal,
  };
}
