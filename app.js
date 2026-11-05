/* =============================================
   DAMOL CONCEPT — MAIN APPLICATION JS
   ============================================= */
'use strict';

const CFG = window.SITE_CONFIG;

/* ---- AURORA CANVAS ---- */
(function initAurora() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;
  let animationFrame = 0;
  const smallViewport = window.matchMedia('(max-width: 768px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  const blobs = [
    { x: 0.3, y: 0.4, r: 0.45, color: [18,41,79] },
    { x: 0.7, y: 0.6, r: 0.4,  color: [232,163,23] },
    { x: 0.5, y: 0.3, r: 0.35, color: [11,50,90] },
    { x: 0.2, y: 0.7, r: 0.3,  color: [47,111,94] }
  ];
  function draw() {
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#0B1B3A';
    ctx.fillRect(0,0,W,H);
    blobs.forEach((b,i) => {
      const ox = Math.sin(t * 0.4 + i * 1.3) * 0.12;
      const oy = Math.cos(t * 0.3 + i * 0.9) * 0.1;
      const cx = (b.x + ox) * W;
      const cy = (b.y + oy) * H;
      const grad = ctx.createRadialGradient(cx,cy,0,cx,cy,b.r * Math.max(W,H));
      const [r,g,bl] = b.color;
      grad.addColorStop(0, `rgba(${r},${g},${bl},0.35)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,W,H);
    });
    t += 0.008;
    animationFrame = requestAnimationFrame(draw);
  }
  function updateMotion() {
    cancelAnimationFrame(animationFrame);
    resize();
    if (!smallViewport.matches && !reducedMotion.matches) draw();
  }
  window.addEventListener('resize', resize);
  smallViewport.addEventListener('change', updateMotion);
  reducedMotion.addEventListener('change', updateMotion);
  if (!smallViewport.matches && !reducedMotion.matches) draw();
})();

/* ---- NAVBAR ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
});
function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}
mobileClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(l => l.addEventListener('click', closeMenu));

function highlightNav() {
  const scrollY = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop, h = sec.offsetHeight, id = sec.id;
    if (scrollY >= top && scrollY < top + h) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

/* ---- TYPEWRITER ---- */
const typeWords = ['Project Writing','SPSS Analysis','Proofreading','Defense Prep','Questionnaire Design','Thesis Support'];
let twI = 0, twCharI = 0, twDeleting = false;
const twEl = document.getElementById('typewriter');
const typewriterMobile = window.matchMedia('(max-width: 768px)');
let typewriterTimer = 0;
function typeWrite() {
  if (!twEl) return;
  if (typewriterMobile.matches) {
    twEl.textContent = 'Research Support';
    return;
  }
  const word = typeWords[twI];
  if (twDeleting) {
    twEl.textContent = word.slice(0, --twCharI);
    if (twCharI === 0) { twDeleting = false; twI = (twI + 1) % typeWords.length; }
    typewriterTimer = setTimeout(typeWrite, 60);
  } else {
    twEl.textContent = word.slice(0, ++twCharI);
    if (twCharI === word.length) { twDeleting = true; typewriterTimer = setTimeout(typeWrite, 1800); }
    else typewriterTimer = setTimeout(typeWrite, 90);
  }
}
typewriterMobile.addEventListener('change', () => {
  clearTimeout(typewriterTimer);
  twI = 0;
  twCharI = 0;
  twDeleting = false;
  typeWrite();
});
if (typewriterMobile.matches) {
  typeWrite();
} else {
  typewriterTimer = setTimeout(typeWrite, 1000);
}

/* ---- UNIVERSITY LIBRARY CAROUSEL ---- */
(function initLibraryCarousel() {
  const showcase = document.getElementById('library-showcase');
  const track = document.getElementById('library-track');
  const dots = document.getElementById('library-dots');
  const credit = document.getElementById('library-credit');
  const previous = document.getElementById('library-prev');
  const next = document.getElementById('library-next');
  if (!showcase || !track || !dots || !credit) return;

  const libraries = CFG.universityLibraries || [];
  if (!libraries.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallViewport = window.matchMedia('(max-width: 768px)');
  libraries.forEach((library, index) => {
    const slide = document.createElement('article');
    slide.className = 'library-slide' + (index === 0 ? ' is-active' : '');
    slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Library view ${index + 1} of ${libraries.length}`);
    slide.innerHTML = `
      <img class="library-photo" src="${library.image}" alt="Library bookshelves and reading space" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} />
      <div class="library-photo-shade"></div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'library-dot' + (index === 0 ? ' is-active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show library view ${index + 1}`);
    dot.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => showSlide(index));
    dots.appendChild(dot);
  });

  let current = 0;
  let timer = 0;
  let paused = false;

  function setCredit(library) {
    credit.textContent = `Library shelf ${libraries.indexOf(library) + 1} of ${libraries.length}`;
  }

  function scheduleNext() {
    window.clearTimeout(timer);
    if (!reducedMotion && !smallViewport.matches && !paused && !document.hidden) {
      timer = window.setTimeout(() => {
        showSlide((current + 1) % libraries.length, false);
      }, 5200);
    }
  }

  function showSlide(index, resetTimer = true) {
    const nextIndex = (index + libraries.length) % libraries.length;
    if (nextIndex !== current) {
      const slides = track.querySelectorAll('.library-slide');
      const dotsList = dots.querySelectorAll('.library-dot');
      const outgoing = slides[current];
      outgoing.classList.remove('is-active');
      outgoing.classList.add('is-exiting');
      outgoing.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => outgoing.classList.remove('is-exiting'), 700);
      slides[nextIndex].classList.remove('is-exiting');
      slides[nextIndex].classList.add('is-active');
      slides[nextIndex].setAttribute('aria-hidden', 'false');
      dotsList[current].classList.remove('is-active');
      dotsList[current].setAttribute('aria-pressed', 'false');
      dotsList[nextIndex].classList.add('is-active');
      dotsList[nextIndex].setAttribute('aria-pressed', 'true');
      current = nextIndex;
    }

    setCredit(libraries[current]);
    if (resetTimer) scheduleNext();
  }

  previous?.addEventListener('click', () => showSlide(current - 1));
  next?.addEventListener('click', () => showSlide(current + 1));
  showcase.addEventListener('mouseenter', () => { paused = true; window.clearTimeout(timer); });
  showcase.addEventListener('mouseleave', () => { paused = false; scheduleNext(); });
  showcase.addEventListener('focusin', () => { paused = true; window.clearTimeout(timer); });
  showcase.addEventListener('focusout', event => {
    if (!showcase.contains(event.relatedTarget)) {
      paused = false;
      scheduleNext();
    }
  });
  showcase.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showSlide(current - 1);
    if (event.key === 'ArrowRight') showSlide(current + 1);
  });

  let touchStartX = 0;
  showcase.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  showcase.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) showSlide(current + (delta < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener('visibilitychange', scheduleNext);
  smallViewport.addEventListener('change', scheduleNext);

  showSlide(0);
})();

