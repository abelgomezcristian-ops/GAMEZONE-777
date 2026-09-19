const GZ_STORE = {
  getCart:()=>JSON.parse(localStorage.getItem('gz_cart')||'[]'),
  addCart:(j)=>{let c=GZ_STORE.getCart();c.push(j);localStorage.setItem('gz_cart',JSON.stringify(c));alert(j.titulo+' agregado al carrito');},
  getFav:()=>JSON.parse(localStorage.getItem('gz_fav')||'[]'),
  toggleFav:(id)=>{let f=GZ_STORE.getFav();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];localStorage.setItem('gz_fav',JSON.stringify(f));return f.includes(id);}
};
