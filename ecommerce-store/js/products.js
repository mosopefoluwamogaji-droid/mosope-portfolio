/**
 * LUXEMART — products.js
 * Product catalog data, card rendering, and the search / filter / sort
 * logic used on the Products listing page. Also exposes helpers used by
 * the Home page (featured/bestsellers) and Product Details page (related
 * products, lookup by id).
 */

const PRODUCTS = [
  // ---------------- Men ----------------
  { id: 1, name: 'Classic Oxford Shirt', category: 'Men', price: 18500, oldPrice: null, rating: 4.5, reviews: 128, stock: 24, badge: null, icon: 'shirt', popularity: 72, createdAt: '2026-04-10',
    description: 'A wardrobe staple, cut from breathable cotton poplin with a clean, tailored fit that works equally well at the office or out for the evening.',
    specs: { Material: '100% Cotton Poplin', Fit: 'Tailored', Care: 'Machine wash cold', Origin: 'Imported' } },
  { id: 2, name: 'Slim Fit Chinos', category: 'Men', price: 21000, oldPrice: null, rating: 4.3, reviews: 94, stock: 18, badge: null, icon: 'shirt', popularity: 65, createdAt: '2026-03-22',
    description: 'Everyday chinos with just enough stretch to move with you, finished with a modern slim taper.',
    specs: { Material: '98% Cotton, 2% Elastane', Fit: 'Slim', Care: 'Machine wash cold', Origin: 'Imported' } },
  { id: 3, name: 'Merino Wool Sweater', category: 'Men', price: 32000, oldPrice: 40000, rating: 4.7, reviews: 156, stock: 12, badge: 'sale', icon: 'shirt', popularity: 88, createdAt: '2026-02-14',
    description: 'Fine-gauge merino wool, soft against the skin and warm without the bulk — a cold-weather essential.',
    specs: { Material: '100% Merino Wool', Fit: 'Regular', Care: 'Dry clean recommended', Origin: 'Imported' } },
  { id: 4, name: 'Denim Jacket', category: 'Men', price: 28500, oldPrice: null, rating: 4.4, reviews: 61, stock: 15, badge: 'new', icon: 'shirt', popularity: 54, createdAt: '2026-08-02',
    description: 'A timeless denim jacket, stonewashed for a broken-in feel from the very first wear.',
    specs: { Material: '100% Cotton Denim', Fit: 'Regular', Care: 'Machine wash cold', Origin: 'Imported' } },

  // ---------------- Women ----------------
  { id: 5, name: 'Silk Wrap Dress', category: 'Women', price: 35000, oldPrice: null, rating: 4.8, reviews: 203, stock: 20, badge: 'bestseller', icon: 'bag', popularity: 96, createdAt: '2026-01-18',
    description: 'Fluid silk that drapes beautifully, with a flattering wrap silhouette suited to day or evening.',
    specs: { Material: '100% Mulberry Silk', Fit: 'Wrap / Adjustable', Care: 'Dry clean only', Origin: 'Imported' } },
  { id: 6, name: 'Tailored Blazer', category: 'Women', price: 42000, oldPrice: null, rating: 4.6, reviews: 87, stock: 14, badge: null, icon: 'bag', popularity: 79, createdAt: '2026-03-05',
    description: 'Structured shoulders and a nipped waist give this blazer a sharp, polished line over anything.',
    specs: { Material: 'Wool Blend', Fit: 'Tailored', Care: 'Dry clean only', Origin: 'Imported' } },
  { id: 7, name: 'Pleated Midi Skirt', category: 'Women', price: 24000, oldPrice: 30000, rating: 4.4, reviews: 66, stock: 22, badge: 'sale', icon: 'bag', popularity: 61, createdAt: '2026-05-12',
    description: 'Fine, permanent pleats that hold their shape and move beautifully with every step.',
    specs: { Material: 'Polyester Crepe', Fit: 'A-line', Care: 'Machine wash cold', Origin: 'Imported' } },
  { id: 8, name: 'Cashmere Scarf', category: 'Women', price: 19500, oldPrice: null, rating: 4.9, reviews: 112, stock: 30, badge: 'new', icon: 'bag', popularity: 83, createdAt: '2026-07-28',
    description: 'Feather-light cashmere, generously sized to wrap, drape, or layer.',
    specs: { Material: '100% Cashmere', Dimensions: '70cm x 190cm', Care: 'Dry clean only', Origin: 'Imported' } },

  // ---------------- Footwear ----------------
  { id: 9, name: 'Leather Chelsea Boots', category: 'Footwear', price: 45000, oldPrice: null, rating: 4.7, reviews: 178, stock: 16, badge: 'bestseller', icon: 'shoe', popularity: 91, createdAt: '2026-02-02',
    description: 'Full-grain leather Chelsea boots with an elastic side panel and a durable stacked heel.',
    specs: { Material: 'Full-Grain Leather', Sole: 'Rubber', Fit: 'True to size', Origin: 'Imported' } },
  { id: 10, name: 'Classic White Sneakers', category: 'Footwear', price: 32500, oldPrice: null, rating: 4.5, reviews: 145, stock: 28, badge: null, icon: 'shoe', popularity: 74, createdAt: '2026-04-19',
    description: 'A clean, minimal sneaker that pairs with nearly everything in your wardrobe.',
    specs: { Material: 'Leather Upper', Sole: 'Rubber', Fit: 'True to size', Origin: 'Imported' } },
  { id: 11, name: 'Suede Loafers', category: 'Footwear', price: 38000, oldPrice: 46000, rating: 4.3, reviews: 52, stock: 9, badge: 'sale', icon: 'shoe', popularity: 58, createdAt: '2026-03-30',
    description: 'Soft suede loafers with a relaxed, slip-on fit — smart-casual made easy.',
    specs: { Material: 'Suede', Sole: 'Leather', Fit: 'True to size', Origin: 'Imported' } },
  { id: 12, name: 'Running Trainers Pro', category: 'Footwear', price: 29900, oldPrice: null, rating: 4.6, reviews: 99, stock: 3, badge: 'new', icon: 'shoe', popularity: 69, createdAt: '2026-08-10',
    description: 'Responsive cushioning and a breathable knit upper, built for daily miles.',
    specs: { Material: 'Engineered Knit', Sole: 'EVA Foam', Fit: 'True to size', Origin: 'Imported' } },

  // ---------------- Electronics ----------------
  { id: 13, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 85000, oldPrice: null, rating: 4.8, reviews: 267, stock: 11, badge: 'bestseller', icon: 'headphones', popularity: 98, createdAt: '2026-01-25',
    description: 'Industry-leading noise cancellation with 30-hour battery life and studio-tuned sound.',
    specs: { Battery: 'Up to 30 hours', Connectivity: 'Bluetooth 5.3', Weight: '250g', Warranty: '1 Year' } },
  { id: 14, name: 'Smart Fitness Watch', category: 'Electronics', price: 68000, oldPrice: null, rating: 4.5, reviews: 189, stock: 19, badge: 'new', icon: 'watch', popularity: 85, createdAt: '2026-07-15',
    description: 'Track workouts, sleep, and heart rate with a battery that lasts up to 7 days.',
    specs: { Battery: 'Up to 7 days', 'Water Resistance': '5 ATM', Display: 'AMOLED', Warranty: '1 Year' } },
  { id: 15, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 42500, oldPrice: 52000, rating: 4.4, reviews: 134, stock: 0, badge: 'sale', icon: 'headphones', popularity: 70, createdAt: '2026-04-02',
    description: 'Room-filling sound in a compact, splash-proof body built for outdoor days.',
    specs: { Battery: 'Up to 14 hours', Connectivity: 'Bluetooth 5.2', 'Water Resistance': 'IPX6', Warranty: '1 Year' } },
  { id: 16, name: 'Compact Mirrorless Camera', category: 'Electronics', price: 210000, oldPrice: null, rating: 4.7, reviews: 58, stock: 6, badge: null, icon: 'camera', popularity: 77, createdAt: '2026-05-20',
    description: 'A pocketable mirrorless camera with a large sensor for genuinely sharp, low-light shots.',
    specs: { Sensor: '24.2MP APS-C', Video: '4K 30fps', Weight: '380g', Warranty: '1 Year' } },

  // ---------------- Accessories ----------------
  { id: 17, name: 'Leather Wallet', category: 'Accessories', price: 15500, oldPrice: null, rating: 4.6, reviews: 210, stock: 40, badge: null, icon: 'bag', popularity: 80, createdAt: '2026-03-11',
    description: 'A slim, full-grain leather wallet that ages beautifully with everyday use.',
    specs: { Material: 'Full-Grain Leather', Slots: '8 Card + 2 Pocket', Dimensions: '11cm x 9cm', Origin: 'Imported' } },
  { id: 18, name: 'Aviator Sunglasses', category: 'Accessories', price: 22000, oldPrice: 27000, rating: 4.5, reviews: 143, stock: 25, badge: 'sale', icon: 'watch', popularity: 73, createdAt: '2026-06-08',
    description: 'Classic aviator styling with polarised lenses for genuine glare protection.',
    specs: { Lens: 'Polarised', 'UV Protection': 'UV400', Frame: 'Metal Alloy', Origin: 'Imported' } },
  { id: 19, name: 'Minimalist Leather Belt', category: 'Accessories', price: 12500, oldPrice: null, rating: 4.3, reviews: 76, stock: 33, badge: null, icon: 'bag', popularity: 55, createdAt: '2026-02-27',
    description: 'A clean-lined leather belt with a solid brass buckle — built to outlast trends.',
    specs: { Material: 'Full-Grain Leather', Buckle: 'Solid Brass', Width: '3.5cm', Origin: 'Imported' } },
  { id: 20, name: 'Classic Analog Watch', category: 'Accessories', price: 58000, oldPrice: null, rating: 4.8, reviews: 165, stock: 8, badge: 'bestseller', icon: 'watch', popularity: 93, createdAt: '2026-01-09',
    description: 'A timeless analog watch with a sapphire crystal face and a genuine leather strap.',
    specs: { Movement: 'Japanese Quartz', 'Case Material': 'Stainless Steel', 'Water Resistance': '3 ATM', Warranty: '2 Years' } },

  // ---------------- Home & Living ----------------
  { id: 21, name: 'Scented Candle Set', category: 'Home & Living', price: 14000, oldPrice: null, rating: 4.7, reviews: 98, stock: 45, badge: 'new', icon: 'home', popularity: 67, createdAt: '2026-07-01',
    description: 'A set of three hand-poured soy candles in warm, layered scents for every room.',
    specs: { Material: 'Soy Wax', 'Burn Time': '40+ hours each', Count: '3 Candles', Scent: 'Amber, Cedar, Vanilla' } },
  { id: 22, name: 'Ceramic Dinnerware Set', category: 'Home & Living', price: 38500, oldPrice: null, rating: 4.5, reviews: 71, stock: 17, badge: null, icon: 'home', popularity: 62, createdAt: '2026-04-25',
    description: 'A 16-piece stoneware set with a soft matte glaze, dishwasher and microwave safe.',
    specs: { Material: 'Stoneware', Pieces: '16-Piece Set', 'Dishwasher Safe': 'Yes', Origin: 'Imported' } },
  { id: 23, name: 'Linen Throw Blanket', category: 'Home & Living', price: 26000, oldPrice: 32000, rating: 4.6, reviews: 84, stock: 21, badge: 'sale', icon: 'home', popularity: 64, createdAt: '2026-03-17',
    description: 'Pre-washed linen that only gets softer with time, generously sized for sofa or bed.',
    specs: { Material: '100% Linen', Dimensions: '130cm x 170cm', Care: 'Machine wash cold', Origin: 'Imported' } },
  { id: 24, name: 'Minimalist Desk Lamp', category: 'Home & Living', price: 19000, oldPrice: null, rating: 4.4, reviews: 49, stock: 26, badge: null, icon: 'home', popularity: 51, createdAt: '2026-05-30',
    description: 'A dimmable LED desk lamp with a weighted base and a clean, understated silhouette.',
    specs: { 'Light Source': 'LED, Dimmable', Power: '8W', 'Color Temp': '3000K-5000K', Warranty: '1 Year' } },
];

