/* ============================================================
   ANNIVERSARY WEBSITE — script.js
   Arun & Nilima Sharma — Silver Jubilee 2025
   Marriage Date: 18 May 2001
============================================================ */

'use strict';

/* ============================================================
   HOW TO ADD / REMOVE PHOTOS
   — Add images to the /images/ folder (any filename)
   — Register them in SLIDESHOW_IMAGES below
   — Captions are optional Hindi/English text per photo
   — All galleries (cinematic, polaroid, auto, stack) use this array
============================================================ */
const SLIDESHOW_IMAGES = [
  { src: 'images/1.JPG.jpeg', caption: 'अरुण एवं नीलिमा — एक अनमोल बंधन' },
  { src: 'images/2.JPG.jpeg', caption: 'प्यार की पहचान, विश्वास की राह' },
  { src: 'images/3.JPG.jpeg', caption: 'साथ की हर राह खूबसूरत है' },
  { src: 'images/4.JPG.jpeg', caption: 'शर्मा परिवार — प्रेम की नींव' },
  { src: 'images/5.JPG.jpeg', caption: 'पच्चीस वर्षों की अमर कहानी' },
  { src: 'images/6.JPG.jpeg', caption: 'यादों का सिलसिला कभी न रुके' },
  { src: 'images/7.JPG.jpeg', caption: 'साथ-साथ हर पल और भी खास' },
  { src: 'images/8.JPG.jpeg', caption: 'मुस्कानें, यादें और आशीष' },
  { src: 'images/9.JPG.jpeg', caption: 'जीवन की खूबसूरत यात्रा' },
  { src: 'images/10.JPG.jpeg', caption: 'हर दिन, हर पल — नया सवेरा' },
];

/* ============================================================
   HOW TO ADD VIDEOS
   — Create a /videos/ folder in the project root
   — Add vertical .mp4 video files (Instagram reel ratio 9:16)
   — Register them in VIDEOS array below
   — They autoplay muted and loop on the page
============================================================ */
const VIDEOS = [
  // { src: 'videos/reel1.mp4', label: 'यादों के पल' },
  // { src: 'videos/reel2.mp4', label: 'खुशियों के रंग' },
  // { src: 'videos/reel3.mp4', label: 'साथ की राह' },
  // Uncomment and add your video paths above
];

/* ============================================================
   HINDI KAVITA & SHAYARI — Original Content
   Add/remove shayaris from this array freely
============================================================ */
const SHAYARIS = [
  {
    text: 'तुम मेरी सुबह हो,\nतुम मेरी शाम हो।\nइस जीवन की हर खुशी में\nतुम्हारा नाम है।',
    author: '— अरुण एवं नीलिमा की प्रेम कहानी'
  },
  {
    text: 'पच्चीस साल की इस राह में\nकदम-कदम साथ चले।\nरिश्तों की इस बगिया में\nप्रेम के फूल खिले।',
    author: '— रजत जयंती, 2025'
  },
  {
    text: 'तेरी मुस्कान में दुनिया है मेरी,\nतेरे साथ में ज़िंदगी है मेरी।\nहर मुश्किल आसान लगती है\nजब तू हो साथ मेरी।',
    author: '— शर्मा परिवार'
  },
  {
    text: 'समय की रेत पर लिखी\nयह प्रेम कहानी अमर है।\nनीलिमा और अरुण का यह बंधन\nजीवन से भी गहरा है।',
    author: '— Silver Jubilee 2025'
  },
  {
    text: 'घर वह नहीं जहाँ छत हो,\nघर वह है जहाँ तुम हो।\nपच्चीस बरस बाद भी\nतुम्हारे साथ सुकून हो।',
    author: '— अरुण शर्मा एवं नीलिमा शर्मा'
  },
  {
    text: 'रिश्तों में वफ़ा होती है\nतो उम्र नहीं मायने रखती।\nपच्चीस साल की साझेदारी\nहर लम्हे को खास बना देती है।',
    author: '— रजत जयंती स्मृति'
  },
];

