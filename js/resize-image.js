'use strict';

(function () {
  var RESIZE_STEP = 25;
  var BASIC_SIZE_IMG = '100%';
  var MIN_SIZE_IMG = 25;
  var MAX_SIZE_IMG = 75;

  var uploadForm = document.querySelector('.upload-form');
  var resizeControl = uploadForm.querySelector('.upload-resize-controls-value');
  var btnDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var btnInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');

  var resizeImage = function () {
    resizeControl.value = BASIC_SIZE_IMG;

    var countPercentSize = function (value, operator) {
      value = parseInt(value, 10);
      if (operator && value <= MAX_SIZE_IMG) {
        return value + RESIZE_STEP + '%';
      }
      if (!operator && value > MIN_SIZE_IMG) {
        return value - RESIZE_STEP + '%';
      }
      return value + '%';
    };

    var changeImgSize = function (size) {
      size = parseInt(size, 10) / 100;
      var value = 'scale(' + size + ')';
      mainFilterImage.style.transform = value;
    };

    btnDec.addEventListener('click', function () {
      var setValue = countPercentSize(resizeControl.value, false);
      resizeControl.value = setValue;
      changeImgSize(setValue);
    });
    btnInc.addEventListener('click', function () {
      var setValue = countPercentSize(resizeControl.value, true);
      resizeControl.value = setValue;
      changeImgSize(setValue);
    });
  };
  resizeImage();
})();
