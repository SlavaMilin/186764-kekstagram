'use strict';

(function () {
  var EFFECT_PREFIX = 'effect-';
  var FILTER_GRAYSCALE = 'grayscale';
  var FILTER_SEPIA = 'sepia';
  var FILTER_INVERT = 'invert';
  var FILTER_BLUR = 'blur';
  var FILTER_BRIGHTNESS = 'brightness';

  var uploadForm = document.querySelector('.upload-form');
  var effectsBtn = uploadForm.querySelectorAll('input[name="effect"]');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');
  var slider = uploadForm.querySelector('.upload-effect-level');
  var pin = uploadForm.querySelector('.upload-effect-level-pin');
  var pinLine = uploadForm.querySelector('.upload-effect-level-line');
  var uploadEffectLine = uploadForm.querySelector('.upload-effect-level-val');
  var uploadEffectValue = uploadForm.querySelector('.upload-effect-level-value');
  var numberOfFilters = effectsBtn.length;

  slider.classList.add('hidden');

  var filters = {
    chrome: function (value) {
      return FILTER_GRAYSCALE + '(' + value / 100 + ')';
    },
    sepia: function (value) {
      return FILTER_SEPIA + '(' + value / 100 + ')';
    },
    marvin: function (value) {
      return FILTER_INVERT + '(' + value + '%)';
    },
    phobos: function (value) {
      return FILTER_BLUR + '(' + (value / 100) * 3 + 'px)';
    },
    heat: function (value) {
      return FILTER_BRIGHTNESS + '(' + (value / 100) * 3 + ')';
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
      return slider.classList.add('hidden');
    }
    return slider.classList.remove('hidden');
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
    clickEvt.preventDefault();
    setPinPosition(clickEvt.clientX);
  };

  pin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();
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

  for (var i = 0; i < numberOfFilters; i++) {
    effectsBtn[i].addEventListener('click', onFilterImgClick);
  }
})();
