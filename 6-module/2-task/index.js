import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
    this.addEventListeners();
  }

  render() {
    const price = `€${this.product.price.toFixed(2)}`;
    const imageSrc = `/assets/images/products/${this.product.image}`;

    const card = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="${imageSrc}" class="card__image" alt="product">
          <span class="card__price">${price}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    return card;
  }

  addEventListeners() {
    const button = this.elem.querySelector('.card__button');

    button.addEventListener('click', () => {
      const event = new CustomEvent('product-add', {
        detail: this.product.id,
        bubbles: true
      });

      this.elem.dispatchEvent(event);
    });
  }
}