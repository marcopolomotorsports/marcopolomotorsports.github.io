// assets/js/slideshow.js

document.addEventListener('DOMContentLoaded', function() {
  var hero = document.getElementById('home');
  if (!hero) return;

  var images = [];
  for (var i = 1; i <= 24; i++) {
    images.push('assets/images/slideshow/' + i + '.jpg');
  }
  var defaultImg = 'assets/images/slideshow/0.jpg';
  hero.style.backgroundImage = 'url("' + defaultImg + '")';

  // preload
  images.forEach(function(src) { new Image().src = src; });

  var shown = [];
  var interval = 5000;      // time between slides
  var fadeTime = 700;       // must match your CSS transition

  function nextSlide() {
    if (shown.length === images.length) shown = [];

    // pick random unused index
    var idx;
    do { idx = Math.floor(Math.random() * images.length); }
    while (shown.includes(idx));
    shown.push(idx);

    var nextUrl = 'url("' + images[idx] + '")';

    // 1) fade out
    hero.classList.add('fade');

    // 2) after fade out → swap image & fade in
    setTimeout(function() {
      hero.style.backgroundImage = nextUrl;
      hero.classList.remove('fade');
    }, fadeTime);

    // 3) schedule next
    setTimeout(nextSlide, interval);
  }

  // kick off
  setTimeout(nextSlide, interval);
});