const CATEGORIES = [
  { name: 'Men', icon: 'shirt' },
  { name: 'Women', icon: 'bag' },
  { name: 'Footwear', icon: 'shoe' },
  { name: 'Electronics', icon: 'headphones' },
  { name: 'Accessories', icon: 'watch' },
  { name: 'Home & Living', icon: 'home' },
];

const PRODUCT_BG_IMAGES = [
  'assets/images/product-1.jpg',
  'assets/images/product-2.jpg',
  'assets/images/product-3.jpg',
  'assets/images/product-4.jpg',
];

function formatCurrency(amount) {
  return `₦${Number(amount).toLocaleString('en-NG')}`;
}
window.formatCurrency = formatCurrency;

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function getStarsHtml(rating) {
  const rounded = Math.round(rating);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += Icons.star(i <= rounded);
  }
  return html;
}

function getStockLabel(stock) {
  if (stock === 0) return { text: 'Out of Stock', className: 'low' };
  if (stock <= 5) return { text: `Only ${stock} left`, className: 'low' };
  return { text: 'In Stock', className: 'ok' };
}

/**
 * Renders one product card. `variant` picks a gradient placeholder tile
 * (deterministic per product, based on id) since no real photography is
 * available yet — swap `.product-media-inner` for a real <img> once the
 * client supplies photos.
 */
