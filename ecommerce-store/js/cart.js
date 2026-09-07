/**
 * LUXEMART — cart.js
 * Cart and wishlist state, persisted to localStorage. Exposes a small
 * API (window.Cart) used by products.js (add to cart / wishlist toggle
 * buttons on every product card), app.js (badge counts on every page),
 * and this file's own cart-page renderer + checkout.js (order summary).
 */

const CART_KEY = 'luxemart_cart';
const WISHLIST_KEY = 'luxemart_wishlist';
const PROMO_KEY = 'luxemart_promo';

const VALID_PROMOS = {
  LUXE10: 0.10,
  WELCOME5: 0.05,
};

const FREE_SHIPPING_THRESHOLD = 100000;
const FLAT_SHIPPING_FEE = 2500;
const TAX_RATE = 0.075; // 7.5% VAT

// ---------- Storage helpers ----------
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

// ---------- Cart actions ----------
function addToCart(id, qty = 1) {
  const product = window.ProductsAPI ? window.ProductsAPI.getProductById(id) : null;
  if (!product || product.stock === 0) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 99, product.stock);
  } else {
    cart.push({ id, qty: Math.min(qty, product.stock) });
  }
  saveCart(cart);
  updateCartBadge();
  if (window.showToast) window.showToast(`${product.name} added to cart`);
  if (typeof window.renderCartPageIfPresent === 'function') window.renderCartPageIfPresent();
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  updateCartBadge();
  if (typeof window.renderCartPageIfPresent === 'function') window.renderCartPageIfPresent();
}

function updateQuantity(id, qty) {
  const product = window.ProductsAPI ? window.ProductsAPI.getProductById(id) : null;
  const maxQty = product ? Math.min(99, product.stock) : 99;
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(qty, maxQty));
  saveCart(cart);
  updateCartBadge();
  if (typeof window.renderCartPageIfPresent === 'function') window.renderCartPageIfPresent();
}

function clearCart() {
  saveCart([]);
  localStorage.removeItem(PROMO_KEY);
  updateCartBadge();
}

function getCartItemsWithDetails() {
  const cart = getCart();
  if (!window.ProductsAPI) return [];
  return cart
    .map((item) => {
      const product = window.ProductsAPI.getProductById(item.id);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartSubtotal() {
  return getCartItemsWithDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

function getAppliedPromo() {
  return localStorage.getItem(PROMO_KEY) || null;
}

function applyPromoCode(code) {
  const normalized = code.trim().toUpperCase();
  if (VALID_PROMOS[normalized]) {
    localStorage.setItem(PROMO_KEY, normalized);
    return { success: true, discountRate: VALID_PROMOS[normalized] };
  }
  return { success: false };
}

function removePromoCode() {
  localStorage.removeItem(PROMO_KEY);
}

function calculateOrderTotals() {
  const subtotal = getCartSubtotal();
  const promo = getAppliedPromo();
  const discountRate = promo && VALID_PROMOS[promo] ? VALID_PROMOS[promo] : 0;
  const discount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discount;
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  return { subtotal, discount, discountRate, shipping, tax, total };
}

// ---------- Wishlist actions ----------
function isInWishlist(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id, btnEl) {
  let list = getWishlist();
  const product = window.ProductsAPI ? window.ProductsAPI.getProductById(id) : null;
  const isActive = list.includes(id);

  if (isActive) {
    list = list.filter((itemId) => itemId !== id);
  } else {
    list.push(id);
  }
  saveWishlist(list);
  updateWishlistBadge();

  if (btnEl) {
    btnEl.classList.toggle('active', !isActive);
    btnEl.innerHTML = window.Icons.heart(!isActive);
  }
  if (window.showToast && product) {
    window.showToast(isActive ? `Removed ${product.name} from wishlist` : `${product.name} added to wishlist`);
  }
}

// ---------- Badges ----------
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 320);
  });
}

