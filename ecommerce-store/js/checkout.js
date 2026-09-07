/**
 * LUXEMART — checkout.js
 * Populates the order summary from the cart, handles delivery-method
 * and payment-method UI, validates every field on submit, and simulates
 * placing an order (no backend is connected — see the note in the
 * success handler below).
 */

const EXPRESS_SHIPPING_FEE = 5000;

function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  if (!form) return; // Not on checkout.html

  const items = window.Cart.getCartItemsWithDetails();
  if (!items.length) {
    const layout = document.querySelector('.checkout-layout');
    if (layout) {
      layout.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          ${Icons.cart()}
          <h3>Your cart is empty</h3>
          <p>Add something to your cart before checking out.</p>
          <a href="products.html" class="btn btn-primary">Browse Products</a>
        </div>`;
    }
    return;
  }

  renderOrderSummary();

  // Delivery method affects the shipping line in the summary
  document.querySelectorAll('input[name="delivery-method"]').forEach((radio) => {
    radio.addEventListener('change', renderOrderSummary);
  });

  // Payment method toggles the card-details fieldset
  const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
  const cardFields = document.getElementById('card-fields');
  paymentRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (cardFields) cardFields.style.display = radio.value === 'card' && radio.checked ? 'grid' : 'none';
    });
  });

  form.addEventListener('submit', handleSubmit);
}

function getSelectedDeliveryFee() {
  const selected = document.querySelector('input[name="delivery-method"]:checked');
  return selected && selected.value === 'express' ? EXPRESS_SHIPPING_FEE : null; // null = use standard/free logic from Cart
}

function renderOrderSummary() {
  const items = window.Cart.getCartItemsWithDetails();
  const listEl = document.getElementById('order-summary-items');
  if (listEl) {
    listEl.innerHTML = items.map((item) => `
      <div class="order-summary-item">
        <span class="name">${item.name} &times; ${item.qty}</span>
        <span>${formatCurrency(item.lineTotal)}</span>
      </div>
    `).join('');
  }

  const totals = window.Cart.calculateOrderTotals();
  const expressFee = getSelectedDeliveryFee();
  const shipping = expressFee !== null ? expressFee : totals.shipping;
  const discountedSubtotal = totals.subtotal - totals.discount;
  const tax = discountedSubtotal * 0.075;
  const total = discountedSubtotal + shipping + tax;

  setText('checkout-subtotal', formatCurrency(totals.subtotal));
  setText('checkout-shipping', shipping === 0 ? 'Free' : formatCurrency(shipping));
  setText('checkout-tax', formatCurrency(Math.round(tax)));
  setText('checkout-total', formatCurrency(Math.round(total)));

  const discountRow = document.getElementById('checkout-discount-row');
  if (discountRow) {
    discountRow.style.display = totals.discount > 0 ? 'flex' : 'none';
    setText('checkout-discount', `\u2212${formatCurrency(Math.round(totals.discount))}`);
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let isValid = true;

  // Customer information
  isValid = validateField(form.fullName, (v) => Validation.isMinLength(v, 2), 'Please enter your full name.') && isValid;
  isValid = validateField(form.email, Validation.isValidEmail.bind(Validation), 'Please enter a valid email address.') && isValid;
  isValid = validateField(form.phone, Validation.isValidPhone.bind(Validation), 'Please enter a valid phone number.') && isValid;

  // Shipping address
  isValid = validateField(form.address, (v) => Validation.isMinLength(v, 5), 'Please enter your street address.') && isValid;
  isValid = validateField(form.city, (v) => Validation.isRequired(v), 'Please enter your city.') && isValid;
  isValid = validateField(form.state, (v) => Validation.isRequired(v), 'Please select a state.') && isValid;
  isValid = validateField(form.zip, Validation.isValidZip.bind(Validation), 'Please enter a valid postal code.') && isValid;

  // Payment fields, only if "Card" is selected
  const paymentMethod = form.querySelector('input[name="payment-method"]:checked');
  if (paymentMethod && paymentMethod.value === 'card') {
    isValid = validateField(form.cardNumber, Validation.isValidCardNumber.bind(Validation), 'Please enter a valid card number.') && isValid;
    isValid = validateField(form.cardExpiry, Validation.isValidExpiry.bind(Validation), 'Use MM/YY, and a date that has not passed.') && isValid;
    isValid = validateField(form.cardCvv, Validation.isValidCvv.bind(Validation), 'Please enter a valid CVV.') && isValid;
    isValid = validateField(form.cardName, (v) => Validation.isMinLength(v, 2), 'Please enter the name on the card.') && isValid;
  }

  if (!isValid) {
    const firstError = form.querySelector('.error');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  placeOrder(form);
}

function validateField(input, validatorFn, message) {
  if (!input) return true;
  if (!validatorFn(input.value)) {
    Validation.showFieldError(input, message);
    return false;
  }
  Validation.clearFieldError(input);
  return true;
}

function placeOrder(form) {
  // NOTE: There is no backend connected. This simulates order placement
  // entirely client-side (generates a reference number, clears the cart,
  // and shows a confirmation). Wire this up to a real payment/order API
  // before using it for genuine transactions.
  const orderNumber = 'LUX-' + Math.floor(100000 + Math.random() * 900000);

  const modal = document.getElementById('order-success-modal');
  if (modal) {
    setText('order-number', orderNumber);
    modal.classList.add('open');
  }

  window.Cart.clearCart();
  form.reset();
}

document.addEventListener('DOMContentLoaded', initCheckoutPage);