function renderProductCard(product) {
  const bgImage = PRODUCT_BG_IMAGES[product.id % PRODUCT_BG_IMAGES.length];
  const stock = getStockLabel(product.stock);
  const isWishlisted = window.Cart ? window.Cart.isInWishlist(product.id) : false;

  const badgeHtml = product.badge
    ? `<span class="badge badge-${product.badge}">${product.badge === 'bestseller' ? 'Bestseller' : product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}</span>`
    : '';
  const outOfStockBadge = product.stock === 0 ? `<span class="badge badge-out">Sold Out</span>` : '';

  return `
    <div class="product-card reveal" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}" data-popularity="${product.popularity}" data-created="${product.createdAt}" data-name="${product.name.toLowerCase()}">
      <div class="product-media" style="background-image:url('${bgImage}')">
        <div class="product-badges">${badgeHtml}${outOfStockBadge}</div>
        <button class="icon-btn wishlist-toggle${isWishlisted ? ' active' : ''}" aria-label="Add to wishlist" data-wishlist-id="${product.id}">
          ${Icons.heart(isWishlisted)}
        </button>
        <a href="product-details.html?id=${product.id}" class="product-media-inner">
          ${Icons[product.icon] ? Icons[product.icon]() : Icons.bag()}
          <span>${product.name}</span>
        </a>
        <div class="product-quick-actions">
          <button class="btn btn-dark btn-sm btn-block add-to-cart-btn" data-add-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name"><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-rating">${getStarsHtml(product.rating)} <span>(${product.reviews})</span></div>
        <div class="product-price-row">
          <span class="product-price">${formatCurrency(product.price)}</span>
          ${product.oldPrice ? `<span class="product-price-old">${formatCurrency(product.oldPrice)}</span>` : ''}
        </div>
        <span class="product-stock ${stock.className}">${stock.text}</span>
      </div>
    </div>
  `;
}

