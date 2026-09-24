const GZ_STORE = {
  // Acepta el formato anterior (array de IDs) y lo migra al formato con cantidades.
  getCart: () => {
    try {
      const raw = JSON.parse(localStorage.getItem('gz_cart') || '[]');
      if (!Array.isArray(raw)) return [];
      return raw.reduce((items, entry) => {
        const id = typeof entry === 'object' ? Number(entry.id) : Number(entry);
        const quantity = typeof entry === 'object' ? Math.max(1, Number(entry.quantity) || 1) : 1;
        if (!Number.isFinite(id)) return items;
        const existing = items.find((item) => item.id === id);
        if (existing) existing.quantity += quantity;
        else items.push({ id, quantity });
        return items;
      }, []);
    } catch { return []; }
  },
  saveCart: (items) => { try { localStorage.setItem('gz_cart', JSON.stringify(items)); } catch { /* storage unavailable: keep current UI usable */ } },
  addCart: (id) => {
    const cart = GZ_STORE.getCart();
    const item = cart.find((entry) => entry.id === id);
    if (item) item.quantity += 1;
    else cart.push({ id, quantity: 1 });
    GZ_STORE.saveCart(cart);
    return GZ_STORE.getCart();
  },
  updateQuantity: (id, quantity) => {
    const cart = GZ_STORE.getCart();
    const item = cart.find((entry) => entry.id === id);
    if (!item) return cart;
    if (quantity <= 0) return GZ_STORE.removeCart(id);
    item.quantity = quantity;
    GZ_STORE.saveCart(cart);
    return cart;
  },
  removeCart: (id) => {
    const cart = GZ_STORE.getCart().filter((entry) => entry.id !== id);
    GZ_STORE.saveCart(cart);
    return cart;
  },
  clearCart: () => { try { localStorage.removeItem('gz_cart'); } catch {} },
  getCount: () => GZ_STORE.getCart().reduce((total, item) => total + item.quantity, 0),
  getCartFull: () => {
    return GZ_STORE.getCart().map((item) => {
      const juego = (window.GZ_JUEGOS || []).find((j) => j.id === item.id);
      return juego ? { ...juego, quantity: item.quantity } : null;
    }).filter(Boolean);
  },
  getFav: () => {
    try {
      const value = JSON.parse(localStorage.getItem('gz_fav') || '[]');
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  },
  toggleFav: (id) => {
    const current = GZ_STORE.getFav();
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try { localStorage.setItem('gz_fav', JSON.stringify(next)); } catch { /* favoritos opcionales */ }
    return next.includes(id);
  }
};
