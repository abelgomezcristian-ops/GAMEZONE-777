// PS2 - Catálogo completo GAMEZONE 777 - 32 juegos
const PS2_GAMES = [
  // MUNDO ABIERTO
  { id: 1, titulo: "GTA San Andreas", consola: "ps2", genero: "Mundo abierto", precio: 2000, oldPrice: 2500, estado: "Oferta", featured: true, descripcion: "Clásico eterno de mundo abierto", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbw.jpg", imgLocal: "img/ps2/mundo-abierto/gta-san-andreas.webp", oferta: true },
  { id: 12, titulo: "GTA Vice City", consola: "ps2", genero: "Mundo abierto", precio: 2000, estado: "Disponible", featured: true, descripcion: "Los 80s en Miami", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbw.jpg", imgLocal: "img/ps2/mundo-abierto/gta-vice-city.webp" },
  { id: 13, titulo: "Bully", consola: "ps2", genero: "Mundo abierto", precio: 2000, estado: "Disponible", featured: false, descripcion: "La escuela nunca fue tan divertida", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/mundo-abierto/bully.webp" },
  { id: 14, titulo: "Scarface", consola: "ps2", genero: "Mundo abierto", precio: 2000, estado: "Disponible", featured: false, descripcion: "El mundo es tuyo", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/mundo-abierto/scarface.webp" },

  // HACK & SLASH / ACCION
  { id: 2, titulo: "God of War II", consola: "ps2", genero: "Hack & Slash", precio: 2500, oldPrice: 3000, estado: "Destacado", featured: true, descripcion: "La ira de Kratos continúa", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/hack-and-slash/god-of-war-2.webp", oferta: true },
  { id: 15, titulo: "God of War", consola: "ps2", genero: "Hack & Slash", precio: 2000, estado: "Disponible", featured: true, descripcion: "El origen de Kratos", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/hack-and-slash/god-of-war-1.webp" },
  { id: 16, titulo: "Devil May Cry 3", consola: "ps2", genero: "Hack & Slash", precio: 2000, estado: "Disponible", featured: false, descripcion: "El despertar de Dante", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/hack-and-slash/dmc3.webp" },
  { id: 17, titulo: "Shadow of the Colossus", consola: "ps2", genero: "Aventura", precio: 2500, estado: "Destacado", featured: true, descripcion: "Obra maestra", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/aventura/shadow-colossus.webp" },

  // TERROR
  { id: 3, titulo: "Resident Evil 4", consola: "ps2", genero: "Terror", precio: 2000, estado: "Disponible", featured: false, descripcion: "Survival horror que marcó una era", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/terror/resident-evil-4.webp" },
  { id: 18, titulo: "Silent Hill 2", consola: "ps2", genero: "Terror", precio: 2500, estado: "Disponible", featured: true, descripcion: "Terror psicológico", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/terror/silent-hill-2.webp" },
  { id: 19, titulo: "Silent Hill 3", consola: "ps2", genero: "Terror", precio: 2000, estado: "Disponible", featured: false, descripcion: "El miedo continúa", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/terror/silent-hill-3.webp" },

  // DEPORTES
  { id: 4, titulo: "PES 2013", consola: "ps2", genero: "Deportes", precio: 2000, estado: "Disponible", featured: false, descripcion: "Fútbol clásico", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wzn.jpg", imgLocal: "img/ps2/deportes/pes-2013.webp" },
  { id: 20, titulo: "FIFA 14", consola: "ps2", genero: "Deportes", precio: 2000, estado: "Disponible", featured: false, descripcion: "Último FIFA de PS2", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wzn.jpg", imgLocal: "img/ps2/deportes/fifa-14.webp" },
  { id: 21, titulo: "Gran Turismo 4", consola: "ps2", genero: "Carreras", precio: 2500, estado: "Destacado", featured: true, descripcion: "El simulador definitivo", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wzn.jpg", imgLocal: "img/ps2/carreras/gran-turismo-4.webp" },
  { id: 22, titulo: "Need for Speed Most Wanted", consola: "ps2", genero: "Carreras", precio: 2000, estado: "Disponible", featured: true, descripcion: "Persecuciones épicas", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2wzn.jpg", imgLocal: "img/ps2/carreras/nfs-most-wanted.webp" },

  // PELEA
  { id: 23, titulo: "Dragon Ball Z Budokai Tenkaichi 3", consola: "ps2", genero: "Pelea", precio: 2500, estado: "Destacado", featured: true, descripcion: "El mejor DBZ", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/pelea/dbz-bt3.webp" },
  { id: 24, titulo: "Tekken 5", consola: "ps2", genero: "Pelea", precio: 2000, estado: "Disponible", featured: false, descripcion: "El rey del hierro", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/pelea/tekken-5.webp" },
  { id: 25, titulo: "Mortal Kombat Shaolin Monks", consola: "ps2", genero: "Pelea", precio: 2000, estado: "Disponible", featured: false, descripcion: "Aventura brutal", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/pelea/mk-shaolin.webp" },

  // AVENTURA / RPG
  { id: 26, titulo: "Metal Gear Solid 3 Snake Eater", consola: "ps2", genero: "Sigilo", precio: 2500, estado: "Destacado", featured: true, descripcion: "La jungla te espera", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/sigilo/mgs3.webp" },
  { id: 27, titulo: "Kingdom Hearts 2", consola: "ps2", genero: "RPG", precio: 2000, estado: "Disponible", featured: false, descripcion: "Disney + Final Fantasy", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/rpg/kingdom-hearts-2.webp" },
  { id: 28, titulo: "Final Fantasy X", consola: "ps2", genero: "RPG", precio: 2500, estado: "Disponible", featured: true, descripcion: "RPG legendario", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/rpg/ffx.webp" },
  { id: 29, titulo: "Persona 4", consola: "ps2", genero: "RPG", precio: 2000, estado: "Disponible", featured: false, descripcion: "Joya oculta", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/rpg/persona-4.webp" },

  // SHOOTER / OTROS
  { id: 30, titulo: "Black", consola: "ps2", genero: "Shooter", precio: 2000, estado: "Disponible", featured: false, descripcion: "Acción explosiva", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/shooter/black.webp" },
  { id: 31, titulo: "Guitar Hero 2", consola: "ps2", genero: "Musical", precio: 2000, estado: "Disponible", featured: false, descripcion: "Rockea sin parar", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg", imgLocal: "img/ps2/musical/guitar-hero-2.webp" },
  { id: 32, titulo: "Def Jam Fight for NY", consola: "ps2", genero: "Pelea", precio: 2000, estado: "Disponible", featured: false, descripcion: "Pelea callejera", img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", imgLocal: "img/ps2/pelea/def-jam.webp" },
];
