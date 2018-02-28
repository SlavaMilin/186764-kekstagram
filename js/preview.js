'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryImage = gallery.querySelector('.gallery-overlay-image');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  var onGaleryBtnClick = function () {
    gallery.classList.add('hidden');
    galleryClose.removeEventListener('click', onGaleryBtnClick);
  };

  var onImgEscPress = function (evt) {
    if (evt.keyCode === window.CONSTANTS.escKeycode) {
      gallery.classList.add('hidden');
      window.removeEventListener('keydown', onImgEscPress);
    }
  };

  window.preview = function (data) {
    var images = document.querySelectorAll('.picture');

    for (var i = 0; i < images.length; i++) {
      images[i].dataset.index = i;
      images[i].addEventListener('click', function (evt) {
        var index = evt.currentTarget.dataset.index;
        evt.preventDefault();
        document.addEventListener('keydown', onImgEscPress);
        gallery.classList.remove('hidden');
        galleryClose.addEventListener('click', onGaleryBtnClick);
        galleryImage.src = evt.target.src;
        gallery.querySelector('.likes-count').textContent = data[index].likes;
        gallery.querySelector('.comments-count').textContent = data[index].comments.length;
      });
    }
  };
})();