/* ---- COUNTERS ---- */
function initCounters() {
  document.querySelectorAll('.counter-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}
initCounters();

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ---- BUILD SERVICES ---- */
(function buildServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  CFG.services.forEach(s => {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.setAttribute('data-reveal','');
    card.innerHTML = `
      <div class="service-icon">${s.icon}</div>
      <h3 class="service-name">${s.name}</h3>
      <div class="service-desc">${s.desc}</div>
      <button class="service-learn-more" type="button" aria-label="Learn more about ${s.name}">
        <span class="service-info-icon" aria-hidden="true">i</span> Learn more
      </button>
      <a href="#order" class="service-start" onclick="preselectService('${s.id}')">Start Order →</a>
    `;
    card.querySelector('.service-learn-more').addEventListener('click', () => openServiceModal(s.id));
    grid.appendChild(card);
    revealObserver.observe(card);
  });
})();

let serviceReturnFocus = null;
window.openServiceModal = function(id) {
  const service = CFG.services.find(item => item.id === id);
  if (!service) return;
  const modal = document.getElementById('service-modal');
  const title = document.getElementById('service-modal-title');
  const body = document.getElementById('service-modal-body');
  title.textContent = service.name;
  body.replaceChildren();

  const description = document.createElement('p');
  description.className = 'service-modal-description';
  description.textContent = service.details;
  body.appendChild(description);

  const listTitle = document.createElement('h3');
  listTitle.className = 'service-modal-subtitle';
  listTitle.textContent = 'How we can support you';
  body.appendChild(listTitle);

  const list = document.createElement('ul');
  list.className = 'service-modal-list';
  service.includes.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
  body.appendChild(list);

  const note = document.createElement('p');
  note.className = 'service-modal-note';
  note.textContent = 'Our support is collaborative: you remain the author of your work, make the research decisions, and present your own findings.';
  body.appendChild(note);

  serviceReturnFocus = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('service-modal-close').focus();
};
window.closeServiceModal = function() {
  document.getElementById('service-modal').classList.remove('open');
  document.body.style.overflow = '';
  if (serviceReturnFocus) serviceReturnFocus.focus();
};
document.getElementById('service-modal').addEventListener('click', function(event) {
  if (event.target === this) window.closeServiceModal();
});

window.preselectService = function(id) {
  setTimeout(() => {
    const sel = document.getElementById('service');
    if (sel) { sel.value = id; updatePriceEstimator(); }
  }, 300);
};

/* ---- BUILD SAMPLES ---- */
(function buildSamples() {
  const grid = document.getElementById('samples-grid');
  if (!grid) return;
  CFG.samples.forEach((s, i) => {
    const card = document.createElement('button');
    card.className = 'sample-card';
    card.type = 'button';
    card.setAttribute('aria-label', `Preview ${s.title}`);
    card.setAttribute('data-reveal','');
    card.innerHTML = `
      <span class="sample-tag">${s.tag}</span>
      <h3 class="sample-title">${s.title}</h3>
      <div class="sample-meta">
        <span>📚 ${s.dept}</span>
        <span>🎓 ${s.level}</span>
        <span>📄 ${s.pages === 'Outline' ? 'Sample outline' : `${s.pages} pages`}</span>
      </div>
      <span class="sample-preview">Preview Abstract, Introduction &amp; Contents →</span>
    `;
    card.addEventListener('click', () => openSampleModal(i));
    grid.appendChild(card);
    revealObserver.observe(card);
  });
})();

window.openSampleModal = function(idx) {
  const s = CFG.samples[idx];
  const modal = document.getElementById('sample-modal');
  const body  = document.getElementById('modal-body');
  const tocHTML = s.toc.map(t =>
    `<tr class="toc-item${t.chapter?' chapter':''}"><th scope="row">${t.title}</th><td>${t.page}</td></tr>`
  ).join('');
  body.innerHTML = `
    <span class="modal-tag">${s.tag}</span>
    <h2 class="modal-title" id="sample-modal-title">${s.title}</h2>
    <p class="modal-section-title">Abstract</p>
    <p class="abstract-text">${s.abstract}</p>
    <p class="modal-section-title">Introduction</p>
    <p class="abstract-text">${s.introduction}</p>
    <p class="modal-section-title">Sample Table of Contents</p>
    <div class="toc-table-wrap">
      <table class="toc-table">
        <thead><tr><th scope="col">Section</th><th scope="col">Page</th></tr></thead>
        <tbody>${tocHTML}</tbody>
      </table>
    </div>
    <div class="private-notice">Illustrative structure only. This sample is not a student's submission and contains no real research findings. Your project should reflect your own approved research, data, and department guidelines.</div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeSampleModal = function() {
  document.getElementById('sample-modal').classList.remove('open');
  document.body.style.overflow = '';
};
document.getElementById('sample-modal').addEventListener('click', function(e) {
  if (e.target === this) window.closeSampleModal();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (document.getElementById('service-modal').classList.contains('open')) window.closeServiceModal();
  else if (document.getElementById('sample-modal').classList.contains('open')) window.closeSampleModal();
  else if (document.getElementById('lightbox').classList.contains('open')) window.closeLightbox();
});

/* ---- BUILD PROOF ---- */
let lightboxIdx = 0;
(function buildProof() {
  const row = document.getElementById('proof-row');
  if (!row) return;
  CFG.proofCards.forEach((p, i) => {
    const card = document.createElement('button');
    card.className = 'proof-card';
    card.type = 'button';
    card.setAttribute('aria-label', `View ${p.title}`);
    card.innerHTML = `
      <div class="proof-img-wrap">
        <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"  />
        <div class="proof-placeholder" style="display:none">
          <p>Preview unavailable</p>
        </div>
      </div>
      <div class="proof-info">
        <div class="proof-title">${p.title}</div>
        <div class="proof-caption">${p.caption}</div>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(i));
    row.appendChild(card);
  });
})();

