import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this._render();
    this._initEvents();
  }

  _render() {
    const slider = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);

    const stepsContainer = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      if (i === this.value) {
        span.classList.add('slider__step-active');
      }
      stepsContainer.append(span);
    }

    const segments = this.steps - 1;
    const valuePercents = (this.value / segments) * 100;

    slider.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    slider.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    return slider;
  }

  _initEvents() {
    this.elem.addEventListener('click', (event) => {
      const sliderRect = this.elem.getBoundingClientRect();
      const left = event.clientX - sliderRect.left;
      const leftRelative = left / sliderRect.width;

      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      this.value = newValue;

      const valuePercents = (newValue / segments) * 100;

      const thumb = this.elem.querySelector('.slider__thumb');
      const progress = this.elem.querySelector('.slider__progress');
      const valueElem = this.elem.querySelector('.slider__value');

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      valueElem.textContent = newValue;

      const allSteps = this.elem.querySelectorAll('.slider__steps span');
      allSteps.forEach(step => step.classList.remove('slider__step-active'));
      allSteps[newValue].classList.add('slider__step-active');

      const customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });
  }
}
