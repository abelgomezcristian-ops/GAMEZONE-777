let GZ_JUEGOS=[]; let filtro={texto:'',consola:'todos',genero:'todos',estado:'todos',orden:'az'}; let mostrando=GZ_CONFIG.cargaInicial;
function renderCatalogo(){
  let lista=[...GZ_JUEGOS];
  if(filtro.consola!=='todos') lista=lista.filter(j=>j.consola===filtro.consola);
  if(filtro.genero!=='todos') lista=lista.filter(j=>j.genero.toLowerCase().includes(filtro.genero));
  if(filtro.estado!=='todos') lista=lista.filter(j=>j.estado.toLowerCase()===filtro.estado);
  if(filtro.texto) lista=lista.filter(j=>j.titulo.toLowerCase().includes(filtro.texto));
  if(filtro.orden==='az') lista.sort((a,b)=>a.titulo.localeCompare(b.titulo));
  const total=lista.length; const visible=lista.slice(0,mostrando);
  const cont=document.getElementById('catalogo'); if(!cont) return;
  cont.innerHTML=visible.map(j=>{
    const icon={disponible:'🟢',oferta:'🔥',destacado:'⭐',proximamente:'🚀'}[j.estado.toLowerCase()]||'🟢';
    const fav=GZ_STORE.getFav().includes(j.id)?'❤️':'🤍';
    return `<div class="card"><div style="position:relative"><img src="${j.imgLocal}" loading="lazy" onerror="this.onerror=null;this.src='${j.img}'" style="width:100%;height:200px;object-fit:cover"><span style="position:absolute;top:8px;left:8px;background:rgba(0,0,0,.7);padding:3px 8px;border-radius:10px;font-size:11px">${icon} ${j.estado.toUpperCase()}</span><span onclick="GZ_STORE.toggleFav(${j.id});renderCatalogo()" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);padding:3px 8px;border-radius:10px;cursor:pointer">${fav}</span></div><div class="card-body"><h3>${j.titulo}</h3><p>${j.consola.toUpperCase()} • ${j.genero}</p><div class="precio">$${j.precio.toLocaleString()}</div><div style="display:flex;gap:6px"><button onclick="GZ_STORE.addCart(GZ_JUEGOS.find(x=>x.id===${j.id}))" style="flex:1;background:#00e5ff;border:none;padding:8px;border-radius:20px;font-weight:bold;cursor:pointer">AGREGAR</button><a href="https://wa.me/${GZ_CONFIG.whatsapp}?text=Hola%20GameZone%20quiero%20${encodeURIComponent(j.titulo)}" target="_blank" style="flex:1;background:#25D366;color:#000;text-align:center;padding:8px;border-radius:20px;text-decoration:none;font-weight:bold">WA</a></div></div></div>`;
  }).join('');
  document.getElementById('conteo').textContent=`${visible.length} de ${total} juegos`; document.getElementById('btnCargarMas').style.display=visible.length<total?'block':'none';
}
function cargarMas(){mostrando+=GZ_CONFIG.cargaInicial;renderCatalogo();}
