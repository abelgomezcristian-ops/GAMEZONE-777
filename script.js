const WHATSAPP_NUMBER = "5493795118415"; // CAMBIA ESTO por tu numero real

// === DATOS DE JUEGOS - VOS PODES EDITAR NOMBRES Y PRECIOS ACA ===
const juegos = [
  {id:1, titulo:"GTA San Andreas", consola:"ps2", precio:8000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbw.jpg", oferta:true},
  {id:2, titulo:"God of War II", consola:"ps2", precio:9000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1u6o.jpg", oferta:true},
  {id:3, titulo:"Resident Evil 4", consola:"ps2", precio:7500, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur5.jpg"},
  {id:4, titulo:"PES 2013", consola:"ps2", precio:6000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2wzn.jpg"},
  {id:5, titulo:"The Last of Us", consola:"ps3", precio:15000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.jpg", oferta:true},
  {id:6, titulo:"GTA V", consola:"ps3", precio:16000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbw.jpg"},
  {id:7, titulo:"God of War 3", consola:"ps3", precio:14000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1tq4.jpg"},
  {id:8, titulo:"FIFA 19", consola:"ps3", precio:10000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur6.jpg"},
  {id:9, titulo:"Mario Odyssey", consola:"switch", precio:35000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur8.jpg", oferta:true},
  {id:10, titulo:"Zelda Breath of the Wild", consola:"switch", precio:38000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg"},
  {id:11, titulo:"Mario Kart 8", consola:"switch", precio:32000, img:"https://images.igdb.com/igdb/image/upload/t_cover_big/co1ur7.jpg"},
];

const combos = [
  {id:101, titulo:"Combo PS2 x3", precio:20000, incluye:"3 juegos a elección PS2"},
  {id:102, titulo:"Combo PS3 x2", precio:25000, incluye:"2 juegos a elección PS3"},
  {id:103, titulo:"Combo Switch Starter", precio:60000, incluye:"2 juegos Switch + funda"},
];

// === ELEMENTOS ===
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const wspFloat = document.getElementById('whatsapp-float');
const wspFooter = document.getElementById('footer-wsp');
const searchInput = document.getElementById('search');
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const btnCart = document.getElementById('btn-cart');
const btnCheckout = document.getElementById('btn-checkout');

let carrito = JSON.parse(localStorage.getItem('gz_cart')||'[]');

// === MENU ===
if(toggle){ toggle.addEventListener('click', ()=>{ nav.classList.toggle('active'); toggle.textContent = nav.classList.contains('active') ? '✕' : '☰'; }); }
document.querySelectorAll('#nav a').forEach(a=> a.addEventListener('click', ()=>{ nav.classList.remove('active'); if(toggle) toggle.textContent='☰'; }));

window.addEventListener('scroll', ()=>{
  if(window.scrollY>50){ header.style.background='rgba(6,8,15,0.96)'; } else { header.style.background='rgba(6,8,15,0.85)'; }
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); window.scrollTo({top:t.offsetTop-70, behavior:'smooth'}); }
  });
});
document.querySelectorAll('.consola-card').forEach(b=>{
  b.addEventListener('click', ()=>{
    if(b.classList.contains('bloqueado')){ const s=document.getElementById('proximamente'); if(s) window.scrollTo({top:s.offsetTop-70, behavior:'smooth'}); return; }
    const c=b.dataset.console; const tt=document.getElementById(c); if(tt) window.scrollTo({top:tt.offsetTop-70, behavior:'smooth'});
  });
});

// === FUNCION CREAR TARJETA ===
function crearCard(j){
  return `<div class="game-card" data-title="${j.titulo.toLowerCase()}">
    <img src="${j.img}" alt="${j.titulo}" loading="lazy">
    <div class="game-info">
      <h3 style="font-size:14px;margin-bottom:6px">${j.titulo}</h3>
      <p style="color:var(--gray);font-size:11px;letter-spacing:1px">${j.consola.toUpperCase()} ${j.oferta?'• OFERTA':''}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <span style="font-weight:800;color:var(--blue-elec-2)">$${j.precio.toLocaleString('es-AR')}</span>
        <button class="btn btn-primary" style="padding:8px 14px;font-size:10px" onclick="agregarCarrito(${j.id})">AGREGAR</button>
      </div>
    </div>
  </div>`;
}
function renderCatalogo(filtro=""){
  const grids = {ps2:document.getElementById('ps2-grid'), ps3:document.getElementById('ps3-grid'), switch:document.getElementById('switch-grid'), ofertas:document.getElementById('ofertas-grid')};
  Object.values(grids).forEach(g=>{ if(g) g.innerHTML=""; });
  juegos.filter(j=> j.titulo.toLowerCase().includes(filtro.toLowerCase())).forEach(j=>{
    if(grids[j.consola]) grids[j.consola].innerHTML += crearCard(j);
    if(j.oferta && grids.ofertas) grids.ofertas.innerHTML += crearCard(j);
  });
  // combos
  const comboGrid = document.getElementById('combos-grid');
  if(comboGrid){
    comboGrid.innerHTML = combos.map(c=> `<div class="combo-card">
      <h3>${c.titulo}</h3><p style="font-size:12px;color:var(--gray);margin:8px 0">${c.incluye}</p>
      <span style="color:var(--blue-elec-2)">$${c.precio.toLocaleString('es-AR')}</span>
      <button class="btn btn-primary" style="margin-top:12px;width:100%" onclick="agregarCombo(${c.id})">AGREGAR COMBO</button>
    </div>`).join('');
  }
}

// === CARRITO ===
window.agregarCarrito = (id)=>{
  const j = juegos.find(x=>x.id===id);
  carrito.push(j);
  guardarCarrito();
  abrirCarrito();
};
window.agregarCombo = (id)=>{
  const c = combos.find(x=>x.id===id);
  carrito.push({...c, titulo:c.titulo, esCombo:true});
  guardarCarrito();
  abrirCarrito();
};
function guardarCarrito(){
  localStorage.setItem('gz_cart', JSON.stringify(carrito));
  if(cartCountEl) cartCountEl.textContent = carrito.length;
  renderCarrito();
}
function renderCarrito(){
  if(!cartItemsEl) return;
  if(carrito.length===0){ cartItemsEl.innerHTML='<p style="color:var(--gray)">Carrito vacío</p>'; cartTotalEl.textContent='$0'; return; }
  cartItemsEl.innerHTML = carrito.map((it,i)=> `<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:13px">
    <span>${it.titulo}</span><span>$${it.precio.toLocaleString('es-AR')} <button onclick="quitar(${i})" style="background:none;border:none;color:var(--gray);cursor:pointer">✕</button></span>
  </div>`).join('');
  const total = carrito.reduce((s,i)=>s+i.precio,0);
  cartTotalEl.textContent = '$'+total.toLocaleString('es-AR');
}
window.quitar = (i)=>{ carrito.splice(i,1); guardarCarrito(); };
function abrirCarrito(){ if(cartModal) cartModal.style.display='block'; }
function cerrarCarrito(){ if(cartModal) cartModal.style.display='none'; }
if(btnCart) btnCart.addEventListener('click', abrirCarrito);
document.querySelectorAll('[data-close-cart]').forEach(b=> b.addEventListener('click', cerrarCarrito));

// CHECKOUT WHATSAPP
if(btnCheckout){
  btnCheckout.addEventListener('click', ()=>{
    if(carrito.length===0) return;
    let texto = 'Hola GAMEZONE 777! Quiero estos juegos:%0A';
    carrito.forEach(it=>{ texto += `- ${it.titulo} $${it.precio}%0A`; });
    const total = carrito.reduce((s,i)=>s+i.precio,0);
    texto += `%0ATotal: $${total}%0A`;
    texto += `%0AMi nombre es: `;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
    window.open(url,'_blank');
  });
}

// BUSCADOR
if(searchInput){ searchInput.addEventListener('input', (e)=> renderCatalogo(e.target.value)); }

// WHATSAPP LINKS
const wspLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20GAMEZONE!%20Quiero%20consultar`;
if(wspFloat) wspFloat.href = wspLink;
if(wspFooter) wspFooter.textContent = WHATSAPP_NUMBER;

// GSAP
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-title',{y:80,opacity:0,duration:1.2,ease:'power3.out',delay:0.2});
  gsap.from('.hero-subtitle',{y:40,opacity:0,duration:1,ease:'power3.out',delay:0.5});
  gsap.from('.hero-buttons',{y:30,opacity:0,duration:1,ease:'power3.out',delay:0.7});
}

renderCatalogo();
guardarCarrito();
