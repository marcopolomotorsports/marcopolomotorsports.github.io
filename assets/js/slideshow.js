document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('home');
  if (!hero) return;
  var slideCount = 24;
  var slidesContainer = document.createElement('div');
  slidesContainer.className = 'slides';
  hero.insertBefore(slidesContainer, hero.firstChild);

  // Prepare slide sequence: random without repeats
  var order = Array.from({length: slideCount+1}, (_, i)=>i);
  // Fisher–Yates shuffle
  for (var i = order.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Ensure default slide (0) is first
  var zeroIdx = order.indexOf(0);
  [order[0], order[zeroIdx]] = [order[zeroIdx], order[0]];
  
  // Create slide elements and preload first two
  order.forEach(function(idx, i) {
    var slide = document.createElement('div');
    slide.className = 'slide' + (i===0 ? ' active' : '');
    slide.style.backgroundImage = 'url("assets/images/slideshow/' + idx + '.jpg")';
    slidesContainer.appendChild(slide);
    if (i <= 1) {
      new Image().src = 'assets/images/slideshow/' + idx + '.jpg';
    }
  });

  var current = 0;
  var interval = 5000;
  function nextSlide() {
    var slides = slidesContainer.children;
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    // Preload next
    var nextIdx = (current + 1) % slides.length;
    new Image().src = slides[nextIdx].style.backgroundImage.slice(5, -2);
  }
  setInterval(nextSlide, interval);
});
