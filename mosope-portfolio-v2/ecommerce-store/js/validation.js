/**
 * LUXEMART — validation.js
 * Reusable, framework-free validation helpers shared by the newsletter
 * form, contact form, and checkout form.
 */
const Validation = {
  isRequired(value) {
    return typeof value === 'string' && value.trim().length > 0;
  },

  isValidEmail(value) {
    if (!this.isRequired(value)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  },

  isValidPhone(value) {
    if (!this.isRequired(value)) return false;
    const digits = value.replace(/[\s-]/g, '');
    return /^(\+?\d{1,3})?\d{7,12}$/.test(digits);
  },

  isMinLength(value, min) {
    return this.isRequired(value) && value.trim().length >= min;
  },

  isValidCardNumber(value) {
    if (!this.isRequired(value)) return false;
    const digits = value.replace(/\s/g, '');
    return /^\d{13,19}$/.test(digits);
  },

  isValidExpiry(value) {
    if (!this.isRequired(value)) return false;
    const match = /^(\d{2})\s*\/\s*(\d{2})$/.exec(value.trim());
    if (!match) return false;
    const month = parseInt(match[1], 10);
    const year = parseInt('20' + match[2], 10);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const expiry = new Date(year, month, 0);
    return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
  },

  isValidCvv(value) {
    if (!this.isRequired(value)) return false;
    return /^\d{3,4}$/.test(value.trim());
  },

  isValidZip(value) {
    if (!this.isRequired(value)) return false;
    return /^[A-Za-z0-9\- ]{3,10}$/.test(value.trim());
  },

  /**
   * Applies an error message to a form field: adds the `.error` class,
   * shows the adjacent `.field-error` element, and returns false — so
   * callers can chain `isValid = isValid && validateField(...)`.
   */
  showFieldError(inputEl, message) {
    if (!inputEl) return false;
    inputEl.classList.add('error');
    const wrapper = inputEl.closest('.form-field') || inputEl.parentElement;
    const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    return false;
  },

  clearFieldError(inputEl) {
    if (!inputEl) return;
    inputEl.classList.remove('error');
    const wrapper = inputEl.closest('.form-field') || inputEl.parentElement;
    const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
    if (errorEl) errorEl.style.display = 'none';
  },
};

window.Validation = Validation;
