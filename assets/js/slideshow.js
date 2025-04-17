// assets/js/slideshow.js
// Random hero-image slideshow: shows 0.jpg on load, then randomly cycles through 1–24 without repeats

document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('home');
  if (!hero) return;

  // Build array of slide image URLs
  var images = [];
  for (var i = 1; i <= 24; i++) {
    images.push('assets/images/slideshow/' + i + '.jpg');
  }

  // Preload all images
  images.forEach(function(src) {
    var img = new Image();
    img.src = src;
  });

  // Show default image 0.jpg immediately
  var defaultImg = 'assets/images/slideshow/0.jpg';
  hero.style.backgroundImage = 'url("' + defaultImg + '")';

  // Track which images have been shown
  var shown = [];
  var interval = 5000; // milliseconds

  // Function to pick and display the next slide
  function nextSlide() {
    // Reset once all have been shown
    if (shown.length === images.length) {
      shown = [];
    }

    // Pick a random index not already shown
    var idx;
    do {
      idx = Math.floor(Math.random() * images.length);
    } while (shown.includes(idx));
    shown.push(idx);

    // Update background-image
    hero.style.backgroundImage = 'url("' + images[idx] + '")';

    // Schedule next slide
    setTimeout(nextSlide, interval);
  }

  // Start cycling after initial interval
  setTimeout(nextSlide, interval);
});
