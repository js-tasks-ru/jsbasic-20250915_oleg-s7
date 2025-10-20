import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._render();
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  setTitle(title) {
    const titleElement = this.elem.querySelector('.modal__title');
    titleElement.textContent = title;
  }

  setBody(node) {
    const bodyElement = this.elem.querySelector('.modal__body');
    bodyElement.innerHTML = '';
    bodyElement.append(node);
  }

  close() {
    if (this.elem.parentNode) {
      this.elem.remove();
    }
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}