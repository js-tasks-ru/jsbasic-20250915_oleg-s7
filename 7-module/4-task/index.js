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
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElem = this.elem.querySelector('.slider__value');

    this.elem.addEventListener('click', (event) => {
      if (this.elem.classList.contains('slider_dragging')) return;

      const rect = this.elem.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const leftRelative = left / rect.width;

      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      this.value = newValue;

      const valuePercents = (newValue / segments) * 100;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      valueElem.textContent = newValue;

      this._updateActiveStep(newValue);

      const customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });

    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      const onPointerMove = (moveEvent) => {
        moveEvent.preventDefault();

        const rect = this.elem.getBoundingClientRect();
        let left = moveEvent.clientX - rect.left;
        let leftRelative = left / rect.width;

        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        const leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        const segments = this.steps - 1;
        const approximateValue = leftRelative * segments;
        const newValue = Math.round(approximateValue);

        valueElem.textContent = newValue;
        this._updateActiveStep(newValue);
      };

      const onPointerUp = (upEvent) => {
        const rect = this.elem.getBoundingClientRect();
        let left = upEvent.clientX - rect.left;
        let leftRelative = left / rect.width;

        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        const segments = this.steps - 1;
        const approximateValue = leftRelative * segments;
        const newValue = Math.round(approximateValue);
        this.value = newValue;

        const valuePercents = (newValue / segments) * 100;

        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;
        valueElem.textContent = newValue;
        this._updateActiveStep(newValue);

        this.elem.classList.remove('slider_dragging');

        const customEvent = new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);

        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  _updateActiveStep(value) {
    const allSteps = this.elem.querySelectorAll('.slider__steps span');
    allSteps.forEach(step => step.classList.remove('slider__step-active'));
    allSteps[value].classList.add('slider__step-active');
  }
}
