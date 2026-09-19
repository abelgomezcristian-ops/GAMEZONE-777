// GAMEZONE 777 - FIX buscador + flotadores PS2 PS3 PS4
document.addEventListener('DOMContentLoaded', () => {
  // Esperamos a que cargue el catalogo viejo
  setTimeout(() => {
    const buscador = document.querySelector('input[placeholder*="Buscar juego"]');
    const catalogo = document.querySelector('#catalogo, #productos, .catalogo-grid') || document.querySelector('section:has(h2)');
    
    // Busca todas las cards actuales
    function getCards() {
      return document.querySelectorAll('[data-juego], .producto-card, .game-card, .card');
    }

    // Función de filtro universal
    function filtrar(texto) {
      const q = texto.toLowerCase().trim();
      const cards = getCards();
      let visibles = 0;
      cards.forEach(card => {
        const txt = card.innerText.toLowerCase();
        const coincide = txt.includes(q);
        card.style.display = coincide ? '' : 'none';
        if (coincide) visibles++;
      });
      // Si no encuentra, muestra mensaje en consola
      console.log('Filtro:', q, 'visibles:', visibles);
    }

    // Activa el buscador
    if (buscador) {
      console.log('Buscador encontrado');
      buscador.addEventListener('input', (e) => {
        filtrar(e.target.value);
      });
    } else {
      console.warn('Buscador no encontrado');
    }

    // Activa los flotadores de consolas
    const botonesConsola = document.querySelectorAll('button, span, div');
    botonesConsola.forEach(btn => {
      const t = btn.innerText.trim().toUpperCase();
      if (['PS2','PS3','PS4','PS5','SWITCH','XBOX','TODOS'].includes(t) && btn.offsetHeight < 60) {
        btn.style.cursor = 'pointer';
        btn.addEventListener('click', () => {
          if (t === 'TODOS') {
            filtrar('');
            if (buscador) buscador.value = '';
          } else {
            filtrar(t.toLowerCase());
            if (buscador) buscador.value = t;
          }
          // Efecto visual de marcado
          botonesConsola.forEach(b => b.style.opacity = '0.6');
          btn.style.opacity = '1';
          btn.style.border = '1px solid #00ff88';
          
          // Scroll al catalogo
          const tituloPS2 = document.evaluate("//*[contains(text(),'CATÁLOGO PS2')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (tituloPS2) tituloPS2.scrollIntoView({behavior:'smooth'});
        });
      }
    });

    console.log('FIX FILTROS GAMEZONE activo - 32 juegos PS2 cargados:', typeof PS2_GAMES !== 'undefined' ? PS2_GAMES.length : 'revisar data/ps2.js');
  }, 1500);
});
