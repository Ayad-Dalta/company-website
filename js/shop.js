/**
 * ApexBridge E-Commerce Materials Shop & Shopping Cart Controller
 */

let cart = JSON.parse(localStorage.getItem('apex_cart') || '[]');
let currentFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  updateCartBadge();
  initShopFilters();
  initCartDrawer();
});

/* ==========================================================================
   Product Catalog Rendering & Filtering
   ========================================================================== */
function renderShopProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid || !APEX_DATA.products) return;

  let filtered = APEX_DATA.products;

  if (currentFilter !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilter);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.materialGrade.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h3>No Bridge Materials Found</h3>
        <p style="color: var(--text-secondary);">Try clearing your search query or selecting another material category filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrapper">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-badge"><i class="fa-solid fa-certificate"></i> ${p.materialGrade}</span>
      </div>
      <div class="product-body">
        <div class="product-grade">${p.category.replace('-', ' ')}</div>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-meta">
          <span><i class="fa-solid fa-weight-hanging"></i> Cap: ${p.loadCapacity} Tons</span>
          <span><i class="fa-solid fa-star" style="color: var(--brand-orange);"></i> ${p.rating} (${p.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            $${p.pricePerUnit.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span>/ ${p.unit}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
        <button class="btn btn-secondary btn-sm" style="margin-top: 0.75rem; width: 100%;" onclick="openProductDetailsModal('${p.id}')">
          <i class="fa-solid fa-circle-info"></i> Technical Specs
        </button>
      </div>
    </div>
  `).join('');
}

function initShopFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderShopProducts();
    });
  });

  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderShopProducts();
    });
  }
}

/* ==========================================================================
   Product Technical Specs Modal
   ========================================================================== */
function openProductDetailsModal(productId) {
  const p = APEX_DATA.products.find(item => item.id === productId);
  if (!p) return;

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBox = document.getElementById('modalContent');
  if (!modalBackdrop || !modalBox) return;

  const specsHTML = Object.entries(p.specs).map(([key, val]) => `
    <div style="display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px dashed var(--border-color); font-size: 0.9rem;">
      <span style="color: var(--text-secondary); text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</span>
      <span style="font-weight: 600; color: var(--brand-cyan);">${val}</span>
    </div>
  `).join('');

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeGlobalModal()"><i class="fa-solid fa-xmark"></i></button>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
      <img src="${p.image}" alt="${p.name}" style="width: 140px; height: 140px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--border-color-highlight);">
      <div style="flex-grow: 1;">
        <span class="product-grade" style="display: block;">${p.materialGrade}</span>
        <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">${p.name}</h2>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--brand-orange);">
          $${p.pricePerUnit.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span style="font-size: 0.9rem; color: var(--text-muted);">per ${p.unit}</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--brand-teal); margin-top: 0.25rem;">
          <i class="fa-solid fa-boxes-stacked"></i> Stock Available: ${p.inStock} ${p.unit}s | Min Order: ${p.minOrder}
        </div>
      </div>
    </div>
    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${p.description}</p>
    <h4 style="color: var(--brand-orange); margin-bottom: 0.75rem;">AASHTO / ASTM Engineering Specifications</h4>
    <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
      ${specsHTML}
    </div>
    <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <label style="font-size: 0.9rem; font-weight: 600;">Qty (${p.unit}):</label>
        <input type="number" id="modalQtyInput" value="${p.minOrder}" min="${p.minOrder}" max="${p.inStock}" class="form-control" style="width: 90px; text-align: center;">
      </div>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-secondary" onclick="closeGlobalModal()">Close</button>
        <button class="btn btn-primary" onclick="addCustomQtyToCart('${p.id}')">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
}

function addCustomQtyToCart(productId) {
  const qtyInput = document.getElementById('modalQtyInput');
  const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
  addToCart(productId, qty);
  closeGlobalModal();
}

/* ==========================================================================
   Cart State Management
   ========================================================================== */
function addToCart(productId, qty = 1) {
  const product = APEX_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.pricePerUnit,
      unit: product.unit,
      image: product.image,
      grade: product.materialGrade,
      qty: qty
    });
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast(`Added ${qty} ${product.unit}(s) of ${product.name} to cart`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast('Removed item from procurement cart', 'info');
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartBadge();
    renderCartItems();
  }
}

function saveCart() {
  localStorage.setItem('apex_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    b.textContent = totalCount;
  });
}

/* ==========================================================================
   Cart Drawer Controls
   ========================================================================== */
function initCartDrawer() {
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');

  function openCart() {
    renderCartItems();
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartBackdrop) cartBackdrop.classList.add('active');
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartBackdrop) cartBackdrop.classList.remove('active');
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h4>Your Cart is Empty</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">Browse our bridge structural materials and add items for procurement.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (shippingEl) shippingEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  // Estimated heavy freight transport: $350 base + 3.5% of total
  const shipping = subtotal > 0 ? 350 + (subtotal * 0.035) : 0;
  const total = subtotal + shipping;

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div style="font-size: 0.75rem; color: var(--brand-orange); font-weight: 600;">${item.grade}</div>
        <h5 style="font-size: 0.95rem; line-height: 1.2; margin-bottom: 0.35rem;">${item.name}</h5>
        <div style="font-weight: 700; color: var(--brand-cyan); font-size: 0.95rem;">
          $${(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
        <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--bg-input); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <button onclick="updateCartQty('${item.id}', -1)" style="font-weight: 700;">-</button>
          <span style="font-size: 0.85rem; font-weight: 600; min-width: 20px; text-align: center;">${item.qty}</span>
          <button onclick="updateCartQty('${item.id}', 1)" style="font-weight: 700;">+</button>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="font-size: 0.75rem; color: var(--brand-danger); margin-top: 0.25rem;">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

/* ==========================================================================
   Checkout Modal & Invoice Generation Simulation
   ========================================================================== */
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your procurement cart is empty!', 'warning');
    return;
  }

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBox = document.getElementById('modalContent');
  if (!modalBackdrop || !modalBox) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = 350 + (subtotal * 0.035);
  const tax = subtotal * 0.06;
  const grandTotal = subtotal + shipping + tax;

  modalBox.innerHTML = `
    <button class="modal-close" onclick="closeGlobalModal()"><i class="fa-solid fa-xmark"></i></button>
    <div style="margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;"><i class="fa-solid fa-file-invoice-dollar" style="color: var(--brand-orange);"></i> Material Procurement Checkout</h2>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">Generate certified Purchase Order & ASTM Mill Test Traceability Invoice.</p>
    </div>
    <form id="checkoutForm" onsubmit="handleCheckoutSubmit(event)">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-group">
          <label>Contractor / Company Name</label>
          <input type="text" class="form-control" required placeholder="e.g. Apex Heavy Civil Ltd">
        </div>
        <div class="form-group">
          <label>Project ID / DOT Contract</label>
          <input type="text" class="form-control" required placeholder="e.g. DOT-PA-2026-88B">
        </div>
      </div>
      <div class="form-group">
        <label>Job Site Freight Delivery Address</label>
        <input type="text" class="form-control" required placeholder="Pier 42 Heavy Rail Yard, Pittsburgh, PA">
      </div>
      <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
          <span>Material Subtotal:</span>
          <strong>$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
          <span>Heavy Transport Freight:</span>
          <strong>$${shipping.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9rem;">
          <span>State Tax (6%):</span>
          <strong>$${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 1.15rem; color: var(--brand-orange); font-weight: 800;">
          <span>Total Order Value:</span>
          <span>$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 1rem;">
        <button type="button" class="btn btn-secondary" onclick="closeGlobalModal()">Cancel</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-check-circle"></i> Confirm Purchase Order</button>
      </div>
    </form>
  `;

  modalBackdrop.classList.add('active');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const orderId = 'APX-' + Math.floor(100000 + Math.random() * 900000);
  
  // Clear cart
  cart = [];
  saveCart();
  updateCartBadge();
  renderCartItems();

  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  if (cartDrawer) cartDrawer.classList.remove('active');
  if (cartBackdrop) cartBackdrop.classList.remove('active');

  const modalBox = document.getElementById('modalContent');
  if (modalBox) {
    modalBox.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="width: 70px; height: 70px; background: var(--brand-teal); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.25rem; margin: 0 auto 1.5rem auto;">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Purchase Order Confirmed!</h2>
        <p style="color: var(--brand-cyan); font-weight: 700; margin-bottom: 1rem;">Order Reference: ${orderId}</p>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 2rem;">Your certified materials purchase order and Mill Test Reports (MTR) have been generated. Dispatch coordination will contact your site manager.</p>
        <button class="btn btn-primary" onclick="closeGlobalModal()">Return to Website</button>
      </div>
    `;
  }

  showToast(`Order ${orderId} confirmed successfully!`, 'success');
}