function updateWishlistBadge() {
  const count = getWishlist().length;
  document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

window.Cart = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartItemsWithDetails,
  getCartCount,
  getCartSubtotal,
  getAppliedPromo,
  applyPromoCode,
  removePromoCode,
  calculateOrderTotals,
  isInWishlist,
  toggleWishlist,
  getWishlist,
  updateCartBadge,
  updateWishlistBadge,
  FREE_SHIPPING_THRESHOLD,
};

// =========================================================
// Cart page rendering (only runs when the cart page markup exists)
// =========================================================
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  const items = getCartItemsWithDetails();
  const summaryContainer = document.getElementById('cart-summary');

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-state">
        ${Icons.cart()}
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    if (summaryContainer) summaryContainer.style.display = 'none';
    return;
  }

  if (summaryContainer) summaryContainer.style.display = '';

  container.innerHTML = items.map((item) => {
    const bgImage = ['assets/images/product-1.jpg', 'assets/images/product-2.jpg', 'assets/images/product-3.jpg', 'assets/images/product-4.jpg'][item.id % 4];
    return `
    <div class="cart-item" data-cart-item="${item.id}">
      <div class="cart-item-media" style="background-image:url('${bgImage}');background-size:cover;background-position:center;">
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.9);background:linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.45));">
          ${Icons[item.icon] ? Icons[item.icon]() : Icons.bag()}
        </div>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.category}</p>
        <button class="cart-item-remove" data-remove-id="${item.id}">Remove</button>
      </div>
      <div class="qty-selector" data-qty-for="${item.id}">
        <button type="button" data-qty-decrease>&minus;</button>
        <input type="number" value="${item.qty}" min="1" max="${item.stock}" readonly>
        <button type="button" data-qty-increase>+</button>
      </div>
      <div class="cart-item-price">${formatCurrency(item.lineTotal)}</div>
    </div>`;
  }).join('');

  container.querySelectorAll('[data-remove-id]').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(Number(btn.dataset.removeId)));
  });
  container.querySelectorAll('[data-qty-for]').forEach((wrap) => {
    const id = Number(wrap.dataset.qtyFor);
    const item = items.find((i) => i.id === id);
    wrap.querySelector('[data-qty-decrease]').addEventListener('click', () => updateQuantity(id, item.qty - 1));
    wrap.querySelector('[data-qty-increase]').addEventListener('click', () => updateQuantity(id, item.qty + 1));
  });

  renderCartSummary();
}

function renderCartSummary() {
  const totals = calculateOrderTotals();
  const el = (id) => document.getElementById(id);

  if (el('summary-subtotal')) el('summary-subtotal').textContent = formatCurrency(totals.subtotal);
  if (el('summary-shipping')) el('summary-shipping').textContent = totals.shipping === 0 ? 'Free' : formatCurrency(totals.shipping);
  if (el('summary-tax')) el('summary-tax').textContent = formatCurrency(Math.round(totals.tax));
  if (el('summary-total')) el('summary-total').textContent = formatCurrency(Math.round(totals.total));

  const discountRow = el('summary-discount-row');
  if (discountRow) {
    if (totals.discount > 0) {
      discountRow.style.display = 'flex';
      el('summary-discount').textContent = `\u2212${formatCurrency(Math.round(totals.discount))}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  const promo = getAppliedPromo();
  const promoStatus = el('promo-status');
  if (promoStatus) {
    promoStatus.textContent = promo ? `Code "${promo}" applied` : '';
    promoStatus.style.display = promo ? 'block' : 'none';
  }
}

function initPromoForm() {
  const form = document.getElementById('promo-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const result = applyPromoCode(input.value);
    if (result.success) {
      showToast(`Promo code applied \u2014 ${Math.round(result.discountRate * 100)}% off`);
      input.value = '';
      renderCartSummary();
    } else {
      showToast('Invalid promo code', 'error');
    }
  });
}

window.renderCartPageIfPresent = renderCartPage;

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
  initPromoForm();
});