window.openLightbox = function(idx) {
  lightboxIdx = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  const p = CFG.proofCards[idx];
  img.src = p.img; img.alt = p.title;
  cap.textContent = p.title + ' — ' + p.caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
};
window.lightboxNav = function(dir) {
  lightboxIdx = (lightboxIdx + dir + CFG.proofCards.length) % CFG.proofCards.length;
  openLightbox(lightboxIdx);
};
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) window.closeLightbox();
});

/* ---- BUILD TESTIMONIALS ---- */
(function buildTestimonials() {
  const track = document.getElementById('testi-track');
  const dots  = document.getElementById('testi-dots');
  if (!track) return;
  CFG.testimonials.forEach((t, i) => {
    const initials = t.name.split(' ').map(n=>n[0]).join('');
    const card = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML = `
      <div class="testi-kicker">Student feedback</div>
      <p class="testi-text">“${t.text}”</p>
      <div class="testi-author">
        <div class="testi-avatar">${initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-meta">${t.uni}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testi-dot' + (i===0?' active':'');
    dot.setAttribute('aria-label', `Show review from ${t.name}`);
    dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });
  dots.setAttribute('role', 'group');
  dots.setAttribute('aria-label', 'Review navigation');
  let cur = 0;
  function goToSlide(idx) {
    cur = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll('.testi-dot').forEach((d,i) => {
      d.classList.toggle('active', i===idx);
      d.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
    });
  }
  window.goToSlide = goToSlide;
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => goToSlide((cur + 1) % CFG.testimonials.length), 5000);
  }
})();

/* ---- BUILD FAQ ---- */
(function buildFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  CFG.faqs.forEach(f => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <button class="faq-q" aria-expanded="false">
        ${f.q}
        <span class="faq-arrow">+</span>
      </button>
      <div class="faq-a"><p>${f.a}</p></div>
    `;
    item.querySelector('.faq-q').addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) { item.classList.add('open'); this.setAttribute('aria-expanded','true'); }
      else this.setAttribute('aria-expanded','false');
    });
    list.appendChild(item);
  });
})();

