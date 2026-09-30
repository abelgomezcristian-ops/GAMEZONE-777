// GAMEZONE 777 — Corrección de imágenes PS2
// Evita reutilizar la misma portada externa para varios juegos.

(function () {
  const catalogo = window.GZ_CATALOGOS?.ps2;

  if (!Array.isArray(catalogo)) {
    console.warn("GAMEZONE: catálogo PS2 no encontrado.");
    return;
  }

  const imagenesUsadas = new Set();

  catalogo.forEach((juego) => {
    // Las imágenes locales son específicas y tienen prioridad.
    if (juego.imgLocal) return;

    const imagen = juego.img;

    if (!imagen) return;

    // Si la misma URL ya fue utilizada por otro juego,
    // quitamos la imagen para que app.js use el fallback.
    if (imagenesUsadas.has(imagen)) {
      juego.img = "";
    } else {
      imagenesUsadas.add(imagen);
    }
  });

  console.log(
    "GAMEZONE: corrección de imágenes PS2 aplicada.",
    catalogo.length,
    "juegos revisados."
  );
})();
