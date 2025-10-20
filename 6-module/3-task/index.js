import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._container = this.render();
    this.initCarousel();
    this.initAddToCart();
  }

  get elem() {
    return this._container;
  }

  render() {
    const slidesHTML = this.slides.map(slide => `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${slidesHTML}
        </div>
      </div>
    `);

    return carousel;
  }

  initCarousel() {
    const inner = this._container.querySelector('.carousel__inner');
    const arrowRight = this._container.querySelector('.carousel__arrow_right');
    const arrowLeft = this._container.querySelector('.carousel__arrow_left');

    let position = 0;
    let currentSlide = 0;

    updateArrows();

    arrowRight.addEventListener('click', () => {
      const slideWidth = inner.offsetWidth;
      currentSlide++;
      position -= slideWidth;
      inner.style.transform = `translateX(${position}px)`;
      updateArrows();
    });

    arrowLeft.addEventListener('click', () => {
      const slideWidth = inner.offsetWidth;
      currentSlide--;
      position += slideWidth;
      inner.style.transform = `translateX(${position}px)`;
      updateArrows();
    });

    function updateArrows() {
      arrowLeft.style.display = currentSlide === 0 ? 'none' : '';
      arrowRight.style.display = currentSlide === inner.children.length - 1 ? 'none' : '';
    }
  }

  initAddToCart() {
    this._container.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (!button) return;

      const slide = button.closest('.carousel__slide');
      const id = slide.dataset.id;

      this._container.dispatchEvent(new CustomEvent('product-add', {
        detail: id,
        bubbles: true
      }));
    });
  }
}