/* ---- PRICE ESTIMATOR ---- */
function fmtNGN(n) { return '₦ ' + Math.round(n).toLocaleString('en-NG'); }

window.updatePriceEstimator = function() {
  const service  = document.getElementById('service')?.value;
  const level    = document.getElementById('level')?.value || 'undergraduate';
  const deadline = document.getElementById('deadline')?.value;

  if (!service || !CFG.prices[service]) {
    ['est-base','est-urgency','est-total','est-deposit'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = id === 'est-urgency' ? '₦ 0' : '₦ —';
    });
    return;
  }

  const base = CFG.prices[service][level] || CFG.prices[service].undergraduate;
  let urgencyMult = 0;
  if (deadline) {
    const days = Math.ceil((new Date(deadline) - new Date()) / 86400000);
    if      (days <= 1)  urgencyMult = CFG.urgency.same_day;
    else if (days <= 3)  urgencyMult = CFG.urgency.three_days;
    else if (days <= 7)  urgencyMult = CFG.urgency.one_week;
  }

  const urgencyFee = base * urgencyMult;
  const total = base + urgencyFee;
  const deposit = total * CFG.depositPercent;

  document.getElementById('est-base').textContent    = fmtNGN(base);
  document.getElementById('est-urgency').textContent = fmtNGN(urgencyFee);
  document.getElementById('est-total').textContent   = fmtNGN(total);
  document.getElementById('est-deposit').textContent = fmtNGN(deposit);

  window._orderTotal = total;
  updatePayAmount();
};

window.updatePayAmount = function() {
  const total = window._orderTotal || 0;
  const full  = document.querySelector('input[name="payOption"]:checked')?.value === 'full';
  const amount = full ? total : total * CFG.depositPercent;
  const ps = document.getElementById('price-summary');
  if (ps && total) {
    ps.innerHTML = `
      <div class="price-row"><span>Service Total</span><span>${fmtNGN(total)}</span></div>
      <div class="price-row"><span>Paying Now</span><span>${full ? 'Full Amount' : '50% Deposit'}</span></div>
      <div class="price-row total-row"><span>Amount Due</span><span>${fmtNGN(amount)}</span></div>
    `;
  }
  window._amountDue = amount;
};

/* ---- MULTI-STEP FORM ---- */
const formData = {};

