// Puntos 13 y 14
const GZ_STORE = {
  getCart: () => JSON.parse(localStorage.getItem('gz_cart')||'[]'),
  addCart: (juego) => { let c=GZ_STORE.getCart(); c.push({...juego, qty:1}); localStorage.setItem('gz_cart', JSON.stringify(c)); alert(juego.titulo+' agregado'); },
  getFav: () => JSON.parse(localStorage.getItem('gz_fav')||'[]'),
  toggleFav: (id) => { let f=GZ_STORE.getFav(); f=f.includes(id)?f.filter(x=>x!==id):[...f,id]; localStorage.setItem('gz_fav', JSON.stringify(f)); return f.includes(id); },
  sendWhatsApp: (texto) => { window.open(`https://wa.me/${GZ_CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`,'_blank'); }
};
