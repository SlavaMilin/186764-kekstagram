'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  var onGaleryBtnClick = function () {
    gallery.classList.add('hidden');
    galleryClose.removeEventListener('click', onGaleryBtnClick);
  };

  var onImgEscPress = function (evt) {
    if (evt.keyCode === window.CONSTANS.ESC_KEYCODE) {
      gallery.classList.add('hidden');
      window.removeEventListener('keydown', onImgEscPress);
    }
  };

  var openFullSizeImg = function () {
    var images = document.querySelectorAll('.picture');
    images.forEach(function (el) {
      el.addEventListener('click', function (evt) {
        evt.preventDefault();
        document.addEventListener('keydown', onImgEscPress);
        gallery.classList.remove('hidden');
        gallery.querySelector('.gallery-overlay-image').src = evt.target.src;
        galleryClose.addEventListener('click', onGaleryBtnClick);
      });
    });
  };
  openFullSizeImg();
})();
