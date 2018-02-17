'use strict';

(function () {
  var EFFECT_PREFIX = 'effect-';

  var uploadForm = document.querySelector('.upload-form');
  var effectsBtn = uploadForm.querySelectorAll('input[name="effect"]');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');
  var slider = uploadForm.querySelector('.upload-effect-level');
  var pin = uploadForm.querySelector('.upload-effect-level-pin');

  slider.classList.add('hidden');

  var onFilterImgClick = function (evt) {
    if (evt.target.value === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
    mainFilterImage.className = EFFECT_PREFIX + evt.target.value;
    mainFilterImage.classList.add('effect-image-preview');
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      pin.style.left = (pin.offsetLeft - shiftX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  effectsBtn.forEach(function (el) {
    el.addEventListener('click', onFilterImgClick);
  });
})();
