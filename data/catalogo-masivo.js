/**
 * GAMEZONE 777 - Cargador masivo de catálogo
 * Permite incorporar miles de juegos mediante un único JSON/JS.
 * No modifica los juegos existentes y está desactivado por defecto.
 */
window.GZ_BULK_CATALOG = {
  enabled: false,
  items: [],
  register(items = []) {
    if (!Array.isArray(items)) return;
    const valid = items.filter(item =>
      item && item.id != null && item.titulo && item.consola
    );
    window.GZ_JUEGOS = window.GZ_JUEGOS || [];
    const ids = new Set(window.GZ_JUEGOS.map(game => String(game.id)));
    valid.forEach(game => {
      if (!ids.has(String(game.id))) {
        window.GZ_JUEGOS.push({
          estado: "Disponible",
          precio: 2000,
          featured: false,
          descripcion: "Juego disponible en GAMEZONE 777",
          ...game
        });
        ids.add(String(game.id));
      }
    });
  },
  fromJson(jsonText) {
    try {
      const parsed = JSON.parse(jsonText);
      this.register(Array.isArray(parsed) ? parsed : parsed.games);
    } catch (error) {
      console.error("GAMEZONE: JSON de catálogo inválido", error);
    }
  }
};
