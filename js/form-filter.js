'use strict';

(function () {
  var EFFECT_PREFIX = 'effect-';

  var uploadForm = document.querySelector('.upload-form');
  var effectsBtn = uploadForm.querySelectorAll('input[name="effect"]');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');
  var slider = uploadForm.querySelector('.upload-effect-level');

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

  effectsBtn.forEach(function (el) {
    el.addEventListener('click', onFilterImgClick);
  });
})();
