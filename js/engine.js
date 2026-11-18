/**
 * Arquivo Vivo — Engine v39 (relógio único)
 *
 * UM requestAnimationFrame comanda a rolagem e toda a coreografia, sempre nesta ordem:
 *   1) o motor de rolagem avança (Lenis);
 *   2) medições, apenas se algo mudou de tamanho;
 *   3) animações (só leem a posição já final e escrevem transform/opacity/translate).
 * Assim a animação nunca fica um quadro atrás da rolagem e nenhum assinante lê layout por quadro.
 *
 * Motores: Lenis oficial (desktop) → fallback local suave (se o Lenis não carregar)
 *          → rolagem nativa (touch e "reduzir movimento").
 *
 * API: GV.onFrame(fn(t,y))  GV.onMeasure(fn(info))  GV.invalidate()
 *      GV.scrollTo(alvo,{offset,duration})  GV.docTop(el)  GV.limit()  GV.engine()  GV.stats
 */
(() => {
  'use strict';
  if (window.GV) return;
  const win = window, doc = document, root = doc.documentElement;
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = win.matchMedia('(pointer: coarse)');
  const LENIS_URL = 'https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js';

  // Ajuste fino da sensação de rolagem (único lugar).
  const CONFIG = Object.freeze({
    lerp: 0.072,           // inércia: menor = desliza mais
    wheelMultiplier: 1.07, // ganho da roda/trackpad
    jumpMin: 1.1,          // duração mínima (s) de saltos por âncora
    jumpMax: 2.4           // duração máxima (s)
  });
  win.GV_CINEMATIC_SCROLL = CONFIG;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const header = doc.querySelector('.site-header');

  /* ───────── relógio ───────── */
  const frames = [], measures = [];
  const stats = { avg: 0, worst: 0, frames: 0 };
  let engine = null, dirty = true, lastWidth = win.innerWidth, maxScroll = 0, generation = 0;
  const warned = new Set();
  const report = e => {
    const k = String(e && e.message);
    if (!warned.has(k)) { warned.add(k); console.error('[GV]', e); }
  };

  function runMeasure() {
    const w = win.innerWidth;
    const info = { widthChanged: w !== lastWidth, width: w, height: win.innerHeight };
    lastWidth = w;
    for (let i = 0; i < measures.length; i++) { try { measures[i](info); } catch (e) { report(e); } }
    maxScroll = Math.max(0, root.scrollHeight - root.clientHeight);
  }

  function frame(t) {
    requestAnimationFrame(frame);
    const t0 = performance.now();
    try { if (engine) engine.raf(t); } catch (e) { report(e); }
    if (dirty) { dirty = false; runMeasure(); }
    const y = win.scrollY;
    for (let i = 0; i < frames.length; i++) { try { frames[i](t, y); } catch (e) { report(e); } }
    const dt = performance.now() - t0;
    stats.frames++;
    stats.avg += (dt - stats.avg) * .05;
    stats.worst = Math.max(dt, stats.worst * .995);
  }

  const invalidate = () => { dirty = true; };
  const onFrame = fn => { frames.push(fn); return () => { const i = frames.indexOf(fn); if (i > -1) frames.splice(i, 1); }; };
  const onMeasure = fn => { measures.push(fn); dirty = true; };
  // Posição absoluta no documento sem getBoundingClientRect e sem depender de transforms.
  const docTop = el => { let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop; return y; };

  /* ───────── motor nativo / local (sem Lenis) ───────── */
  // Faz o tween programático e, opcionalmente, a suavização da roda do mouse.
  function makeLocal(withWheel) {
    let cur = win.scrollY, target = cur, last = 0, tween = null;
    const k = CONFIG.lerp * 60;
    const maxY = () => Math.max(0, root.scrollHeight - root.clientHeight);
    const put = y => { cur = y; win.scrollTo({ left: 0, top: y, behavior: 'instant' }); };

    function onWheel(ev) {
      if (doc.body.classList.contains('menu-open') || ev.defaultPrevented || ev.ctrlKey || ev.metaKey || ev.shiftKey ||
          Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) return;
      if (ev.target.closest && ev.target.closest('input,textarea,select,[contenteditable="true"],[data-lenis-prevent]')) return;
      // Componentes com rolagem própria continuam nativos.
      for (let el = ev.target; el && el !== doc.body; el = el.parentElement) {
        if (el.scrollHeight > el.clientHeight + 2 && /(auto|scroll)/.test(getComputedStyle(el).overflowY)) return;
      }
      ev.preventDefault();
      const unit = ev.deltaMode === 1 ? 16 : ev.deltaMode === 2 ? win.innerHeight : 1;
      if (!tween && Math.abs(cur - target) < .5) { cur = target = win.scrollY; }
      tween = null; // a roda do usuário sempre interrompe um salto programático
      target = clamp(target + ev.deltaY * unit * CONFIG.wheelMultiplier, 0, maxY());
    }
    if (withWheel) win.addEventListener('wheel', onWheel, { passive: false });
    // Teclado/arraste de barra: qualquer outro input também interrompe o salto.
    const cancel = () => { tween = null; };
    win.addEventListener('touchstart', cancel, { passive: true });
    win.addEventListener('keydown', cancel, { passive: true });

    return {
      kind: 'local',
      raf(t) {
        const dt = last ? Math.min(.05, (t - last) / 1000) : 1 / 60; last = t;
        if (tween) {
          if (tween.t0 === null) tween.t0 = t;
          const p = clamp((t - tween.t0) / tween.dur, 0, 1);
          target = tween.from + (tween.to - tween.from) * tween.ease(p);
          put(target);
          if (p >= 1) { const done = tween.done; tween = null; if (done) done(); }
          return;
        }
        const d = target - cur;
        if (Math.abs(d) < .25) {
          if (d !== 0) put(target);
          else if (Math.abs(win.scrollY - cur) > 1) { cur = target = win.scrollY; } // rolagem externa (teclado, barra)
          return;
        }
        put(cur + d * (1 - Math.exp(-k * dt)));
      },
      scrollTo(to, o) {
        tween = { from: win.scrollY, to, t0: null, dur: o.duration * 1000, ease: o.easing || easeInOut, done: o.onComplete };
        cur = target = win.scrollY;
      },
      destroy() {
        win.removeEventListener('wheel', onWheel);
        win.removeEventListener('touchstart', cancel);
        win.removeEventListener('keydown', cancel);
        tween = null;
      }
    };
  }

  /* ───────── Lenis oficial ───────── */
  const lenisReady = () => typeof win.Lenis === 'function';
  let lenisLoading = null;
  function inject(url, timeout) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const tag = doc.createElement('script');
      const clock = setTimeout(() => finish(false), timeout);
      function finish(ok) {
        if (settled) return;
        settled = true; clearTimeout(clock);
        tag.onload = tag.onerror = null;
        if (ok) resolve(url); else { tag.remove(); reject(new Error('Lenis não carregou')); }
      }
      tag.src = url; tag.async = true;
      tag.onload = () => finish(lenisReady());
      tag.onerror = () => finish(false);
      doc.head.appendChild(tag);
    });
  }
  function loadLenis() {
    if (lenisReady()) return Promise.resolve('pré-carregado');
    if (lenisLoading) return lenisLoading;
    const sources = [...(win.GV_VENDOR_LENIS_PRESENT ? ['vendor/lenis.min.js'] : []), LENIS_URL];
    lenisLoading = (async () => {
      for (const url of sources) { try { return await inject(url, 4000); } catch (e) { /* tenta a próxima */ } }
      throw new Error('Lenis indisponível');
    })().catch(e => { lenisLoading = null; throw e; });
    return lenisLoading;
  }
  function makeLenis() {
    const inst = new win.Lenis({
      lerp: CONFIG.lerp,
      wheelMultiplier: CONFIG.wheelMultiplier,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,            // o relógio é nosso
      anchors: false,            // âncoras tratadas abaixo, com duração/curva próprias
      stopInertiaOnNavigate: true
    });
    return {
      kind: 'lenis', inst,
      raf: t => inst.raf(t),
      scrollTo(to, o) {
        inst.scrollTo(to, { duration: o.duration, easing: o.easing || easeInOut, lerp: 0, force: true, onComplete: o.onComplete });
      },
      destroy() { inst.destroy(); }
    };
  }

  /* ───────── seleção do motor ───────── */
  function setEngine(next, label) {
    const prev = engine; engine = null;
    if (prev && prev.destroy) prev.destroy();
    engine = next;
    root.dataset.motionEngine = label;
    root.classList.toggle('motion-lenis', label === 'lenis');
    root.classList.toggle('local-cinematic-scroll', label === 'local-smooth');
    win.gvLenis = next && next.kind === 'lenis' ? next.inst : null;
  }
  async function select() {
    const ticket = ++generation;
    if (reduced.matches) { setEngine(makeLocal(false), 'reduced'); return; }
    if (coarse.matches) { setEngine(makeLocal(false), 'native-touch'); return; } // inércia nativa do toque é a melhor
    if (lenisReady()) { setEngine(makeLenis(), 'lenis'); console.info('[GV] Lenis ativo'); return; }
    setEngine(makeLocal(true), 'local-smooth'); // já desliza enquanto o Lenis carrega
    try {
      const source = await loadLenis();
      if (ticket !== generation || reduced.matches || coarse.matches) return;
      setEngine(makeLenis(), 'lenis');
      console.info('[GV] Lenis ativo via', source);
    } catch (e) { /* permanece no fallback local */ }
  }

  /* ───────── navegação programática ───────── */
  function scrollTo(target, opts = {}) {
    const el = typeof target === 'string' ? doc.querySelector(target) : target;
    const y = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + win.scrollY : 0;
    const limit = maxScroll || Math.max(0, root.scrollHeight - root.clientHeight);
    const to = clamp(y + (opts.offset || 0), 0, limit);
    const dist = Math.abs(to - win.scrollY);
    if (reduced.matches || opts.immediate || dist < 2 || !engine) {
      win.scrollTo({ left: 0, top: to, behavior: 'instant' });
      if (engine && engine.kind === 'lenis') engine.inst.scrollTo(to, { immediate: true, force: true });
      return;
    }
    const duration = opts.duration != null ? opts.duration : clamp(CONFIG.jumpMin + dist / 4200, CONFIG.jumpMin, CONFIG.jumpMax);
    try {
      engine.scrollTo(to, { duration, easing: opts.easing, onComplete: opts.onComplete });
    } catch (e) { report(e); win.scrollTo({ left: 0, top: to, behavior: 'instant' }); }
  }

  // Fase de bolha (não de captura): o Lenis trata o clique primeiro (para a inércia) e só então saltamos.
  doc.addEventListener('click', ev => {
    if (ev.defaultPrevented || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    const a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!a) return;
    let id = a.getAttribute('href').slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* mantém */ }
    const el = id && doc.getElementById(id);
    if (!el) return;
    ev.preventDefault();
    scrollTo(el, { offset: -(header ? header.offsetHeight : 0) });
    try { win.history.pushState(null, '', '#' + encodeURIComponent(id)); } catch (e) { /* preview em sandbox */ }
  });

  /* ───────── invalidação de medidas ───────── */
  win.addEventListener('resize', invalidate, { passive: true });
  win.addEventListener('load', invalidate, { once: true });
  win.addEventListener('pageshow', invalidate);
  doc.addEventListener('gv:language', invalidate);
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(invalidate);
  if ('ResizeObserver' in win) new ResizeObserver(invalidate).observe(doc.body);
  reduced.addEventListener && reduced.addEventListener('change', select);
  coarse.addEventListener && coarse.addEventListener('change', select);

  win.GV = {
    onFrame, onMeasure, invalidate, scrollTo, docTop, stats, config: CONFIG,
    limit: () => maxScroll,
    engine: () => (engine ? engine.kind : 'none')
  };
  select();
  requestAnimationFrame(frame);
})();
