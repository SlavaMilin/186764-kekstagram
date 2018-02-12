'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  var onGaleryBtnClick = function () {
    gallery.classList.add('hidden');
    galleryClose.removeEventListener('click', onGaleryBtnClick);
  };

  var openFullSizeImg = function () {
    var images = document.querySelectorAll('.picture');
    images.forEach(function (el) {
      el.addEventListener('click', function (evt) {
        evt.preventDefault();
        gallery.classList.remove('hidden');
        gallery.querySelector('.gallery-overlay-image').src = evt.target.src;
        galleryClose.addEventListener('click', onGaleryBtnClick);
      });
    });
  };
  openFullSizeImg();
})();