/* ============================================================
   MARRIAGE DATE FOR COUNTDOWN / DISPLAY
   18 May 2001 — 18 May 2026 = 25 Years
============================================================ */
const MARRIAGE_DATE = new Date('2001-05-18');
const JUBILEE_DATE  = new Date('2026-05-18');

/* ============================================================
   BOOT — loading screen
============================================================ */
window.addEventListener('load', function () {
  document.body.classList.add('ready');
  const loader = document.getElementById('loading-screen');
  setTimeout(function () {
    loader.classList.add('hidden');
    initRevealObserver();
    startCinematicSlideshow();
    initShayariCarousel();
    initReels();
    initParallax();
    updateTimelineDates();
  }, 2500);
});

/* ============================================================
   UPDATE TIMELINE WITH CORRECT DATES
   Marriage: 18 May 2001  |  Jubilee: 18 May 2026
============================================================ */
function updateTimelineDates() {
  // Update the first timeline year to 2001 and the last to 2026
  const years = document.querySelectorAll('.t-year');
  if (years.length > 0) years[0].textContent = '2001';
  if (years.length > 0) years[years.length - 1].textContent = '2026';

  // Update Together Since badge
  const badge = document.querySelector('#portrait-section .section-badge');
  if (badge) badge.textContent = 'Together Since 18 May 2001';

  // Update footer subtitle
  const footerSub = document.querySelector('.footer-subtitle');
  if (footerSub) footerSub.innerHTML = 'Silver Jubilee &nbsp;&bull;&nbsp; 18 May 2001 &mdash; 18 May 2026 &nbsp;&bull;&nbsp; Sharma Family';

  // Update portrait stats days count (18 May 2001 to 18 May 2026 = exactly 9131 days)
  const days = document.querySelectorAll('.stat-num');
  if (days.length >= 2) days[1].textContent = '9131';

  // Update hero subtitle
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroSub) heroSub.innerHTML = '18 May 2001 &nbsp;&bull;&nbsp; 25 Years of Togetherness &nbsp;&bull;&nbsp; 18 May 2026';
}

/* ============================================================
   PARTICLES
============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.45 + 0.08),
      alpha: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 220 + 100,
    };
  }

  function init() {
    resize();
    for (let i = 0; i < 80; i++) { const p = createParticle(); p.life = Math.random() * p.maxLife; particles.push(p); }
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function (p, i) {
      p.life++; p.x += p.vx; p.y += p.vy;
      const progress = p.life / p.maxLife;
      const fade = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() < 0.04
        ? `rgba(201,168,76,${p.alpha * fade * 1.6})`
        : `rgba(245,230,184,${p.alpha * fade * 0.55})`;
      ctx.fill();
      if (p.life >= p.maxLife) particles[i] = createParticle();
    });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
})();

/* ============================================================
   MUSIC — plays on first user interaction (click anywhere)
   Path: images/music.mp3
============================================================ */
(function initMusic() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  const iconOn  = btn.querySelector('.music-icon.on');
  const iconOff = btn.querySelector('.music-icon.off');
  let playing = false;

  audio.volume = 0;

  /* Attempt to play; returns a promise */
  function tryPlay() {
    return audio.play().then(function () {
      playing = true;
      btn.classList.add('playing');
      iconOn.style.display  = '';
      iconOff.style.display = 'none';
      fadeIn();
    }).catch(function () {
      /* Browser blocked — will retry on next interaction */
    });
  }

  function fadeIn() {
    clearInterval(audio._fadeTimer);
    audio._fadeTimer = setInterval(function () {
      audio.volume = Math.min(parseFloat((audio.volume + 0.025).toFixed(3)), 0.65);
      if (audio.volume >= 0.65) clearInterval(audio._fadeTimer);
    }, 80);
  }

  function fadeOut(cb) {
    clearInterval(audio._fadeTimer);
    audio._fadeTimer = setInterval(function () {
      audio.volume = Math.max(parseFloat((audio.volume - 0.04).toFixed(3)), 0);
      if (audio.volume <= 0) { clearInterval(audio._fadeTimer); if (cb) cb(); }
    }, 60);
  }

  /* First interaction anywhere on page starts music */
  let started = false;
  function onFirstInteract() {
    if (started) return;
    started = true;
    tryPlay();
    document.removeEventListener('click',      onFirstInteract);
    document.removeEventListener('touchstart', onFirstInteract);
    document.removeEventListener('scroll',     onFirstInteract);
    document.removeEventListener('keydown',    onFirstInteract);
  }

  /* Listen for ANY user gesture */
  document.addEventListener('click',      onFirstInteract, { once: true });
  document.addEventListener('touchstart', onFirstInteract, { once: true, passive: true });
  document.addEventListener('scroll',     onFirstInteract, { once: true, passive: true });
  document.addEventListener('keydown',    onFirstInteract, { once: true });

  /* Toggle button */
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); /* Don't double-fire onFirstInteract */
    if (!started) { started = true; tryPlay(); return; }
    if (playing) {
      fadeOut(function () { audio.pause(); playing = false; btn.classList.remove('playing'); iconOn.style.display = 'none'; iconOff.style.display = ''; });
    } else {
      audio.play().then(function () { playing = true; btn.classList.add('playing'); iconOn.style.display = ''; iconOff.style.display = 'none'; fadeIn(); }).catch(function(){});
    }
  });
})();

