const GZ_STORE = {
  // ahora guardamos solo IDs, no objetos con precio
  getCart: () => JSON.parse(localStorage.getItem('gz_cart')||'[]'),
  addCart: (id) => {
    const c=JSON.parse(localStorage.getItem('gz_cart')||'[]');
    if(!c.includes(id)) c.push(id);
    localStorage.setItem('gz_cart', JSON.stringify(c));
    const juego=(window.GZ_JUEGOS||[]).find(x=>x.id===id);
    alert((juego?juego.titulo:'Juego')+' agregado');
  },
  getCartFull: () => {
    const ids=GZ_STORE.getCart();
    return ids.map(id=> (window.GZ_JUEGOS||[]).find(j=>j.id===id) ).filter(Boolean);
  },
  getFav: () => JSON.parse(localStorage.getItem('gz_fav')||'[]'),
  toggleFav: (id) => {
    let f=JSON.parse(localStorage.getItem('gz_fav')||'[]');
    f=f.includes(id)?f.filter(x=>x!==id):[...f,id];
    localStorage.setItem('gz_fav', JSON.stringify(f));
    return f.includes(id);
  }
};
