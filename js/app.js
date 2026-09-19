// GAMEZONE 777 - App principal v2, compatible con tu script.js actual
// Junta data/*.js + js/config.js + js/store.js

// Une todos los juegos de data/ si existen, si no usa vacío
const ALL_GAMES = [
  ...(typeof PS2_GAMES !== 'undefined' ? PS2_GAMES : []),
  ...(typeof PS3_GAMES !== 'undefined' ? PS3_GAMES : []),
  ...(typeof PS4_GAMES !== 'undefined' ? PS4_GAMES : []),
  ...(typeof PS5_GAMES !== 'undefined' ? PS5_GAMES : []),
  ...(typeof SWITCH_GAMES !== 'undefined' ? SWITCH_GAMES : []),
];

// Si ALL_GAMES está vacío (porque aún no migraste ps4/ps5), usa tus juegos viejos como fallback
// Esto evita romper
const GAMES_SOURCE = ALL_GAMES.length > 0 ? ALL_GAMES : (typeof juegos !== 'undefined' ? juegos : []);

const App = {
  getAll() { return GAMES_SOURCE; },
  getFeatured() { return GAMES_SOURCE.filter(g => g.featured); },
  getByConsola(consola) { return GAMES_SOURCE.filter(g => g.consola === consola); },
  getByGenero(genero) { return GAMES_SOURCE.filter(g => g.genero === genero); },
  getOfertas() { return GAMES_SOURCE.filter(g => g.oferta || g.estado === 'Oferta'); },
  
  // Formateo usando tu config.js
  formatPrice(precio) {
    if (typeof CONFIG !== 'undefined') {
      return CONFIG.WHATSAPP.MONEDA + ' ' + precio;
    }
    return '$' + precio;
  },

  // Para compatibilidad con img local vs externa
  getImage(game) {
    // Si en el futuro subís imagen local, podés cambiar aquí
    return game.imgLocal && game.imgLocal !== '' ? game.imgLocal : game.img;
  }
};

// Inicializa contadores del Store si existe
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Store !== 'undefined') {
    Store.updateCartCount();
  }
  console.log('GAMEZONE 777 - App cargada con', GAMES_SOURCE.length, 'juegos');
});
