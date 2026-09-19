// CONFIGURACION TUYA
const WHATSAPP_NUMBER = "5493794000000"; // Cambialo por tu numero con codigo pais, ej 549...

const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const wspFloat = document.getElementById('whatsapp-float');
const wspFooter = document.getElementById('footer-wsp');

// MENU CELULAR
if(toggle && nav){
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });
}

// CERRAR MENU AL TOCAR LINK
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    toggle.textContent = '☰';
  });
});

// HEADER SE ACHICA AL HACER SCROLL
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    header.style.background = 'rgba(6,8,15,0.96)';
    header.style.borderBottomColor = 'rgba(45,91,255,0.3)';
  } else {
    header.style.background = 'rgba(6,8,15,0.85)';
  }
});

// SCROLL SUAVE A SECCIONES
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if(id === '#') return;
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      window.scrollTo({top: target.offsetTop - 70, behavior: 'smooth'});
    }
  });
});

// BOTONES CONSOLAS -> SCROLL
document.querySelectorAll('.consola-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const c = btn.dataset.console;
    if(btn.classList.contains('bloqueado')){
      const sec = document.getElementById('proximamente');
      if(sec) window.scrollTo({top: sec.offsetTop - 70, behavior:'smooth'});
      return;
    }
    const target = document.getElementById(c);
    if(target) window.scrollTo({top: target.offsetTop - 70, behavior:'smooth'});
  });
});

// WHATSAPP
const wspLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20GAMEZONE!%20Quiero%20consultar%20por%20un%20juego`;
if(wspFloat) wspFloat.href = wspLink;
if(wspFooter) wspFooter.textContent = WHATSAPP_NUMBER;

// ANIMACIONES GSAP HERO
if(window.gsap){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-title', {y:80, opacity:0, duration:1.2, ease:'power3.out', delay:0.2});
  gsap.from('.hero-subtitle', {y:40, opacity:0, duration:1, ease:'power3.out', delay:0.5});
  gsap.from('.hero-buttons', {y:30, opacity:0, duration:1, ease:'power3.out', delay:0.7});
  gsap.from('.consolas-grid .consola-card', {
    scrollTrigger:{trigger:'#consolas', start:'top 80%'},
    y:40, opacity:0, duration:0.6, stagger:0.1, ease:'power3.out'
  });
}

console.log('GAMEZONE listo - Paso 5 ok');