function renderProductGrid(container, products) {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        ${Icons.search()}
        <h3>No products found</h3>
        <p>Try adjusting your filters or search term.</p>
      </div>`;
    return;
  }
  container.innerHTML = products.map(renderProductCard).join('');
  attachProductCardEvents(container);
}

function attachProductCardEvents(scope = document) {
  scope.querySelectorAll('[data-add-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = Number(btn.dataset.addId);
      if (window.Cart) window.Cart.addToCart(id, 1);
    });
  });
  scope.querySelectorAll('[data-wishlist-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = Number(btn.dataset.wishlistId);
      if (window.Cart) window.Cart.toggleWishlist(id, btn);
    });
  });
  initScrollReveal();
}

function getFeaturedProducts(count = 8) {
  return [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, count);
}

function getBestsellers(count = 4) {
  return PRODUCTS.filter((p) => p.badge === 'bestseller').slice(0, count);
}

function getNewArrivals(count = 4) {
  return [...PRODUCTS].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, count);
}

function getSaleProducts(count = 4) {
  return PRODUCTS.filter((p) => p.oldPrice).slice(0, count);
}

function getRelatedProducts(category, excludeId, count = 4) {
  return PRODUCTS.filter((p) => p.category === category && p.id !== excludeId).slice(0, count);
}

window.ProductsAPI = {
  PRODUCTS,
  CATEGORIES,
  getProductById,
  renderProductCard,
  renderProductGrid,
  attachProductCardEvents,
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals,
  getSaleProducts,
  getRelatedProducts,
  getStarsHtml,
  getStockLabel,
};

// =========================================================
// Products page: search, filter, sort, pagination
// (only runs when the products grid exists on the page)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  if (!grid) return; // Not on products.html

  const state = {
    search: '',
    categories: [],
    minPrice: null,
    maxPrice: null,
    sort: 'popularity',
    page: 1,
    perPage: 12,
  };

  // Pre-select category from ?category= query param, if present
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  if (categoryParam) state.categories = [categoryParam];
  state.wishlistOnly = params.get('wishlist') === '1';

  function applyFilters() {
    let results = [...PRODUCTS];

    if (state.wishlistOnly && window.Cart) {
      const wishlist = window.Cart.getWishlist();
      results = results.filter((p) => wishlist.includes(p.id));
    }

    if (state.search.trim()) {
      const term = state.search.trim().toLowerCase();
      results = results.filter((p) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    }
    if (state.categories.length) {
      results = results.filter((p) => state.categories.includes(p.category));
    }
    if (state.minPrice !== null && !Number.isNaN(state.minPrice)) {
      results = results.filter((p) => p.price >= state.minPrice);
    }
    if (state.maxPrice !== null && !Number.isNaN(state.maxPrice)) {
      results = results.filter((p) => p.price <= state.maxPrice);
    }

    switch (state.sort) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'newest': results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'popularity':
      default: results.sort((a, b) => b.popularity - a.popularity);
    }

    return results;
  }

  function render() {
    const results = applyFilters();
    const totalPages = Math.max(1, Math.ceil(results.length / state.perPage));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * state.perPage;
    const pageItems = results.slice(start, start + state.perPage);

    renderProductGrid(grid, pageItems);

    const countEl = document.querySelector('.results-count');
    if (countEl) countEl.textContent = `Showing ${results.length ? start + 1 : 0}\u2013${Math.min(start + state.perPage, results.length)} of ${results.length} products`;

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    const container = document.querySelector('.pagination');
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `<button data-page="${i}" class="${i === state.page ? 'active' : ''}">${i}</button>`;
    }
    container.innerHTML = html;
    container.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.page = Number(btn.dataset.page);
        render();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Search input
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      state.page = 1;
      render();
    });
  }

  // Category checkboxes
  document.querySelectorAll('[data-filter-category]').forEach((checkbox) => {
    if (state.categories.includes(checkbox.value)) checkbox.checked = true;
    checkbox.addEventListener('change', () => {
      const checked = Array.from(document.querySelectorAll('[data-filter-category]:checked')).map((c) => c.value);
      state.categories = checked;
      state.page = 1;
      render();
    });
  });

  // Price range inputs
  const minPriceInput = document.querySelector('[data-filter-min-price]');
  const maxPriceInput = document.querySelector('[data-filter-max-price]');
  function handlePriceChange() {
    state.minPrice = minPriceInput && minPriceInput.value ? Number(minPriceInput.value) : null;
    state.maxPrice = maxPriceInput && maxPriceInput.value ? Number(maxPriceInput.value) : null;
    state.page = 1;
    render();
  }
  if (minPriceInput) minPriceInput.addEventListener('change', handlePriceChange);
  if (maxPriceInput) maxPriceInput.addEventListener('change', handlePriceChange);

  // Sort dropdown
  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      render();
    });
  }

  // Clear filters
  const clearBtn = document.querySelector('[data-clear-filters]');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.search = ''; state.categories = []; state.minPrice = null; state.maxPrice = null; state.page = 1;
      if (searchInput) searchInput.value = '';
      if (minPriceInput) minPriceInput.value = '';
      if (maxPriceInput) maxPriceInput.value = '';
      document.querySelectorAll('[data-filter-category]').forEach((c) => { c.checked = false; });
      render();
    });
  }

  // Mobile filters panel toggle
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  const filtersPanel = document.querySelector('.filters-panel');
  const filtersBackdrop = document.querySelector('.filters-backdrop');
  if (mobileFilterToggle && filtersPanel && filtersBackdrop) {
    mobileFilterToggle.addEventListener('click', () => {
      filtersPanel.classList.add('open');
      filtersBackdrop.classList.add('open');
    });
    filtersBackdrop.addEventListener('click', () => {
      filtersPanel.classList.remove('open');
      filtersBackdrop.classList.remove('open');
    });
  }

  render();
});
