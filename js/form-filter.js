'use strict';

(function () {
  var EFFECT_PREFIX = 'effect-';

  var uploadForm = document.querySelector('.upload-form');
  var effectsBtn = uploadForm.querySelectorAll('input[name="effect"]');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');
  var slider = uploadForm.querySelector('.upload-effect-level');
  var pin = uploadForm.querySelector('.upload-effect-level-pin');
  var pinLine = uploadForm.querySelector('.upload-effect-level-line');
  var uploadEffectLine = uploadForm.querySelector('.upload-effect-level-val');
  var uploadEffectValue = uploadForm.querySelector('.upload-effect-level-value');

  slider.classList.add('hidden');

  var filters = {
    chrome: function (value) {
      return 'grayscale(' + value / 100 + ')';
    },
    sepia: function (value) {
      return 'sepia(' + value / 100 + ')';
    },
    marvin: function (value) {
      return 'invert(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur(' + (value / 100) * 3 + 'px)';
    },
    heat: function (value) {
      return 'brightness(' + (value / 100) * 3 + ')';
    }
  };

  var setPinPosition = function (x) {
    var rect = pinLine.getBoundingClientRect();
    var percent = ((x - rect.x) / rect.width) * 100;
    var currentFilter = mainFilterImage.classList.item(0).replace('effect-', '');
    if (percent > 0 && percent < 100) {
      pin.style.left = percent + '%';
      uploadEffectLine.style.width = percent + '%';
      uploadEffectValue.setAttribute('value', percent);
      mainFilterImage.style.filter = filters[currentFilter](percent);
    }
  };

  var sliderToggler = function (status) {
    if (status) {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  var onFilterImgClick = function (evt) {
    var imgValue = evt.target.value === 'none';
    sliderToggler(imgValue);
    mainFilterImage.style.filter = '';
    mainFilterImage.className = EFFECT_PREFIX + evt.target.value;
    mainFilterImage.classList.add('effect-image-preview');
    pin.style.left = 100 + '%';
    uploadEffectLine.style.width = 100 + '%';
  };

  var onLineClick = function (clickEvt) {
    setPinPosition(clickEvt.clientX);
  };

  pin.addEventListener('mousedown', function () {

    var onMouseMove = function (moveEvt) {
      setPinPosition(moveEvt.clientX);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  pinLine.addEventListener('click', onLineClick);

  for (var i = 0; i < effectsBtn.length; i++) {
    effectsBtn[i].addEventListener('click', onFilterImgClick);
  }
})();
