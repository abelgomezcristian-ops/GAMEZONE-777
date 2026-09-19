window.GZ_JUEGOS = window.GZ_JUEGOS || [];
let filtro = { consola: null, texto: '', genero: 'todos' };
let mostrando = 24;
function renderCatalogo(){
  const cont=document.getElementById('catalogo'); const conteo=document.getElementById('conteo');
  if(!cont) return;
  let lista=window.GZ_JUEGOS.filter(j=>{ if(filtro.consola&&j.consola!==filtro.consola) return false; return true; });
  if(conteo) conteo.textContent=lista.length+' juegos';
  const visible=lista.slice(0,mostrando);
  cont.innerHTML=visible.map(j=>`<div class="game-card"><img src="${j.img||j.imagen}" alt="${j.titulo}"><h3>${j.titulo}</h3><p>${j.consola}</p><div>$${j.precio}</div><button onclick="GZ_STORE.addCart(GZ_JUEGOS.find(x=>x.id===${j.id}))">Agregar</button></div>`).join('');
}
function cargarMas(){ mostrando+=24; renderCatalogo(); }
