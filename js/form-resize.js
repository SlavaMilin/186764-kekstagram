'use strict';

(function () {
  var RESIZE_STEP = 25;
  var MIN_SIZE_IMG = 25;
  var MAX_SIZE_IMG = 75;

  var uploadForm = document.querySelector('.upload-form');
  var resizeControl = uploadForm.querySelector('.upload-resize-controls-value');
  var btnDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var btnInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var mainFilterImage = uploadForm.querySelector('.effect-image-preview');

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

  var getSize = function (size, status) {
    return countPercentSize(size, !status);
  };

  var onBtnSizeClick = function (evt) {
    var typeBtn = evt.target.classList.contains('upload-resize-controls-button-dec');
    var setValue = getSize(resizeControl.value, typeBtn);
    resizeControl.value = setValue;
    changeImgSize(setValue);
  };

  var resizeImage = function () {
    btnDec.addEventListener('click', onBtnSizeClick);
    btnInc.addEventListener('click', onBtnSizeClick);
  };
  resizeImage();
})();
