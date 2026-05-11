export class Toast {
  static #container = null;

  static #getContainer() {
    if (!this.#container) {
      this.#container = document.getElementById('toastContainer');
    }
    return this.#container;
  }

  /**
   * показать уведомление
   * @param {string} message
   * @param {'success'|'error'|'default'} type
   * @param {number} duration - мс
   */
  static show(message, type = 'success', duration = 2500) {
    const container = this.#getContainer();
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = '0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  static success(msg) { this.show(msg, 'success'); }
  static error(msg) { this.show(msg, 'error'); }
}
