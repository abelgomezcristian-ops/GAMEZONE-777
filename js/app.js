// Puntos 9,10,11,6,7,5
let GZ_JUEGOS = []; // se llena desde data/
let filtroActual = { texto:'', consola:'todos', genero:'todos', estado:'todos', orden:'az' };
let mostrando = GZ_CONFIG.cargaInicial;

function renderCatalogo(){
  let lista = [...GZ_JUEGOS];
  if(filtroActual.consola!=='todos') lista = lista.filter(j=>j.consola===filtroActual.consola);
  if(filtroActual.genero!=='todos') lista = lista.filter(j=>j.genero===filtroActual.genero);
  if(filtroActual.estado!=='todos') lista = lista.filter(j=>j.estado===filtroActual.estado);
  if(filtroActual.texto) lista = lista.filter(j=>j.titulo.toLowerCase().includes(filtroActual.texto) || j.genero.toLowerCase().includes(filtroActual.texto));
  // orden
  if(filtroActual.orden==='az') lista.sort((a,b)=>a.titulo.localeCompare(b.titulo));
  if(filtroActual.orden==='precio-menor') lista.sort((a,b)=>a.precio-b.precio);

  const total = lista.length;
  const visible = lista.slice(0, mostrando);
  
  const cont = document.getElementById('catalogo');
  if(!cont) return;
  cont.innerHTML = visible.map(j=>{
    const precioAnterior = j.precioAnterior ? `<span style="text-decoration:line-through;color:#5a6a9a;font-size:11px">$${j.precioAnterior}</span>` : '';
    const descuento = j.descuento ? `<span style="background:#ff3b30;color:#fff;padding:2px 6px;border-radius:6px;font-size:10px">-${j.descuento}%</span>` : '';
    const estadoIcon = {disponible:'🟢',oferta:'🔥',destacado:'⭐',proximamente:'🚀'}[j.estado] || '🟢';
    const imgPath = j.imgLocal || `img/${j.consola}/${j.genero}/${j.slug}.webp`;
    return `<div class="card">
      <div style="position:relative"><img src="${imgPath}" alt="${j.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/121a36/5a6a9a?text=${encodeURIComponent(j.titulo)}'"><span style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,.7);padding:3px 8px;border-radius:10px;font-size:11px">${estadoIcon} ${j.estado.toUpperCase()}</span><span style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);padding:3px 8px;border-radius:10px;cursor:pointer" onclick="GZ_STORE.toggleFav(${j.id});this.textContent=GZ_STORE.getFav().includes(${j.id})?'❤️':'🤍'">${GZ_STORE.getFav().includes(j.id)?'❤️':'🤍'}</span></div>
      <div class="card-body"><h3>${j.titulo}</h3><p>${j.consola.toUpperCase()} • ${j.genero}</p><div style="display:flex;gap:6px;align-items:center;margin:6px 0">${precioAnterior}<span class="precio">$${j.precio.toLocaleString()}</span>${descuento}</div><div class="btns"><button class="btn btn-add" onclick="GZ_STORE.addCart(GZ_JUEGOS.find(x=>x.id===${j.id}))">AGREGAR</button><a class="btn btn-wa" href="https://wa.me/${GZ_CONFIG.whatsapp}?text=Hola%20GameZone%20quiero%20${encodeURIComponent(j.titulo)}" target="_blank">WA</a></div></div>
    </div>`;
  }).join('');

  document.getElementById('conteo').textContent = `${visible.length} de ${total} juegos`;
  document.getElementById('btnCargarMas').style.display = visible.length < total ? 'block' : 'none';
}

function cargarMas(){ mostrando += GZ_CONFIG.cargaInicial; renderCatalogo(); }

// Listeners globales
document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById('q'); if(input) input.addEventListener('input', e=>{ filtroActual.texto=e.target.value.toLowerCase().trim(); mostrando=GZ_CONFIG.cargaInicial; renderCatalogo(); });
});
