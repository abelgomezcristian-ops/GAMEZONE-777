// GAMEZONE 777 - Script v2 usando App + Store + Config - Compatible con gz_cart
document.addEventListener('DOMContentLoaded', () => {
  const catalogo = document.getElementById('catalogo') || document.getElementById('productos') || document.querySelector('.grid');
  if (!catalogo) {
    console.warn('No se encontró contenedor de catálogo');
    return;
  }

  // Filtros actuales
  let filtroConsola = 'todos';
  let filtroGenero = 'todos';
  let busqueda = '';

  function getFiltered() {
    let games = typeof App !== 'undefined' ? App.getAll() : (typeof juegos !== 'undefined' ? juegos : []);
    
    if (filtroConsola !== 'todos') games = games.filter(g => g.consola === filtroConsola);
    if (filtroGenero !== 'todos') games = games.filter(g => g.genero === filtroGenero);
    if (busqueda) {
      const q = busqueda.toLowerCase();
      games = games.filter(g => g.titulo.toLowerCase().includes(q) || g.genero.toLowerCase().includes(q));
    }
    return games;
  }

  function render() {
    const games = getFiltered();
    catalogo.innerHTML = '';

    if (games.length === 0) {
      catalogo.innerHTML = '<p style="color:white; text-align:center; width:100%">No se encontraron juegos</p>';
      return;
    }

    games.forEach((game, index) => {
      const isFav = typeof Store !== 'undefined' ? Store.isFav(game.id) : false;
      const precioFormateado = typeof App !== 'undefined' ? App.formatPrice(game.precio) : '$' + game.precio;
      const img = (typeof App !== 'undefined' ? App.getImage(game) : game.img) || game.img;

      const card = document.createElement('div');
      card.className = 'producto-card'; // usa tu clase actual
      card.style.cssText = 'background:#1a1a1a; border-radius:12px; padding:12px; color:white; position:relative;';
      card.innerHTML = `
        ${game.oferta || game.estado === 'Oferta' ? `<span style="position:absolute; top:8px; left:8px; background:#ff0040; padding:4px 8px; border-radius:6px; font-size:12px;">OFERTA</span>` : ''}
        <button onclick="toggleFav(${game.id})" style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.6); border:none; border-radius:50%; width:32px; height:32px; cursor:pointer;">${isFav ? '❤️' : '🤍'}</button>
        <img src="${img}" alt="${game.titulo}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;" onerror="this.src='https://via.placeholder.com/300x180?text=${encodeURIComponent(game.titulo)}'">
        <h3 style="margin:10px 0 4px; font-size:16px;">${game.titulo}</h3>
        <p style="font-size:12px; opacity:0.7;">${game.consola.toUpperCase()} • ${game.genero}</p>
        <p style="font-size:13px; margin:6px 0;">${game.descripcion || ''}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
          <span style="font-weight:bold; color:#00ff88;">${precioFormateado}</span>
          <button onclick="addToCart(${game.id})" style="background:#00ff88; color:black; border:none; padding:8px 14px; border-radius:8px; font-weight:bold; cursor:pointer;">Agregar</button>
        </div>
      `;
      catalogo.appendChild(card);
    });
  }

  // Funciones globales para botones
  window.addToCart = (id) => {
    const game = (typeof App !== 'undefined' ? App.getAll() : []).find(g => g.id === id);
    if (!game) return;
    if (typeof Store !== 'undefined') {
      Store.addToCart(game);
      alert(`${game.titulo} agregado al carrito`);
    } else {
      // fallback a tu lógica vieja de gz_cart
      let cart = JSON.parse(localStorage.getItem('gz_cart') || '[]');
      cart.push(game);
      localStorage.setItem('gz_cart', JSON.stringify(cart));
      alert(`${game.titulo} agregado`);
    }
  };

  window.toggleFav = (id) => {
    if (typeof Store !== 'undefined') {
      Store.toggleFav(id);
      render();
    }
  };

  // Buscador y filtros si existen en tu HTML
  const searchInput = document.getElementById('buscador') || document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      busqueda = e.target.value;
      render();
    });
  }

  // Filtros por consola si tenés botones con data-consola
  document.querySelectorAll('[data-consola]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filtroConsola = e.target.dataset.consola;
      render();
    });
  });

  document.querySelectorAll('[data-genero]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      filtroGenero = e.target.dataset.genero;
      render();
    });
  });

  // Render inicial
  render();
  console.log('GAMEZONE 777 - Renderizados', getFiltered().length, 'juegos');
});