/* ============================================================
   SCROLL REVEAL OBSERVER
============================================================ */
function initRevealObserver() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(function (t) { obs.observe(t); });
}

/* ============================================================
   CINEMATIC SLIDESHOW
============================================================ */
function startCinematicSlideshow() {
  const track  = document.getElementById('cin-track');
  const dotsEl = document.getElementById('cin-dots');
  const capEl  = document.getElementById('cin-caption');
  let current  = 0, timer;

  SLIDESHOW_IMAGES.forEach(function (img, i) {
    const slide   = document.createElement('div');
    slide.className = 'cin-slide' + (i === 0 ? ' active' : '');
    const bg      = document.createElement('div');
    bg.className  = 'cin-slide-img';
    bg.style.backgroundImage = 'url(' + img.src + ')';
    const ov      = document.createElement('div');
    ov.className  = 'cin-slide-overlay';
    slide.appendChild(bg); slide.appendChild(ov);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'cin-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(dot);
  });

  showCaption(0);

  function goTo(n) {
    const slides = track.querySelectorAll('.cin-slide');
    const dots   = dotsEl.querySelectorAll('.cin-dot');
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    showCaption(current);
    resetTimer();
  }

  function showCaption(idx) {
    const old = capEl.querySelector('.cin-caption-text');
    if (old) { old.classList.remove('visible'); setTimeout(function () { old.remove(); }, 500); }
    setTimeout(function () {
      const span = document.createElement('div');
      span.className = 'cin-caption-text';
      span.textContent = SLIDESHOW_IMAGES[idx].caption;
      capEl.appendChild(span);
      requestAnimationFrame(function () { requestAnimationFrame(function () { span.classList.add('visible'); }); });
    }, 300);
  }

  function resetTimer() { clearInterval(timer); timer = setInterval(function () { goTo(current + 1); }, 5800); }

  document.querySelector('.cin-prev').addEventListener('click', function () { goTo(current - 1); });
  document.querySelector('.cin-next').addEventListener('click', function () { goTo(current + 1); });

  /* Touch swipe */
  let tx = 0;
  track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   function (e) { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d) > 50) goTo(d > 0 ? current + 1 : current - 1); });

  resetTimer();
}