window.nextStep = function(toStep) {
  const from = document.querySelector('.form-step.active');
  const fromNum = +from?.id?.replace('step-','');

  if (fromNum < toStep) {
    const valid = validateStep(fromNum);
    if (!valid) return;
    collectStepData(fromNum);
    if (toStep === 3) buildOrderReview();
  }

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.querySelector(`#step-${toStep}`)?.classList.add('active');

  document.querySelectorAll('.p-step').forEach((ps, i) => {
    ps.classList.remove('active','done');
    if (i + 1 < toStep) ps.classList.add('done');
    else if (i + 1 === toStep) ps.classList.add('active');
  });
};

function validateStep(num) {
  let ok = true;
  const fields = document.querySelectorAll(`#step-${num} [required]`);
  fields.forEach(f => {
    const err = f.parentElement.querySelector('.field-error');
    f.classList.remove('error');
    if (err) err.textContent = '';
    if (!f.value.trim()) {
      f.classList.add('error');
      if (err) err.textContent = 'This field is required.';
      ok = false;
    } else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) {
      f.classList.add('error');
      if (err) err.textContent = 'Enter a valid email address.';
      ok = false;
    } else if (f.id === 'whatsapp' && !/^(\+?234|0)[789][01]\d{8}$/.test(f.value.replace(/\s/g,''))) {
      f.classList.add('error');
      if (err) err.textContent = 'Enter a valid Nigerian phone number.';
      ok = false;
    }
  });
  if (!ok) showToast('Please fill all required fields correctly.', 'error');
  return ok;
}

function collectStepData(step) {
  document.querySelectorAll(`#step-${step} input, #step-${step} select, #step-${step} textarea`).forEach(f => {
    if (f.name && f.name !== 'website') formData[f.name] = f.value;
  });
}

function buildOrderReview() {
  collectStepData(2);
  const serviceLabel = document.querySelector(`#service option[value="${formData.service}"]`)?.textContent || formData.service;
  const rev = document.getElementById('order-review');
  if (!rev) return;
  rev.innerHTML = `
    <div class="review-row"><span>Name</span><span>${formData.fullName||'—'}</span></div>
    <div class="review-row"><span>WhatsApp</span><span>${formData.whatsapp||'—'}</span></div>
    <div class="review-row"><span>Email</span><span>${formData.email||'—'}</span></div>
    <div class="review-row"><span>University</span><span>${formData.university||'—'}</span></div>
    <div class="review-row"><span>Level</span><span>${formData.level||'—'}</span></div>
    <div class="review-row"><span>Service</span><span>${serviceLabel}</span></div>
    <div class="review-row"><span>Topic</span><span style="max-width:220px;text-align:right">${formData.topic||'—'}</span></div>
    <div class="review-row"><span>Deadline</span><span>${formData.deadline||'—'}</span></div>
  `;
  updatePriceEstimator();
  updatePayAmount();
}

/* ---- PAYSTACK PAYMENT ---- */
window.initiatePayment = function() {
  if (!window._orderTotal) {
    showToast('Please select a service and deadline to see pricing.', 'error');
    nextStep(2); return;
  }

  // Honeypot check
  if (document.querySelector('input[name="website"]')?.value) {
    showToast('Request blocked.', 'error'); return;
  }

  collectStepData(2);
  const amount = Math.round((window._amountDue || window._orderTotal) * 100); // in kobo
  const email  = formData.email;
  const ref    = 'DC-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  if (typeof PaystackPop === 'undefined') {
    showToast('Paystack is loading. Please wait a moment and try again.', 'error');
    loadPaystack(() => initiatePayment());
    return;
  }

  const handler = PaystackPop.setup({
    key: CFG.paystackPublicKey,
    email: email,
    amount: amount,
    currency: 'NGN',
    ref: ref,
    metadata: {
      custom_fields: [
        { display_name: 'Name',    variable_name: 'name',    value: formData.fullName },
        { display_name: 'Service', variable_name: 'service', value: formData.service },
        { display_name: 'Topic',   variable_name: 'topic',   value: formData.topic },
        { display_name: 'WhatsApp',variable_name: 'whatsapp',value: formData.whatsapp }
      ]
    },
    channels: ['card','bank','bank_transfer','ussd'],
    callback: function(response) { onPaymentSuccess(response, ref); },
    onClose: function() { showToast('Payment cancelled. You can retry anytime.', 'error'); }
  });
  handler.openIframe();
};

