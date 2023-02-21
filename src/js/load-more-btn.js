export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.btnEl = this.getBtn(selector);

    hidden && this.hide();
  }

  getBtn(selector) {
    return document.querySelector(selector);
  }

  enable() {
    this.btnEl.disabled = false;
    this.btnEl.textContent = 'Load more';
  }

  disable() {
    this.btnEl.disabled = true;
    this.btnEl.textContent = 'Loading...';
  }

  show() {
    this.btnEl.classList.remove('is-hidden');
  }

  hide() {
    this.btnEl.classList.add('is-hidden');
  }
}
