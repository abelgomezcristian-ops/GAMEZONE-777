document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('listaCarrito'); if (!list) return;
  const totalElement = document.getElementById('totalCarrito'); const countElement = document.getElementById('conteoCarrito');
  const render = () => {
    const games = GZ_STORE.getCartFull(); const count = GZ_STORE.getCount(); countElement.textContent = `${count} ${count === 1 ? 'producto' : 'productos'}`;
    if (!games.length) { list.innerHTML = '<div class="empty-state">Tu carrito está vacío. Explorá el catálogo para encontrar tu próximo juego.</div>'; totalElement.innerHTML = 'Total: <strong>$0</strong>'; return; }
    let total = 0;
    list.innerHTML = games.map((game) => { const subtotal = Number(game.precio) * game.quantity; total += subtotal; return `<article class="cart-item"><img src="${GZ_UI.imageFor(game)}" alt="" onerror="this.onerror=null;this.src='${GZ_UI.fallbackCover(game)}'"><div class="cart-copy"><strong>${GZ_UI.escapeHtml(game.titulo)}</strong><span>${game.consola.toUpperCase()} · ${GZ_UI.escapeHtml(game.genero)}</span><b>${GZ_UI.formatPrice(game.precio)} c/u</b></div><div class="cart-actions"><div class="quantity-control"><button data-quantity="${game.id}" data-change="-1" aria-label="Quitar una unidad">−</button><span>${game.quantity}</span><button data-quantity="${game.id}" data-change="1" aria-label="Agregar una unidad">+</button></div><strong>${GZ_UI.formatPrice(subtotal)}</strong><button class="text-button" data-remove="${game.id}">Eliminar</button></div></article>`; }).join('');
    totalElement.innerHTML = `Total: <strong>${GZ_UI.formatPrice(total)}</strong>`;
    list.querySelectorAll('[data-quantity]').forEach((button) => button.addEventListener('click', () => { const item = GZ_STORE.getCart().find((entry) => entry.id === Number(button.dataset.quantity)); if (!item) return; GZ_STORE.updateQuantity(Number(button.dataset.quantity), item.quantity + Number(button.dataset.change)); render(); GZ_UI.updateCartBadges(); }));
    list.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => { GZ_STORE.removeCart(Number(button.dataset.remove)); render(); GZ_UI.updateCartBadges(); }));
  };
  document.getElementById('btnVaciar')?.addEventListener('click', () => { GZ_STORE.clearCart(); render(); GZ_UI.updateCartBadges(); });
  document.getElementById('btnWhatsapp')?.addEventListener('click', () => {
    const games = GZ_STORE.getCartFull();
    if (!games.length) return;
    let total = 0;
    const lines = games.map((game) => {
      const subtotal = Number(game.precio) * game.quantity;
      total += subtotal;
      return `- ${game.titulo} x${game.quantity}: ${GZ_UI.formatPrice(subtotal)}`;
    });
    const message = [
      'Hola GAMEZONE! Quiero consultar por:',
      lines.join('\n'),
      '',
      `Total: ${GZ_UI.formatPrice(total)}`,
      '',
      'Mi nombre es: '
    ].join('\n');
    window.open(`https://wa.me/${GZ_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
  render();
});