/* ============================================================
   SHAYARI CAROUSEL
============================================================ */
function initShayariCarousel() {
  const textEl   = document.getElementById('shayari-text');
  const authorEl = document.getElementById('shayari-author');
  const dotsEl   = document.getElementById('shayari-dots');
  if (!textEl) return;
  let current = 0, timer;

  /* Build dots */
  SHAYARIS.forEach(function (_, i) {
    const d = document.createElement('button');
    d.className = 'shayari-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(d);
  });

  function render(idx, direction) {
    textEl.classList.add('fade-out');
    authorEl.style.opacity = '0';
    setTimeout(function () {
      /* Replace newlines with <br> */
      textEl.innerHTML = SHAYARIS[idx].text.replace(/\n/g, '<br/>');
      authorEl.textContent = SHAYARIS[idx].author;
      textEl.classList.remove('fade-out');
      textEl.classList.add('fade-in');
      authorEl.style.opacity = '1';
      setTimeout(function () { textEl.classList.remove('fade-in'); }, 600);
    }, 400);

    dotsEl.querySelectorAll('.shayari-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(n) {
    current = (n + SHAYARIS.length) % SHAYARIS.length;
    render(current);
    resetTimer();
  }

  function resetTimer() { clearInterval(timer); timer = setInterval(function () { goTo(current + 1); }, 6500); }

  render(0);
  resetTimer();

  /* Shayari section particles */
  initShayariParticles();
}

function initShayariParticles() {
  const container = document.getElementById('shayari-particles');
  if (!container) return;
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = `
      position:absolute;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(201,168,76,${Math.random()*0.4+0.1});
      animation:shayariFloat ${Math.random()*10+8}s ${Math.random()*6}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
    container.appendChild(p);
  }
  const s = document.createElement('style');
  s.textContent = '@keyframes shayariFloat { 0%{transform:translateY(0) scale(1);opacity:.3;} 100%{transform:translateY(-30px) scale(1.4);opacity:.8;} }';
  document.head.appendChild(s);
}

/* ============================================================
   VIDEO REELS
============================================================ */
function initReels() {
  const track = document.getElementById('reels-track');
  if (!track) return;

  if (VIDEOS.length === 0) {
    track.innerHTML = `
      <div class="reel-no-videos">
        <span>Coming Soon</span>
        उत्सव के बाद वीडियो यहाँ उपलब्ध होंगे।<br/>
        Add your .mp4 files to the <code>/videos/</code> folder<br/>
        and register them in the VIDEOS array in script.js.
      </div>`;
    return;
  }

  VIDEOS.forEach(function (v) {
    const card = document.createElement('div');
    card.className = 'reel-card';

    const video = document.createElement('video');
    video.src  = v.src;
    video.muted     = true;
    video.loop      = true;
    video.playsInline = true;
    video.preload   = 'none';
    video.setAttribute('loading', 'lazy');

    const overlay = document.createElement('div');
    overlay.className = 'reel-overlay';

    const label = document.createElement('div');
    label.className = 'reel-label';
    label.textContent = v.label || '';

    const playHint = document.createElement('div');
    playHint.className = 'reel-play-hint';
    playHint.innerHTML = '<svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><path d="M0 0l14 8L0 16z"/></svg>';

    card.appendChild(video);
    card.appendChild(overlay);
    card.appendChild(label);
    card.appendChild(playHint);
    track.appendChild(card);
  });

  /* Intersection observer to autoplay visible reels */
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      const v = e.target.querySelector('video');
      if (!v) return;
      if (e.isIntersecting) { v.play().catch(function(){}); }
      else { v.pause(); }
    });
  }, { threshold: 0.5 });

  track.querySelectorAll('.reel-card').forEach(function (c) { obs.observe(c); });

  /* Drag scroll */
  enableDragScroll(track);
}

/* ============================================================
   POLAROID GALLERY
============================================================ */
(function initPolaroid() {
  const track = document.getElementById('polaroid-track');
  if (!track) return;
  const rotations = [-3, 2, -2, 3, -1.5, 2.5];
  const captions  = ['साथ मिलकर', 'प्यार की यादें', 'हमारे पल', 'खुशियों के रंग', 'अनमोल क्षण'];

  SLIDESHOW_IMAGES.forEach(function (img, i) {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.setProperty('--rot', (rotations[i % rotations.length]) + 'deg');

    const wrap  = document.createElement('div'); wrap.className = 'polaroid-img-wrap';
    const image = document.createElement('img');
    image.src     = img.src;
    image.alt     = captions[i % captions.length];
    image.loading = 'lazy';

    const label = document.createElement('div');
    label.className  = 'polaroid-label';
    label.textContent = captions[i % captions.length];

    wrap.appendChild(image);
    card.appendChild(wrap);
    card.appendChild(label);
    track.appendChild(card);

    card.addEventListener('click', function () { openLightbox(img.src); });
  });

  enableDragScroll(track);
})();

/* ============================================================
   AUTO GALLERY (infinite loop)
============================================================ */
(function initAutoGallery() {
  const container = document.getElementById('auto-gallery');
  if (!container) return;
  const all = [...SLIDESHOW_IMAGES, ...SLIDESHOW_IMAGES];
  all.forEach(function (img, i) {
    const item  = document.createElement('div'); item.className = 'auto-gallery-item';
    const image = document.createElement('img');
    image.src = img.src; image.alt = 'Memory'; image.loading = 'lazy';
    item.appendChild(image);
    container.appendChild(item);
  });
})();

/* ============================================================
   GALLERY STACK + LIGHTBOX
============================================================ */
(function initStackGallery() {
  const grid   = document.getElementById('stack-grid');
  if (!grid) return;
  const labels = ['नई शुरुआत', 'यादों का सफर', 'प्यार की राह', 'एक साथ', 'हमारी कहानी'];

  SLIDESHOW_IMAGES.forEach(function (img, i) {
    const item    = document.createElement('div'); item.className = 'stack-item reveal-up';
    const image   = document.createElement('img');
    image.src     = img.src; image.alt = labels[i] || 'Memory'; image.loading = 'lazy';
    const overlay = document.createElement('div'); overlay.className = 'stack-item-overlay';
    const label   = document.createElement('span'); label.className = 'stack-item-label'; label.textContent = labels[i] || '';
    overlay.appendChild(label); item.appendChild(image); item.appendChild(overlay);
    grid.appendChild(item);
    item.addEventListener('click', function () { openLightbox(img.src); });
  });

  setTimeout(function () {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.stack-item').forEach(function (el) { obs.observe(el); });
  }, 100);
})();

/* ============================================================
   LIGHTBOX
============================================================ */
const lbEl  = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  lbImg.src = src;
  lbEl.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lbEl.classList.remove('open');
  document.body.style.overflow = '';
}

if (lbEl) {
  lbEl.addEventListener('click', function (e) { if (e.target === lbEl) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

/* ============================================================
   VISITOR COUNTER
============================================================ */
(function initVisitorCounter() {
  const countEl = document.getElementById('visitor-count');
  if (!countEl) return;
  const KEY = 'sharma_anniversary_visits_2026';
  let count = parseInt(localStorage.getItem(KEY) || '1247', 10);
  count++;
  localStorage.setItem(KEY, count);

  let display = count - 1;
  const start = Date.now();
  const dur   = 2000;
  const obs   = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    (function tick() {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      countEl.textContent = Math.round((count - display) * e + display).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    })();
  }, { threshold: 0.5 });
  obs.observe(countEl);
})();

/* ============================================================
   TIMELINE STAGGER
============================================================ */
document.querySelectorAll('.timeline-item').forEach(function (item, i) {
  item.style.transitionDelay = (i * 0.1) + 's';
});

/* ============================================================
   PARALLAX — hero bg
============================================================ */
function initParallax() {
  const heroBg = document.getElementById('hero-bg-img');
  if (!heroBg) return;
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    requestAnimationFrame(function () {
      const scrollY = window.scrollY;
      const h = window.innerHeight;
      if (scrollY < h * 1.2) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.18) + 'px) scale(1.1)';
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ============================================================
   CURSOR GLOW (desktop only)
============================================================ */
(function initCursorGlow() {
  if (window.innerWidth < 768) return;
  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;pointer-events:none;z-index:9997;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,0.055) 0%,transparent 70%);transform:translate(-50%,-50%);transition:opacity .3s;left:-999px;top:-999px;';
  document.body.appendChild(glow);
  let mx = -999, my = -999, cx = -999, cy = -999;
  window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  (function follow() { cx += (mx - cx) * 0.07; cy += (my - cy) * 0.07; glow.style.left = cx + 'px'; glow.style.top = cy + 'px'; requestAnimationFrame(follow); })();
})();

/* ============================================================
   FOOTER PARTICLES
============================================================ */
(function initFooterParticles() {
  const container = document.getElementById('footer-particles');
  if (!container) return;
  container.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;';
  for (let i = 0; i < 22; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `position:absolute;bottom:-10px;left:${Math.random()*100}%;width:${size}px;height:${size}px;border-radius:50%;background:rgba(201,168,76,${Math.random()*.5+.15});animation:footerFloat ${Math.random()*8+6}s ${Math.random()*6}s ease-in-out infinite;`;
    container.appendChild(p);
  }
  const s = document.createElement('style');
  s.textContent = '@keyframes footerFloat{0%{transform:translateY(0) scale(1);opacity:0;}20%{opacity:1;}80%{opacity:.4;}100%{transform:translateY(-130px) scale(.4);opacity:0;}}';
  document.head.appendChild(s);
})();

/* ============================================================
   DRAG SCROLL HELPER
============================================================ */
function enableDragScroll(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown',  function (e) { isDown = true; el.style.cursor = 'grabbing'; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', function ()  { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup',    function ()  { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove',  function (e) { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.4; });
}

/* ============================================================
   NEWSPAPER PDF
   Place newspaper.pdf in the project root folder.
   The download button in index.html handles the rest.
============================================================ */

/* ============================================================
   GOOGLE DRIVE
   Replace YOUR_GOOGLE_DRIVE_LINK_HERE in index.html
   with your actual shared Google Drive folder URL.
   Example: https://drive.google.com/drive/folders/XXXXXXXXX?usp=sharing
============================================================ */

/* ============================================================
   ROYAL COUNTDOWN — ticking since 18 May 2001
   Updates every second, live on the page
============================================================ */
(function initCountdown() {
  // Marriage date: 18 May 2001, midnight
  const START = new Date('2001-05-18T00:00:00');

  const elYears  = document.getElementById('cd-years');
  const elMonths = document.getElementById('cd-months');
  const elDays   = document.getElementById('cd-days');
  const elHours  = document.getElementById('cd-hours');
  const elMins   = document.getElementById('cd-mins');
  const elSecs   = document.getElementById('cd-secs');
  const elTotal  = document.getElementById('cd-total-days-num');
  if (!elYears) return;

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  // Animate a number change with a brief flash
  function flash(el, newVal) {
    if (el.textContent === newVal) return;
    el.style.transition = 'opacity 0.15s';
    el.style.opacity = '0.3';
    setTimeout(function () {
      el.textContent = newVal;
      el.style.opacity = '1';
    }, 150);
  }

  function tick() {
    const now   = new Date();
    const diff  = now - START; // ms

    const totalSeconds = Math.floor(diff / 1000);
    const totalDays    = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Years / months / remaining days
    const years  = now.getFullYear() - START.getFullYear();
    let   months = now.getMonth()    - START.getMonth();
    let   days   = now.getDate()     - START.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { months += 12; }

    const hours = now.getHours();
    const mins  = now.getMinutes();
    const secs  = now.getSeconds();

    flash(elYears,  pad(years));
    flash(elMonths, pad(months));
    flash(elDays,   pad(days));
    flash(elHours,  pad(hours));
    flash(elMins,   pad(mins));
    flash(elSecs,   pad(secs));

    // Total days with animated count-up on first load
    if (elTotal.textContent !== totalDays.toLocaleString('en-IN')) {
      elTotal.textContent = totalDays.toLocaleString('en-IN');
    }
  }

  tick();
  setInterval(tick, 1000);
})();
