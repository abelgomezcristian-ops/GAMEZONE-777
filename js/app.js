window.GZ_JUEGOS = window.GZ_JUEGOS || [];
let filtro = { consola: null, texto: '', genero: 'todos' };
let mostrando = 24;

function esc(t){ const d=document.createElement('div'); d.textContent=t; return d.innerHTML; }

function renderCatalogo(){
  const cont=document.getElementById('catalogo');
  const conteo=document.getElementById('conteo');
  if(!cont) return;
  let lista=window.GZ_JUEGOS.filter(j=>{
    if(filtro.consola && j.consola!==filtro.consola) return false;
    if(filtro.genero!=='todos' && j.genero!==filtro.genero) return false;
    if(filtro.texto && !j.titulo.toLowerCase().includes(filtro.texto.toLowerCase())) return false;
    return true;
  });
  if(conteo) conteo.textContent=lista.length+' juegos';
  const visible=lista.slice(0,mostrando);
  cont.innerHTML='';
  visible.forEach(j=>{
    const card=document.createElement('div');
    card.className='game-card';
    const imgSrc=j.img||j.imgLocal||'';
    const fallback=j.imgLocal||j.img||'';
    card.innerHTML=`
      <img src="${esc(imgSrc)}" onerror="this.onerror=null;this.src='${esc(fallback)}'" alt="${esc(j.titulo)}" loading="lazy">
      <h3>${esc(j.titulo)}</h3>
      <p>${esc(j.consola)} - ${esc(j.genero)}</p>
      <div>$${Number(j.precio||0).toLocaleString()}</div>
    `;
    const btn=document.createElement('button');
    btn.textContent='Agregar';
    btn.onclick=()=>GZ_STORE.addCart(j.id);
    card.appendChild(btn);
    cont.appendChild(card);
  });
}
function cargarMas(){ mostrando+=(GZ_CONFIG.cargaInicial||24); renderCatalogo(); }
document.addEventListener('DOMContentLoaded',()=>{
  const b=document.getElementById('buscador'); if(b) b.addEventListener('input',e=>{filtro.texto=e.target.value; renderCatalogo();});
  const btn=document.getElementById('btnCargarMas'); if(btn) btn.addEventListener('click',cargarMas);
});
