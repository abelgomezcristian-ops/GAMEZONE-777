// GAMEZONE 777 - Configuración central
// COMPROBADO: WHATSAPP_NUMBER es tu número real del script.js actual

const CONFIG = {
  WHATSAPP_NUMBER: "5493795118415",
  
  PRICING: {
    ps2: { normal: 2000, oferta: 1500, destacado: 2500 },
    ps3: { normal: 3000, oferta: 2500, destacado: 3000 },
    switch: { normal: 3000, oferta: 2500, destacado: 3000 }
  },

  COMBOS: {
    ps2: {
      x3: { cantidad: 3, descuentoPorcentaje: 15 },
      x5: { cantidad: 5, descuentoPorcentaje: 20 },
      x10: { cantidad: 10, descuentoPorcentaje: 25 }
    },
    ps3: {
      x3: { cantidad: 3, descuentoPorcentaje: 15 },
      x5: { cantidad: 5, descuentoPorcentaje: 20 },
      x10: { cantidad: 10, descuentoPorcentaje: 25 }
    },
    switch: {
      x3: { cantidad: 3, descuentoPorcentaje: 10 },
      x5: { cantidad: 5, descuentoPorcentaje: 15 },
      x10: { cantidad: 10, descuentoPorcentaje: 20 }
    }
  },

  CATALOGO: {
    itemsPerPage: 24,
    placeholderImage: "assets/placeholder.webp"
  },

  ESTADOS: ["Disponible", "Oferta", "Destacado", "Próximamente"],

  GENEROS: ["Todos", "Acción", "Aventura", "RPG", "Deportes", "Carreras", "Lucha", "Shooter", "Terror", "Plataformas", "Mundo abierto", "Hack & Slash", "Sigilo", "Survival Horror", "Familiar"]
};
