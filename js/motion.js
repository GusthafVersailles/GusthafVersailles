/**
 * Gusthaf Versailles — Arquivo Vivo · Motion v6 (v39)
 *
 * Toda a coreografia por rolagem roda no relógio único do GV (js/engine.js):
 *  • a geometria é medida UMA vez (e sempre que algo muda de tamanho), nunca por quadro;
 *  • por quadro só há aritmética + escritas de transform/opacity/translate, que o navegador
 *    resolve no compositor, sem layout e sem repintar;
 *  • nenhuma custom property em contêineres (elas invalidam o estilo da subárvore inteira);
 *  • os reveals usam apenas opacity + transform (nada de clip-path) e têm escalonamento.
 */
(() => {
  'use strict';
  const d = document, win = window, body = d.body, root = d.documentElement, GV = win.GV;
  const reduce = win.matchMedia('(prefers-reduced-motion: reduce)');
  const touch = win.matchMedia('(pointer: coarse)');
  const narrow = win.matchMedia('(max-width: 700px)');
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const motionEnabled = !reduce.matches;

  root.classList.toggle('motion-reduced', !motionEnabled);
  body.classList.add('motion-js');
  if (!motionEnabled || !GV) { root.classList.remove('gv-pre'); return; }

  const header = d.querySelector('.site-header');
  const frame = d.getElementById('motion-gallery-frame');
  const stage = d.getElementById('motion-gallery');
  const track = d.getElementById('gallery-track');
  const fraction = d.getElementById('gallery-fraction');
  const meter = d.getElementById('gallery-meter-progress');
  const panels = [...d.querySelectorAll('.gallery-panel')];
  const panelFx = panels.map(p => ({
    media: p.querySelector('.gallery-media'),
    copy: p.querySelector('.gallery-copy-bottom'),
    ghost: p.querySelector('.gallery-initial'),
    key: null
  }));
  const hero = d.querySelector('.hero');
  const heroTitle = d.querySelector('.hero h1');
  const heroField = d.querySelector('.hero-mark-field');
  const outro = d.querySelector('.outro');
  const outroArt = d.querySelector('.outro-graphic');
  const aboutSection = d.getElementById('sobre');

  /* ───────── Abertura ─────────
     Só começa quando as fontes estão prontas (ou após 1,2 s): sem troca de fonte no meio da animação.
     O estado inicial escondido (html.gv-pre) é removido no MESMO quadro em que a animação começa,
     então não existe o "pisca" de conteúdo visível → oculto → animado. */
  const wait = ms => new Promise(r => setTimeout(r, ms));
  function fontsReady() {
    if (!d.fonts || !d.fonts.load) return Promise.resolve();
    const specs = ['400 64px Anton', '700 16px "Barlow Condensed"', '400 16px "DM Sans"'];
    return Promise.race([Promise.all(specs.map(s => d.fonts.load(s).catch(() => {}))), wait(1200)]);
  }
  function startIntro() {
    root.classList.remove('gv-pre');
    body.classList.add('motion-intro-running');
    setTimeout(() => body.classList.add('motion-intro-finished'), 2200);
  }
  fontsReady().then(() => requestAnimationFrame(() => requestAnimationFrame(startIntro)));

  /* ───────── Reveals ───────── */
  const REVEAL = '.section-masthead, .work-annotation, .work-pair-item, .method-intro, .method-steps details, ' +
    '.outro-meta, .outro-center > p, .outro-center > h2, ' +
    '.statement-top > span, .statement-body h2, .statement-aside, .statement-bottom';
  // O link de contato nunca fica escondido atrás de reveals aninhados: só o texto ao redor anima.
  function isAbout(el) { return aboutSection && aboutSection.contains(el); }
  // Em telas estreitas Hero/Sobre mudam de altura durante o carregamento de fontes/imagens:
  // só revelamos o Sobre depois de rolagem real do usuário.
  function canReveal(el) {
    if (!isAbout(el) || !narrow.matches) return true;
    const vh = win.innerHeight;
    return win.scrollY > 30 && aboutSection.getBoundingClientRect().top < vh * .78 && el.getBoundingClientRect().top < vh * .84;
  }
  let revealObserver = null, warmObserver = null, lastPoll = 0;
  const revealItems = new Set();

  function finishReveal(el) {
    el.classList.add('motion-done');
    el.classList.remove('motion-warm');
    el.style.transitionDelay = '';
  }
  function setVisible(el, delay, instant) {
    revealItems.delete(el);
    if (warmObserver) warmObserver.unobserve(el);
    el.classList.remove('motion-prime');
    if (instant) { el.classList.add('motion-prime', 'motion-in-view'); finishReveal(el); return; }
    if (delay) el.style.transitionDelay = delay + 'ms';
    el.classList.add('motion-in-view');
    let timer = 0;
    const done = ev => {
      if (ev && (ev.target !== el || ev.propertyName !== 'transform')) return;
      el.removeEventListener('transitionend', done);
      clearTimeout(timer);
      finishReveal(el);
    };
    el.addEventListener('transitionend', done);
    timer = setTimeout(done, (delay || 0) + 2000);
  }
  function revealBatch(els) {
    // Escalonamento: elementos que entram juntos aparecem em sequência, de cima para baixo.
    els.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      .forEach((el, i) => { setVisible(el, Math.min(i, 4) * 90); if (revealObserver) revealObserver.unobserve(el); });
  }
  function configureReveals() {
    if (revealObserver) revealObserver.disconnect();
    if (warmObserver) warmObserver.disconnect();
    [...revealItems].forEach(el => setVisible(el, 0));
    if (!('IntersectionObserver' in win)) return;
    revealObserver = new IntersectionObserver(entries => {
      const hits = entries.filter(e => e.isIntersecting && canReveal(e.target)).map(e => e.target);
      if (hits.length) revealBatch(hits);
    }, { threshold: 0.01, rootMargin: '0px 0px -16% 0px' });
    // Promove a camada só quando o elemento está prestes a entrar (will-change em tudo desperdiça memória de GPU).
    warmObserver = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('motion-warm'); warmObserver.unobserve(e.target); }
    }, { rootMargin: '0px 0px 90% 0px' });
    d.querySelectorAll(REVEAL).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom <= 0) { el.classList.add('motion-reveal'); setVisible(el, 0, true); return; } // já rolado (ex.: bfcache)
      // motion-prime: aplica o estado oculto SEM transição (evita fade-out visível no carregamento).
      el.classList.add('motion-reveal', 'motion-prime');
      el.classList.remove('motion-in-view', 'motion-done');
      revealItems.add(el);
      revealObserver.observe(el);
      warmObserver.observe(el);
    });
  }
  // Rede de segurança de baixa frequência (4×/s) para o caso de o IntersectionObserver não reavaliar
  // (ex.: canReveal() recusou no mobile). Antes isso rodava em TODO quadro.
  function pollReveals() {
    const trigger = win.innerHeight * .82, hits = [];
    for (const el of revealItems) if (el.getBoundingClientRect().top <= trigger && canReveal(el)) hits.push(el);
    if (hits.length) revealBatch(hits);
  }
  configureReveals();
  narrow.addEventListener && narrow.addEventListener('change', configureReveals);
  win.addEventListener('pageshow', () => {
    revealItems.forEach(el => { if (el.getBoundingClientRect().bottom < 0) setVisible(el, 0, true); });
  });

  /* ───────── Galeria horizontal ───────── */
  let galleryEnabled = false, galleryTravel = 1, galleryDist = 1, galleryHeight = 0, lastGalleryP = -1, lastFocused = -1;
  const dpr = () => win.devicePixelRatio || 1;

  function configureGallery() {
    if (!frame || !stage || !track) return;
    body.classList.add('motion-gallery-ready');
    const travel = Math.max(1, track.scrollWidth - stage.clientWidth);
    // No mobile a distância vertical é menor: evita a sensação de "preso/pesado".
    const dist = Math.max(1, travel * (touch.matches ? 0.64 : 1));
    const height = Math.ceil(stage.offsetHeight + dist);
    galleryEnabled = true;
    if (height === galleryHeight && travel === galleryTravel) return; // idempotente: não mexe no layout sem necessidade
    galleryTravel = travel; galleryDist = dist; galleryHeight = height;
    frame.style.height = height + 'px';
    lastGalleryP = -1; lastFocused = -1; lastY = -1;
    panelFx.forEach(fx => { fx.key = null; });
  }

  function setGalleryProgress(p) {
    const count = panels.length;
    const focused = Math.round(p * (count - 1));
    if (meter) meter.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    if (focused !== lastFocused) {
      if (fraction) fraction.textContent = String(focused + 1).padStart(2, '0') + ' / ' + String(count).padStart(2, '0');
      panels.forEach((panel, i) => panel.classList.toggle('motion-current-panel', i === focused));
      lastFocused = focused;
    }
    if (touch.matches) return; // no toque o próprio deslize já é a coreografia
    // Profundidade: imagem (primeiro plano) corre mais que a trilha, texto menos, letra-fantasma menos ainda.
    for (let i = 0; i < count; i++) {
      const local = clamp(p * (count - 1) - i, -1, 1), fx = panelFx[i], key = Math.round(local * 400);
      if (key === fx.key) continue;
      fx.key = key;
      if (fx.media) fx.media.style.translate = (-local * 38).toFixed(1) + 'px 0';
      if (fx.copy) fx.copy.style.translate = (local * 16).toFixed(1) + 'px 0';
      if (fx.ghost) fx.ghost.style.translate = (local * 70).toFixed(1) + 'px 0';
    }
  }

  /* ───────── Geometria (medida uma vez) ───────── */
  const M = { headerH: 86, hero: null, frameTop: 0, outro: null };
  let lastY = -1, lastScrolled = null, heroP = -1, outroP = -1;

  function measure() {
    configureGallery();
    M.headerH = header ? header.offsetHeight : 86;
    M.hero = hero ? { top: GV.docTop(hero), h: hero.offsetHeight } : null;
    M.frameTop = frame ? GV.docTop(frame) : 0;
    M.outro = outro && outroArt ? { top: GV.docTop(outro), h: outro.offsetHeight } : null;
    lastY = -1;
  }

  /* ───────── Quadro ───────── */
  function render(t, y) {
    if (revealItems.size && t - lastPoll > 250) { lastPoll = t; pollReveals(); }
    if (y === lastY) return;
    lastY = y;
    const vh = win.innerHeight;

    const scrolled = y > 26;
    if (scrolled !== lastScrolled) { lastScrolled = scrolled; body.classList.toggle('scrolled', scrolled); }

    if (M.hero && heroTitle) {
      const p = clamp((y - M.hero.top) / Math.max(1, M.hero.h), 0, 1);
      if (p !== heroP) {
        heroP = p;
        heroTitle.style.translate = '0 ' + (-43 * p).toFixed(1) + 'px';
        heroTitle.style.opacity = (1 - .28 * p).toFixed(3);
        if (heroField && !touch.matches) heroField.style.translate = '0 ' + (34 * p).toFixed(1) + 'px';
      }
    }

    if (galleryEnabled) {
      const p = clamp((y + M.headerH - M.frameTop) / galleryDist, 0, 1);
      if (p !== lastGalleryP) {
        lastGalleryP = p;
        // Arredonda ao pixel físico: o texto não "ferve" e a trilha anda em sincronia com a página.
        const x = Math.round(-galleryTravel * p * dpr()) / dpr();
        track.style.transform = 'translate3d(' + x + 'px,0,0)';
        setGalleryProgress(p);
      }
    }

    if (M.outro) {
      const top = M.outro.top - y;
      if (top < vh && top + M.outro.h > 0) {
        const p = clamp((vh - top) / (vh + M.outro.h), 0, 1);
        if (Math.abs(p - outroP) > .0005) {
          outroP = p;
          outroArt.style.transform = 'translate3d(' + lerp(-46, 46, p).toFixed(1) + 'px,' + lerp(35, -35, p).toFixed(1) + 'px,0)';
        }
      }
    }

  }

  // Estado inicial síncrono (evita o piscar da grade de fallback) e registro no relógio único.
  configureGallery();
  GV.onMeasure(measure);
  GV.onFrame(render);
  touch.addEventListener && touch.addEventListener('change', () => { galleryHeight = 0; GV.invalidate(); });
  if (reduce.addEventListener) reduce.addEventListener('change', () => win.location.reload());

  // Pré-decodifica as prévias (2000×1250): o primeiro deslize da galeria não paga o custo de decodificação.
  const idle = win.requestIdleCallback || (fn => setTimeout(fn, 500));
  win.addEventListener('load', () => idle(() => {
    d.querySelectorAll('.gallery-media img').forEach(img => { if (img.decode) img.decode().catch(() => {}); });
  }), { once: true });
})();
