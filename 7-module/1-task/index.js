import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this._render();
    this._initScroll();
    this._initSelect();
  }

  _render() {
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map(category => `
            <a href="#" class="ribbon__item" data-id="${category.id}">
              ${category.name}
            </a>`).join('')}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    return ribbon;
  }

  _initScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollWidth = ribbonInner.scrollWidth;
      const clientWidth = ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  _initSelect() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();

      const link = event.target.closest('.ribbon__item');
      if (!link) return;

      const active = ribbonInner.querySelector('.ribbon__item_active');
      if (active) {
        active.classList.remove('ribbon__item_active');
      }

      link.classList.add('ribbon__item_active');

      const ribbonSelectEvent = new CustomEvent('ribbon-select', {
        detail: link.dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(ribbonSelectEvent);
    });
  }
}
