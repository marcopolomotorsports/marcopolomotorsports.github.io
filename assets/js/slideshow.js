document.addEventListener('DOMContentLoaded', () => {
  const slides = {
    a: document.querySelector('.slide-a'),
    b: document.querySelector('.slide-b')
  };
  const order = ['a','b'];
  let currLayer = 0;
  let imgIdx = 0;
  const images = Array.from({length:24}, (_,i) => `assets/images/slideshow/${i+1}.jpg`);
  const interval = 5000;   // time between slides

  // initialize both layers
  slides[order[0]].style.backgroundImage = `url("${images[0]}")`;
  slides[order[0]].classList.add('active');
  // preload the rest
  images.forEach(src => new Image().src = src);

  function nextSlide() {
    imgIdx = (imgIdx + 1) % images.length;
    const nextLayer = order[1 - currLayer];
    // set next image
    slides[nextLayer].style.backgroundImage = `url("${images[imgIdx]}")`;
    // fade it in
    slides[nextLayer].classList.add('active');
    // fade out the old
    slides[order[currLayer]].classList.remove('active');
    // swap layers
    currLayer = 1 - currLayer;
    setTimeout(nextSlide, interval);
  }

  // start
  setTimeout(nextSlide, interval);
});