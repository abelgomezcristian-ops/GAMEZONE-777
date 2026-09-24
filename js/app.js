window.GZ_JUEGOS = window.GZ_JUEGOS || [];

// Normaliza y elimina duplicados por consola + título sin romper el catálogo existente.
(() => {
  const seen = new Set();
  window.GZ_JUEGOS = window.GZ_JUEGOS.filter((game) => {
    const key = `${String(game.consola || '').toLowerCase()}::${String(game.titulo || '').trim().toLowerCase().replace(/\\s+/g, ' ')}`;
    if (!game.titulo || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

const GZ_UI = (() => {
  const localImages = new Set(['img/ps2/mundo-abierto/gta-san-andreas.webp', 'img/ps2/hack-and-slash/god-of-war-2.webp', 'img/ps2/aventura/shadow-of-the-colossus.webp', 'img/ps2/terror/resident-evil-4.webp', 'img/ps2/carreras/gran-turismo-4.webp', 'img/ps2/pelea/dbz-bt3.webp', 'img/ps3/aventura/uncharted-2.webp']);
  const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const formatPrice = (value) => `$${Number(value || 0).toLocaleString('es-AR')}`;
  const platformName = (id) => (GZ_CONFIG.consolas[id] || {}).slug || String(id).toUpperCase();
  const fallbackCover = (game) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="#111b34"/><rect x="24" y="24" width="552" height="752" rx="20" fill="#17264a" stroke="#35d7ff" stroke-width="2"/><text x="300" y="360" text-anchor="middle" fill="#35d7ff" font-family="Arial" font-size="40" font-weight="bold">GAMEZONE</text><text x="300" y="425" text-anchor="middle" fill="white" font-family="Arial" font-size="25">${escapeHtml(game.titulo)}</text><text x="300" y="480" text-anchor="middle" fill="#a9b8d2" font-family="Arial" font-size="18">${platformName(game.consola)}</text></svg>`)}`;
  const imageFor = (game) => localImages.has(game.imgLocal) ? game.imgLocal : (game.img || fallbackCover(game));

  function updateCartBadges() { document.querySelectorAll('[data-cart-count]').forEach((badge) => { badge.textContent = GZ_STORE.getCount(); }); }
  function gameCard(game) {
    const oldPrice = game.oldPrice ? `<span class="old-price">${formatPrice(game.oldPrice)}</span>` : '';
    const discount = game.oldPrice > game.precio ? Math.round((1 - game.precio / game.oldPrice) * 100) : 0;
    const tags = [game.oferta || game.estado === 'Oferta' ? '<span class="tag tag-offer">OFERTA</span>' : '', game.featured || game.estado === 'Destacado' ? '<span class="tag tag-featured">DESTACADO</span>' : '', game.top ? '<span class="tag tag-top">TOP</span>' : ''].filter(Boolean).join('');
    const description = game.descripcion ? `<p class="game-description">${escapeHtml(game.descripcion)}</p>` : '';
    return `<article class="game-card"><div class="cover-wrap"><img src="${escapeHtml(imageFor(game))}" alt="Portada de ${escapeHtml(game.titulo)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackCover(game)}'">${tags}</div><div class="game-info"><p class="eyebrow">${platformName(game.consola)} · ${escapeHtml(game.genero || 'Otros')}</p><h3>${escapeHtml(game.titulo)}</h3>${description}<div class="price-row"><div>${oldPrice}<strong>${formatPrice(game.precio)}</strong>${discount ? `<small>${discount}% OFF</small>` : ''}</div><button class="button button-small" data-add-cart="${game.id}" aria-label="Agregar ${escapeHtml(game.titulo)} al carrito">Agregar</button></div></div></article>`;
  }
  function bindAddButtons(container = document) { container.querySelectorAll('[data-add-cart]').forEach((button) => button.addEventListener('click', () => { GZ_STORE.addCart(Number(button.dataset.addCart)); updateCartBadges(); button.textContent = 'Agregado ✓'; setTimeout(() => { button.textContent = 'Agregar'; }, 1100); })); }
  function initCatalog() {
    const catalog = document.getElementById('catalogo'); if (!catalog) return;
    const platform = document.body.dataset.platform || null;
    const state = { text: '', genre: 'todos', offer: false, featured: false, top: false, visible: GZ_CONFIG.cargaInicial || 24 };
    const games = () => window.GZ_JUEGOS.filter((game) => !platform || game.consola === platform);
    const genres = [...new Set(games().map((game) => game.genero))].sort();
    const chips = document.getElementById('chipsGenero');
    if (chips) chips.innerHTML = ['todos', ...genres].map((genre) => `<button class="filter-chip ${genre === 'todos' ? 'is-active' : ''}" data-genre="${escapeHtml(genre)}">${genre === 'todos' ? 'Todos' : escapeHtml(genre)}</button>`).join('');
    const render = () => {
      const list = games().filter((game) => { const term = state.text.toLowerCase(); return (!term || `${game.titulo} ${game.genero}`.toLowerCase().includes(term)) && (state.genre === 'todos' || game.genero === state.genre) && (!state.offer || game.oferta || game.estado === 'Oferta') && (!state.featured || game.featured || game.estado === 'Destacado') && (!state.top || game.top); });
      const count = document.getElementById('conteo'); if (count) count.textContent = `${list.length} ${list.length === 1 ? 'juego' : 'juegos'}`;
      catalog.innerHTML = list.length ? list.slice(0, state.visible).map(gameCard).join('') : '<div class="empty-state">No encontramos juegos con esos filtros.</div>'; bindAddButtons(catalog);
      const more = document.getElementById('btnCargarMas'); if (more) more.hidden = list.length <= state.visible;
    };
    document.getElementById('buscador')?.addEventListener('input', (event) => { state.text = event.target.value; state.visible = GZ_CONFIG.cargaInicial || 24; render(); });
    chips?.addEventListener('click', (event) => { const button = event.target.closest('[data-genre]'); if (!button) return; state.genre = button.dataset.genre; state.visible = GZ_CONFIG.cargaInicial || 24; chips.querySelectorAll('[data-genre]').forEach((chip) => chip.classList.toggle('is-active', chip === button)); render(); });
    document.querySelectorAll('[data-toggle-filter]').forEach((button) => button.addEventListener('click', () => { const key = button.dataset.toggleFilter; state[key] = !state[key]; state.visible = GZ_CONFIG.cargaInicial || 24; button.classList.toggle('is-active', state[key]); render(); }));
    document.getElementById('btnCargarMas')?.addEventListener('click', () => { state.visible += GZ_CONFIG.cargaInicial || 24; render(); });
    render();
  }
  function initHome() {
    const featured = document.getElementById('featured-games'); const offers = document.getElementById('offer-games');
    const featuredGames = window.GZ_JUEGOS.filter((game) => game.featured || game.estado === 'Destacado').slice(0, 4);
    const offerGames = window.GZ_JUEGOS.filter((game) => game.oferta || game.estado === 'Oferta').slice(0, 4);
    if (featured) { featured.innerHTML = featuredGames.map(gameCard).join(''); bindAddButtons(featured); }
    if (offers) { offers.innerHTML = offerGames.map(gameCard).join(''); bindAddButtons(offers); }
  }
  function initNavigation() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú');
    }));
  }
  function initHeroMedia() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    const useFallback = () => video.classList.add('is-unavailable');
    video.addEventListener('error', useFallback);
    video.querySelector('source')?.addEventListener('error', useFallback);
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      useFallback();
    }
  }
  document.addEventListener('DOMContentLoaded', () => { initNavigation(); initHeroMedia(); updateCartBadges(); initCatalog(); initHome(); });
  return { escapeHtml, formatPrice, imageFor, fallbackCover, updateCartBadges };
})();
