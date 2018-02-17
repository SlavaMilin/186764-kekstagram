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

  var onFilterImgClick = function (evt) {
    if (evt.target.value === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
    mainFilterImage.style.filter = '';
    mainFilterImage.className = EFFECT_PREFIX + evt.target.value;
    mainFilterImage.classList.add('effect-image-preview');
  };

  pin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shiftX = startX - moveEvt.clientX;
      startX = moveEvt.clientX;
      var pinLineWidth = pinLine.offsetWidth;
      var pinOffsetLeft = pin.offsetLeft;
      var percentShift = ((pinOffsetLeft - shiftX) / pinLineWidth) * 100;
      var currentFilter = mainFilterImage.classList.item(0).replace('effect-', '');
      if (percentShift > 0 && percentShift < 100) {
        pin.style.left = percentShift + '%';
        uploadEffectLine.style.width = percentShift + '%';
        uploadEffectValue.value = percentShift;
        mainFilterImage.style.filter = filters[currentFilter](percentShift);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectsBtn.forEach(function (el) {
    el.addEventListener('click', onFilterImgClick);
  });
})();
