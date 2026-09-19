const GZ_STORE = {
  getCart: () => JSON.parse(localStorage.getItem('gz_cart')||'[]'),
  addCart: (j) => { const c=JSON.parse(localStorage.getItem('gz_cart')||'[]'); c.push(j); localStorage.setItem('gz_cart', JSON.stringify(c)); alert(j.titulo+' agregado'); },
  getFav: () => JSON.parse(localStorage.getItem('gz_fav')||'[]'),
  toggleFav: (id) => { let f=JSON.parse(localStorage.getItem('gz_fav')||'[]'); f=f.includes(id)?f.filter(x=>x!==id):[...f,id]; localStorage.setItem('gz_fav', JSON.stringify(f)); return f.includes(id); }
};
