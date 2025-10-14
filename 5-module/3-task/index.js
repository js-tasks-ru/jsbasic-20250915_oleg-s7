function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  const slideWidth = carousel.offsetWidth;
  const slidesCount = carousel.children.length;
  let currentSlide = 0;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', () => {
    currentSlide++;
    updateCarousel();
  });

  arrowLeft.addEventListener('click', () => {
    currentSlide--;
    updateCarousel();
  });

  function updateCarousel() {
    const offset = -slideWidth * currentSlide;
    carousel.style.transform = `translateX(${offset}px)`;

    if (currentSlide === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (currentSlide === slidesCount - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }
}