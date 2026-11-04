// =========================================================
// Dados das combinações tipográficas
// =========================================================
const pairings = [
      { label:'Editorial Classic', headingName:'Georgia', bodyName:'Arial', headingFont:'Georgia, "Times New Roman", serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['editorial','classic','luxury'], scores:{contrast:82,elegance:88,readability:90,editorial:91}, featured:true, editor:false, luxury:true },
      { label:'Modern Prestige', headingName:'Trebuchet MS', bodyName:'Georgia', headingFont:'"Trebuchet MS", "Helvetica Neue", Arial, sans-serif', bodyFont:'Georgia, "Times New Roman", serif', styles:['modern','bold','luxury'], scores:{contrast:84,elegance:81,readability:86,editorial:79}, featured:false, editor:false, luxury:false },
      { label:'Luxury Minimal', headingName:'Times New Roman', bodyName:'Verdana', headingFont:'"Times New Roman", Times, serif', bodyFont:'Verdana, Geneva, sans-serif', styles:['minimal','classic','luxury'], scores:{contrast:79,elegance:86,readability:87,editorial:80}, featured:true, editor:false, luxury:true },
      { label:'Clean Editorial', headingName:'Palatino', bodyName:'Tahoma', headingFont:'"Palatino Linotype", Palatino, serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['editorial','minimal','classic'], scores:{contrast:80,elegance:87,readability:88,editorial:89}, featured:false, editor:true, luxury:false },
      { label:'Refined Contrast', headingName:'Garamond Alternative', bodyName:'Arial', headingFont:'Garamond, Baskerville, "Times New Roman", serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['editorial','luxury','classic'], scores:{contrast:88,elegance:93,readability:85,editorial:94}, featured:true, editor:true, luxury:true },
      { label:'Confident Modern', headingName:'Helvetica / Arial', bodyName:'Georgia', headingFont:'"Helvetica Neue", Helvetica, Arial, sans-serif', bodyFont:'Georgia, "Times New Roman", serif', styles:['modern','minimal','bold'], scores:{contrast:81,elegance:77,readability:89,editorial:74}, featured:false, editor:false, luxury:false },
      { label:'Elegant Heritage', headingName:'Palatino', bodyName:'Arial', headingFont:'"Palatino Linotype", "Book Antiqua", Palatino, serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['luxury','classic','editorial'], scores:{contrast:84,elegance:90,readability:88,editorial:90}, featured:true, editor:true, luxury:true },
      { label:'Balanced Premium', headingName:'Gill Sans Alternative', bodyName:'Times New Roman', headingFont:'"Gill Sans", "Trebuchet MS", Calibri, sans-serif', bodyFont:'"Times New Roman", Times, serif', styles:['modern','editorial','luxury'], scores:{contrast:83,elegance:84,readability:84,editorial:82}, featured:false, editor:false, luxury:false },
      { label:'Classic Authority', headingName:'Book Antiqua', bodyName:'Verdana', headingFont:'"Book Antiqua", Palatino, serif', bodyFont:'Verdana, Geneva, sans-serif', styles:['classic','luxury','bold'], scores:{contrast:86,elegance:89,readability:90,editorial:85}, featured:false, editor:false, luxury:true },
      { label:'Quiet Luxury', headingName:'Baskerville Alternative', bodyName:'Tahoma', headingFont:'Baskerville, Georgia, "Times New Roman", serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['luxury','minimal','editorial'], scores:{contrast:87,elegance:94,readability:87,editorial:92}, featured:true, editor:true, luxury:true },
      { label:'Modern Editorial', headingName:'Arial Black', bodyName:'Georgia', headingFont:'"Arial Black", Arial, sans-serif', bodyFont:'Georgia, "Times New Roman", serif', styles:['bold','modern','editorial'], scores:{contrast:91,elegance:73,readability:82,editorial:78}, featured:false, editor:false, luxury:false },
      { label:'Soft Prestige', headingName:'Cambria', bodyName:'Arial', headingFont:'Cambria, Georgia, serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['luxury','modern','minimal'], scores:{contrast:80,elegance:86,readability:91,editorial:83}, featured:false, editor:false, luxury:true },
      { label:'Refined Studio', headingName:'Palatino', bodyName:'Trebuchet MS', headingFont:'"Palatino Linotype", Palatino, serif', bodyFont:'"Trebuchet MS", Arial, sans-serif', styles:['editorial','modern','luxury'], scores:{contrast:82,elegance:88,readability:87,editorial:88}, featured:true, editor:false, luxury:false },
      { label:'Elegant Utility', headingName:'Georgia', bodyName:'Tahoma', headingFont:'Georgia, serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['classic','minimal','luxury'], scores:{contrast:83,elegance:86,readability:90,editorial:86}, featured:false, editor:false, luxury:false },
      { label:'Heritage Modern', headingName:'Times New Roman', bodyName:'Trebuchet MS', headingFont:'"Times New Roman", Times, serif', bodyFont:'"Trebuchet MS", Arial, sans-serif', styles:['classic','modern','bold'], scores:{contrast:84,elegance:81,readability:86,editorial:80}, featured:false, editor:false, luxury:false },
      { label:'Luxury Clarity', headingName:'Cambria', bodyName:'Verdana', headingFont:'Cambria, Georgia, serif', bodyFont:'Verdana, Geneva, sans-serif', styles:['luxury','minimal','classic'], scores:{contrast:79,elegance:85,readability:92,editorial:81}, featured:false, editor:true, luxury:true },
      { label:'Editorial Presence', headingName:'Garamond Alternative', bodyName:'Tahoma', headingFont:'Garamond, Baskerville, "Times New Roman", serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['editorial','luxury','classic'], scores:{contrast:89,elegance:95,readability:86,editorial:96}, featured:true, editor:true, luxury:true },
      { label:'Structured Modern', headingName:'Arial', bodyName:'Verdana', headingFont:'Arial, Helvetica, sans-serif', bodyFont:'Verdana, Geneva, sans-serif', styles:['modern','minimal','bold'], scores:{contrast:74,elegance:70,readability:94,editorial:62}, featured:false, editor:false, luxury:false },
      { label:'Fine Contrast', headingName:'Palatino', bodyName:'Verdana', headingFont:'"Palatino Linotype", Palatino, serif', bodyFont:'Verdana, Geneva, sans-serif', styles:['luxury','editorial','minimal'], scores:{contrast:85,elegance:91,readability:90,editorial:89}, featured:true, editor:false, luxury:true },
      { label:'Soft Editorial', headingName:'Georgia', bodyName:'Trebuchet MS', headingFont:'Georgia, serif', bodyFont:'"Trebuchet MS", Arial, sans-serif', styles:['editorial','modern','minimal'], scores:{contrast:82,elegance:84,readability:88,editorial:87}, featured:false, editor:false, luxury:false },
      { label:'Strong Luxury', headingName:'Arial Black', bodyName:'Tahoma', headingFont:'"Arial Black", Arial, sans-serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['bold','luxury','modern'], scores:{contrast:93,elegance:76,readability:85,editorial:69}, featured:false, editor:false, luxury:false },
      { label:'Calm Heritage', headingName:'Book Antiqua', bodyName:'Arial', headingFont:'"Book Antiqua", Palatino, serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['classic','luxury','editorial'], scores:{contrast:84,elegance:89,readability:89,editorial:88}, featured:false, editor:false, luxury:true },
      { label:'Minimal Tone', headingName:'Helvetica / Arial', bodyName:'Tahoma', headingFont:'"Helvetica Neue", Helvetica, Arial, sans-serif', bodyFont:'Tahoma, Geneva, sans-serif', styles:['minimal','modern','bold'], scores:{contrast:77,elegance:72,readability:93,editorial:60}, featured:false, editor:false, luxury:false },
      { label:'Maison Editorial', headingName:'Baskerville Alternative', bodyName:'Arial', headingFont:'Baskerville, Georgia, "Times New Roman", serif', bodyFont:'Arial, Helvetica, sans-serif', styles:['editorial','luxury','classic'], scores:{contrast:88,elegance:94,readability:88,editorial:95}, featured:true, editor:true, luxury:true }
];

const styleOptions = ['all', 'editorial', 'luxury', 'minimal', 'bold', 'classic', 'modern'];

// =========================================================
// Cache de elementos do DOM
// =========================================================
const els = {
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  pairingsGrid: document.getElementById('pairingsGrid'),
  headingFontName: document.getElementById('headingFontName'),
  bodyFontName: document.getElementById('bodyFontName'),
  pairingCounter: document.getElementById('pairingCounter'),
  styleBadges: document.getElementById('styleBadges'),
  styleFilterBar: document.getElementById('styleFilterBar'),
  searchInput: document.getElementById('searchInput'),
  clearFiltersBtn: document.getElementById('clearFiltersBtn'),
  featuredGrid: document.getElementById('featuredGrid'),
  landingScroll: document.getElementById('landingScroll'),

  headingTextInput: document.getElementById('headingTextInput'),
  subheadingTextInput: document.getElementById('subheadingTextInput'),
  eyebrowTextInput: document.getElementById('eyebrowTextInput'),
  primaryButtonInput: document.getElementById('primaryButtonInput'),
  secondaryButtonInput: document.getElementById('secondaryButtonInput'),
  bodyTextInput: document.getElementById('bodyTextInput'),

  previewEyebrow: document.getElementById('previewEyebrow'),
  previewTitle: document.getElementById('previewTitle'),
  previewSubtitle: document.getElementById('previewSubtitle'),
  previewBody: document.getElementById('previewBody'),
  primaryButton: document.getElementById('primaryButton'),
  secondaryButton: document.getElementById('secondaryButton'),

  headingSize: document.getElementById('headingSize'),
  bodySize: document.getElementById('bodySize'),
  headingLine: document.getElementById('headingLine'),
  bodyLine: document.getElementById('bodyLine'),
  headingTrack: document.getElementById('headingTrack'),
  bodyTrack: document.getElementById('bodyTrack'),
  headingWeight: document.getElementById('headingWeight'),
  bodyWeight: document.getElementById('bodyWeight'),

  headingSizeValue: document.getElementById('headingSizeValue'),
  bodySizeValue: document.getElementById('bodySizeValue'),
  headingLineValue: document.getElementById('headingLineValue'),
  bodyLineValue: document.getElementById('bodyLineValue'),
  headingTrackValue: document.getElementById('headingTrackValue'),
  bodyTrackValue: document.getElementById('bodyTrackValue'),
  headingWeightValue: document.getElementById('headingWeightValue'),
  bodyWeightValue: document.getElementById('bodyWeightValue'),

  scoreContrast: document.getElementById('scoreContrast'),
  scoreElegance: document.getElementById('scoreElegance'),
  scoreLegibilidade: document.getElementById('scoreLegibilidade'),
  scoreEditorial: document.getElementById('scoreEditorial'),
  scoreContrastText: document.getElementById('scoreContrastText'),
  scoreEleganceText: document.getElementById('scoreEleganceText'),
  scoreLegibilidadeText: document.getElementById('scoreLegibilidadeText'),
  scoreEditorialText: document.getElementById('scoreEditorialText'),

  comparePageA: document.getElementById('comparePageA'),
  comparePageB: document.getElementById('comparePageB'),
  compareScrollA: document.getElementById('compareScrollA'),
  compareScrollB: document.getElementById('compareScrollB'),
  compareCurrentLabel: document.getElementById('compareCurrentLabel'),
  compareAltLabel: document.getElementById('compareAltLabel'),
  compareCurrentFonts: document.getElementById('compareCurrentFonts'),
  compareAltFonts: document.getElementById('compareAltFonts'),
  diffList: document.getElementById('diffList'),
  toggleDiffsBtn: document.getElementById('toggleDiffsBtn'),
  swapCompareBtn: document.getElementById('swapCompareBtn')
};

// =========================================================
// Estado global da interface
// =========================================================
const state = {
  currentIndex: 0,
  compareIndex: 1,
  activeStyle: 'all',
  activeCuration: 'all',
  search: '',
  syncCompare: true,
  highlightDiffs: true,
  controls: {
    headingSize: 76,
    bodySize: 18,
    headingLine: 0.95,
    bodyLine: 1.85,
    headingTrack: -0.05,
    bodyTrack: 0,
    headingWeight: 700,
    bodyWeight: 400
  }
};

// =========================================================
// Helpers
// =========================================================
function formatNumber(number) {
  return String(number).padStart(2, '0');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char];
  });
}

function getFilteredPairings() {
  return pairings.filter((pairing) => {
    const matchesStyle =
      state.activeStyle === 'all' || pairing.styles.includes(state.activeStyle);

    const matchesCuration =
      state.activeCuration === 'all' ||
      (state.activeCuration === 'featured' && pairing.featured) ||
      (state.activeCuration === 'editor' && pairing.editor) ||
      (state.activeCuration === 'luxury' && pairing.luxury);

    const query = state.search.trim().toLowerCase();
    const haystack = [
      pairing.label,
      pairing.headingName,
      pairing.bodyName,
      pairing.styles.join(' ')
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !query || haystack.includes(query);
    return matchesStyle && matchesCuration && matchesSearch;
  });
}

function getCurrentPairing() {
  return pairings[state.currentIndex];
}

function getComparePairing() {
  return pairings[state.compareIndex];
}

function setCurrentByPairing(pairing) {
  const index = pairings.findIndex((item) => item.label === pairing.label);

  if (index >= 0) {
    state.currentIndex = index;
  }

  if (state.compareIndex === state.currentIndex) {
    state.compareIndex = (state.currentIndex + 1) % pairings.length;
  }
}

function ensureCurrentVisible() {
  const filtered = getFilteredPairings();
  const current = getCurrentPairing();

  if (!filtered.length) {
    return;
  }

  if (!filtered.some((pairing) => pairing.label === current.label)) {
    setCurrentByPairing(filtered[0]);
  }
}

function curationBadges(pairing) {
  const badges = [];

  if (pairing.featured) {
    badges.push('<span class="mini-badge is-feature">Destaque</span>');
  }

  if (pairing.editor) {
    badges.push('<span class="mini-badge is-gold">Escolha do editor</span>');
  }

  if (pairing.luxury) {
    badges.push('<span class="mini-badge is-feature">Seleção luxury</span>');
  }

  return badges.join('');
}

// =========================================================
// Renderização da interface
// =========================================================
function renderStyleFilters() {
  const labels = {
    all: 'Todos',
    editorial: 'editorial',
    luxury: 'luxury',
    minimal: 'minimal',
    bold: 'ousado',
    classic: 'clássico',
    modern: 'moderno'
  };

  els.styleFilterBar.innerHTML = '';

  styleOptions.forEach((style) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `chip${state.activeStyle === style ? ' active' : ''}`;
    button.textContent = labels[style] || style;

    button.addEventListener('click', () => {
      state.activeStyle = style;
      ensureCurrentVisible();
      render();
    });

    els.styleFilterBar.appendChild(button);
  });
}

function renderFeaturedGrid() {
  const curated = pairings
    .filter((pairing) => {
      if (state.activeCuration === 'all') {
        return pairing.featured || pairing.editor || pairing.luxury;
      }

      if (state.activeCuration === 'featured') {
        return pairing.featured;
      }

      if (state.activeCuration === 'editor') {
        return pairing.editor;
      }

      return pairing.luxury;
    })
    .slice(0, 6);

  els.featuredGrid.innerHTML = curated
    .map(
      (pairing) => `
        <button type="button" class="featured-card" data-featured="${pairing.label}">
          <span class="tiny-label">${pairing.label}</span>
          <h4 style="font-family:${pairing.headingFont}">${pairing.headingName}</h4>
          <p>${pairing.bodyName} · ${pairing.styles.join(' · ')}</p>
          <div class="badge-row">${curationBadges(pairing)}</div>
        </button>
      `
    )
    .join('');
}

function renderPairingsGrid() {
  const filtered = getFilteredPairings();
  els.pairingsGrid.innerHTML = '';

  if (!filtered.length) {
    els.pairingsGrid.innerHTML =
      '<div class="small-note">Nenhuma combinação encontrada com os filtros atuais.</div>';
    return;
  }

  filtered.forEach((pairing) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      'pairing-card' +
      (pairing.label === getCurrentPairing().label ? ' active' : '');

    button.innerHTML = `
      <span class="tag">${pairing.label}</span>
      <span class="name">${pairing.headingName} + ${pairing.bodyName}</span>
      <span class="fonts">Título: ${pairing.headingName}<br />Texto: ${pairing.bodyName}</span>
      <div class="badge-row">
        ${pairing.styles.map((style) => `<span class="badge">${style}</span>`).join('')}
        ${curationBadges(pairing)}
      </div>
    `;

    button.addEventListener('click', () => {
      setCurrentByPairing(pairing);
      render();
    });

    els.pairingsGrid.appendChild(button);
  });
}

function renderDetails() {
  const pairing = getCurrentPairing();

  els.headingFontName.textContent = pairing.headingName;
  els.bodyFontName.textContent = pairing.bodyName;
  els.pairingCounter.textContent = `${formatNumber(state.currentIndex + 1)} / ${formatNumber(pairings.length)}`;
  els.styleBadges.innerHTML =
    pairing.styles.map((style) => `<span class="badge">${style}</span>`).join('') +
    curationBadges(pairing);
}

function renderContent() {
  const heading = els.headingTextInput.value.trim() || 'Título';
  const subheading = els.subheadingTextInput.value.trim() || 'Subtítulo';
  const eyebrow = els.eyebrowTextInput.value.trim() || 'Sobretítulo';
  const body = els.bodyTextInput.value.trim() || 'Texto';
  const primaryButton = els.primaryButtonInput.value.trim() || 'Principal';
  const secondaryButton = els.secondaryButtonInput.value.trim() || 'Secundário';

  els.previewTitle.textContent = heading;
  els.previewSubtitle.textContent = subheading;
  els.previewEyebrow.textContent = eyebrow;
  els.previewBody.textContent = body;
  els.primaryButton.textContent = primaryButton;
  els.secondaryButton.textContent = secondaryButton;
}

function applyTypography(root = document, pairing = getCurrentPairing()) {
  root.querySelectorAll('.preview-heading-target').forEach((element) => {
    element.style.fontFamily = pairing.headingFont;
    element.style.fontWeight = state.controls.headingWeight;
  });

  root.querySelectorAll('.preview-body-target').forEach((element) => {
    element.style.fontFamily = pairing.bodyFont;
    element.style.fontWeight = state.controls.bodyWeight;
  });

  root.querySelectorAll('.display').forEach((element) => {
    element.style.fontSize = `${state.controls.headingSize}px`;
    element.style.lineHeight = state.controls.headingLine;
    element.style.letterSpacing = `${state.controls.headingTrack}em`;
  });

  root
    .querySelectorAll('.sub, .body, .site-links, .eyebrow, .tiny-label, .featured-card p')
    .forEach((element) => {
      element.style.fontSize = `${state.controls.bodySize}px`;
      element.style.lineHeight = state.controls.bodyLine;
      element.style.letterSpacing = `${state.controls.bodyTrack}em`;
    });

  root.querySelectorAll('.featured-card h4').forEach((element) => {
    element.style.fontFamily = pairing.headingFont;
    element.style.fontWeight = state.controls.headingWeight;
  });

  els.headingSizeValue.textContent = `${state.controls.headingSize}px`;
  els.bodySizeValue.textContent = `${state.controls.bodySize}px`;
  els.headingLineValue.textContent = Number(state.controls.headingLine).toFixed(2);
  els.bodyLineValue.textContent = Number(state.controls.bodyLine).toFixed(2);
  els.headingTrackValue.textContent = `${Number(state.controls.headingTrack)
    .toFixed(3)
    .replace(/\.?0+$/, '')}em`;
  els.bodyTrackValue.textContent = `${Number(state.controls.bodyTrack)
    .toFixed(3)
    .replace(/\.?0+$/, '')}em`;
  els.headingWeightValue.textContent = state.controls.headingWeight;
  els.bodyWeightValue.textContent = state.controls.bodyWeight;
}

function renderScores() {
  const scores = getCurrentPairing().scores;

  els.scoreContrast.style.width = `${scores.contrast}%`;
  els.scoreElegance.style.width = `${scores.elegance}%`;
  els.scoreLegibilidade.style.width = `${scores.readability}%`;
  els.scoreEditorial.style.width = `${scores.editorial}%`;

  els.scoreContrastText.textContent = scores.contrast;
  els.scoreEleganceText.textContent = scores.elegance;
  els.scoreLegibilidadeText.textContent = scores.readability;
  els.scoreEditorialText.textContent = scores.editorial;
}

function buildComparePage(pairing) {
  const heading = escapeHtml(els.headingTextInput.value.trim() || 'Título');
  const subheading = escapeHtml(els.subheadingTextInput.value.trim() || 'Subtítulo');
  const body = escapeHtml(els.bodyTextInput.value.trim() || 'Texto');

  return `
    <div class="compare-card ${state.highlightDiffs ? 'compare-highlight' : ''}">
      <span class="tiny-label compare-label">Hero</span>
      <h4 class="display compare-h">${heading}</h4>
      <p class="compare-body" style="color: var(--muted)">${subheading}</p>
    </div>

    <div class="compare-card ${state.highlightDiffs ? 'compare-highlight' : ''}">
      <span class="tiny-label compare-label">Texto</span>
      <p class="compare-body" style="color: var(--muted)">${body}</p>
    </div>

    <div class="compare-card ${state.highlightDiffs ? 'compare-highlight' : ''}">
      <span class="tiny-label compare-label">Metadados</span>
      <p class="compare-body" style="color: var(--muted); margin: 0">
        ${escapeHtml(pairing.headingName)} + ${escapeHtml(pairing.bodyName)}
      </p>
      <div class="badge-row">
        ${pairing.styles.map((style) => `<span class="badge">${style}</span>`).join('')}
      </div>
    </div>
  `;
}

function applyCompareTypography(scope, pairing) {
  if (!scope || !pairing) {
    return;
  }

  scope.querySelectorAll('.compare-h').forEach((element) => {
    element.style.fontFamily = pairing.headingFont;
    element.style.fontWeight = state.controls.headingWeight;
    element.style.fontSize = `${state.controls.headingSize}px`;
    element.style.lineHeight = state.controls.headingLine;
    element.style.letterSpacing = `${state.controls.headingTrack}em`;
  });

  scope.querySelectorAll('.compare-body, .compare-label').forEach((element) => {
    element.style.fontFamily = pairing.bodyFont;
    element.style.fontWeight = state.controls.bodyWeight;
    element.style.fontSize = `${state.controls.bodySize}px`;
    element.style.lineHeight = state.controls.bodyLine;
    element.style.letterSpacing = `${state.controls.bodyTrack}em`;
  });
}

function renderCompare() {
  const current = getCurrentPairing();
  const alternative = getComparePairing();

  els.compareCurrentLabel.textContent = current.label;
  els.compareAltLabel.textContent = alternative.label;
  els.compareCurrentFonts.textContent = `${current.headingName} + ${current.bodyName}`;
  els.compareAltFonts.textContent = `${alternative.headingName} + ${alternative.bodyName}`;

  els.comparePageA.innerHTML = buildComparePage(current);
  els.comparePageB.innerHTML = buildComparePage(alternative);

  applyCompareTypography(els.comparePageA, current);
  applyCompareTypography(els.comparePageB, alternative);

  els.diffList.innerHTML = `
    <div class="diff-item">
      <strong>Título contrast</strong>
      <span>${current.headingName} vs ${alternative.headingName}</span>
    </div>
    <div class="diff-item">
      <strong>Texto rhythm</strong>
      <span>${current.bodyName} vs ${alternative.bodyName}</span>
    </div>
    <div class="diff-item">
      <strong>Pontuação editorial</strong>
      <span>${current.scores.editorial} vs ${alternative.scores.editorial}</span>
    </div>
  `;
}

// =========================================================
// Navegação das combinações
// =========================================================
function nextFromFiltered(direction = 1) {
  const filtered = getFilteredPairings();

  if (!filtered.length) {
    return;
  }

  const current = getCurrentPairing();
  let indexInFiltered = filtered.findIndex((pairing) => pairing.label === current.label);

  if (indexInFiltered < 0) {
    indexInFiltered = 0;
  }

  const next =
    filtered[(indexInFiltered + direction + filtered.length) % filtered.length];

  setCurrentByPairing(next);
  render();
}

function shuffleFromFiltered() {
  const filtered = getFilteredPairings();

  if (!filtered.length) {
    return;
  }

  let next = filtered[Math.floor(Math.random() * filtered.length)];

  if (filtered.length > 1) {
    while (next.label === getCurrentPairing().label) {
      next = filtered[Math.floor(Math.random() * filtered.length)];
    }
  }

  setCurrentByPairing(next);
  render();
}

function nextCompare() {
  state.compareIndex = (state.compareIndex + 1) % pairings.length;

  if (state.compareIndex === state.currentIndex) {
    state.compareIndex = (state.compareIndex + 1) % pairings.length;
  }

  renderCompare();
}

// =========================================================
// Sincronização dos painéis de comparação
// =========================================================
let isSyncingCompare = false;

function syncScroll(source, target) {
  if (!state.syncCompare || isSyncingCompare || !source || !target) {
    return;
  }

  isSyncingCompare = true;

  const sourceMax = Math.max(1, source.scrollHeight - source.clientHeight);
  const targetMax = Math.max(0, target.scrollHeight - target.clientHeight);
  const ratio = source.scrollTop / sourceMax;

  target.scrollTop = ratio * targetMax;

  requestAnimationFrame(() => {
    isSyncingCompare = false;
  });
}

// =========================================================
// Eventos
// =========================================================
function bindControls() {
  document.querySelectorAll('[data-curation]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeCuration = button.dataset.curation;

      document.querySelectorAll('[data-curation]').forEach((item, index) => {
        item.classList.toggle('active', item === button || (!button && index === 0));
      });

      ensureCurrentVisible();
      render();
    });
  });

  els.featuredGrid.addEventListener('click', (event) => {
    const card = event.target.closest('[data-featured]');

    if (!card) {
      return;
    }

    const pairing = pairings.find((item) => item.label === card.dataset.featured);

    if (pairing) {
      setCurrentByPairing(pairing);
      render();
    }
  });

  els.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    ensureCurrentVisible();
    render();
  });

  els.clearFiltersBtn.addEventListener('click', () => {
    state.activeStyle = 'all';
    state.activeCuration = 'all';
    state.search = '';
    els.searchInput.value = '';

    document.querySelectorAll('[data-curation]').forEach((button, index) => {
      button.classList.toggle('active', index === 0);
    });

    render();
  });

  els.prevBtn.addEventListener('click', () => nextFromFiltered(-1));
  els.nextBtn.addEventListener('click', () => nextFromFiltered(1));
  els.shuffleBtn.addEventListener('click', shuffleFromFiltered);

  [
    els.headingTextInput,
    els.subheadingTextInput,
    els.eyebrowTextInput,
    els.primaryButtonInput,
    els.secondaryButtonInput,
    els.bodyTextInput
  ].forEach((input) => {
    input.addEventListener('input', render);
  });

  [
    'headingSize',
    'bodySize',
    'headingLine',
    'bodyLine',
    'headingTrack',
    'bodyTrack',
    'headingWeight',
    'bodyWeight'
  ].forEach((key) => {
    els[key].addEventListener('input', () => {
      state.controls[key] = Number(els[key].value);
      applyTypography();
      renderCompare();
    });
  });

  els.compareScrollA.addEventListener('scroll', () => {
    syncScroll(els.compareScrollA, els.compareScrollB);
  });

  els.compareScrollB.addEventListener('scroll', () => {
    syncScroll(els.compareScrollB, els.compareScrollA);
  });

  els.toggleDiffsBtn.addEventListener('click', () => {
    state.highlightDiffs = !state.highlightDiffs;
    els.toggleDiffsBtn.classList.toggle('active', state.highlightDiffs);
    renderCompare();
  });

  els.swapCompareBtn.addEventListener('click', nextCompare);

  document.addEventListener('keydown', (event) => {
    if (event.target.matches('input, textarea')) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      nextFromFiltered(-1);
    }

    if (event.key === 'ArrowRight') {
      nextFromFiltered(1);
    }
  });
}

function render() {
  ensureCurrentVisible();
  renderStyleFilters();
  renderFeaturedGrid();
  renderPairingsGrid();
  renderDetails();
  renderContent();
  applyTypography();
  renderCompare();
  renderScores();
}

bindControls();
render();
