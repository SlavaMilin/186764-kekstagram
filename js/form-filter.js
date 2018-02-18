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
    var pinLineWidth = pinLine.offsetWidth;
    var percent = (x / pinLineWidth) * 100;
    var currentFilter = mainFilterImage.classList.item(0).replace('effect-', '');
    if (percent > 0 && percent < 100) {
      pin.style.left = percent + '%';
      uploadEffectLine.style.width = percent + '%';
      uploadEffectValue.value = percent;
      mainFilterImage.style.filter = filters[currentFilter](percent);
    }
  };

  var onFilterImgClick = function (evt) {
    if (evt.target.value === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
    mainFilterImage.style.filter = '';
    mainFilterImage.className = EFFECT_PREFIX + evt.target.value;
    mainFilterImage.classList.add('effect-image-preview');
    pin.style.left = 100 + '%';
    uploadEffectLine.style.width = 100 + '%';
  };

  var onLineClick = function (clickEvt) {
    setPinPosition(clickEvt.offsetX);
  };

  pin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var xPosition = (pin.offsetLeft - shiftX);
      setPinPosition(xPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinLine.addEventListener('click', onLineClick);

  effectsBtn.forEach(function (el) {
    el.addEventListener('click', onFilterImgClick);
  });
})();