function loadPaystack(cb) {
  if (document.getElementById('paystack-js')) return;
  const script = document.createElement('script');
  script.id = 'paystack-js';
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.onload = cb;
  document.head.appendChild(script);
}
loadPaystack(() => {});

function onPaymentSuccess(response, ref) {
  const orderCode = 'DC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
  document.getElementById('order-code').textContent = orderCode;

  const msg = encodeURIComponent(
    `Hello Damol Concept! 👋\n\nOrder Code: *${orderCode}*\nName: ${formData.fullName}\nService: ${formData.service}\nTopic: ${formData.topic}\nDeadline: ${formData.deadline}\nAmount Paid: ${fmtNGN(window._amountDue || window._orderTotal)}\nReference: ${ref}\n\nPlease confirm my order. Thank you!`
  );
  document.getElementById('wa-confirm-btn').href = `https://wa.me/2347071368610?text=${msg}`;

  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-success').classList.add('active');
  showToast('🎉 Payment successful! Your order code is ' + orderCode, 'success');
}

/* ---- ORDER TRACKING ---- */
const DEMO_ORDERS = {
  'DC-2026-0001': { status: 'In Progress', steps: ['Received','Paid','In Progress'] },
  'DC-2026-0002': { status: 'Delivered',   steps: ['Received','Paid','In Progress','Draft Ready','Delivered'] }
};
const ALL_STEPS = ['Received','Paid','In Progress','Draft Ready','Delivered'];
const STEP_DESC = {
  'Received':     'We have received your order and details.',
  'Paid':         'Payment confirmed. Work begins shortly.',
  'In Progress':  'Your project is actively being worked on.',
  'Draft Ready':  'A draft has been prepared for your review.',
  'Delivered':    'Your completed project has been delivered.'
};

window.trackOrder = function() {
  const code = document.getElementById('track-code')?.value.trim().toUpperCase();
  const wa   = document.getElementById('track-wa')?.value.trim();
  if (!code || !wa) { showToast('Please enter both your order code and WhatsApp number.', 'error'); return; }

  const result  = document.getElementById('track-result');
  const stepsEl = document.getElementById('track-steps');
  result.style.display = 'block';
  const order = DEMO_ORDERS[code];

  if (!order) {
    stepsEl.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">
      <p style="font-size:2rem">🔍</p>
      <p>No order found with code <strong>${code}</strong>. Please check and try again.</p>
      <p style="margin-top:8px;font-size:0.85rem">Need help? <a href="https://wa.me/2347071368610" style="color:var(--gold)">Chat on WhatsApp →</a></p>
    </div>`;
    return;
  }

  stepsEl.innerHTML = ALL_STEPS.map(step => {
    const done   = order.steps.includes(step) && order.steps.indexOf(step) < order.steps.length - 1;
    const active = order.steps[order.steps.length - 1] === step;
    const cls    = done ? 'done' : active ? 'active' : 'pending';
    const icon   = done ? '✓' : active ? '●' : '○';
    return `<div class="track-step">
      <div class="ts-dot ${cls}">${icon}</div>
      <div><div class="ts-label">${step}</div><div class="ts-desc">${STEP_DESC[step]}</div></div>
    </div>`;
  }).join('');
};

/* ---- FILE UPLOAD ---- */
(function initFileUpload() {
  const input = document.getElementById('file-upload');
  const selected = document.getElementById('file-selected');
  if (!input) return;
  input.addEventListener('change', () => {
    const f = input.files[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      showToast('File exceeds 10MB limit. Please choose a smaller file.', 'error');
      input.value = ''; return;
    }
    selected.style.display = 'block';
    selected.textContent = `📎 ${f.name} (${(f.size/1024/1024).toFixed(2)} MB)`;
  });
  const zone = document.getElementById('file-drop-zone');
  zone?.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--gold)'; });
  zone?.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone?.addEventListener('drop', e => {
    e.preventDefault(); zone.style.borderColor = '';
    const f = e.dataTransfer.files[0];
    if (f) { input.files = e.dataTransfer.files; input.dispatchEvent(new Event('change')); }
  });
})();

/* ---- SET MINIMUM DEADLINE DATE ---- */
(function setMinDate() {
  const dl = document.getElementById('deadline');
  if (!dl) return;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dl.min = tomorrow.toISOString().split('T')[0];
})();

/* ---- TOAST ---- */
window.showToast = function(msg, type='') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = '0.3s'; setTimeout(() => toast.remove(), 350); }, 4000);
};

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
