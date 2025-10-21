import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this._render();
    this._renderCards(this.products);
  }

  _render() {
    return createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
  }

  _renderCards(products) {
    const container = this.elem.querySelector('.products-grid__inner');
    container.innerHTML = '';

    for (let product of products) {
      const card = new ProductCard(product);
      container.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let filtered = this.products.filter(product => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        return false;
      }

      if (
        this.filters.category &&
        product.category !== this.filters.category
      ) {
        return false;
      }

      return true;
    });

    this._renderCards(filtered);
  }
}
