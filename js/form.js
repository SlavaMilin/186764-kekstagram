'use strict';

(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadCansel = uploadForm.querySelector('#upload-cancel');
  var uploadInput = uploadForm.querySelector('#upload-file');

  var onUploadBtnChange = function () {
    uploadOverlay.classList.remove('hidden');
    uploadInput.removeEventListener('change', onUploadBtnChange);
    window.addEventListener('keydown', onFormEscPress);
  };

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.CONSTANS.ESC_KEYCODE) {
      uploadOverlay.classList.add('hidden');
      window.removeEventListener('keydown', onFormEscPress);
    }
  };

  var onUploadCanselClick = function () {
    uploadForm.reset();
    uploadOverlay.classList.add('hidden');
    uploadInput.addEventListener('change', onUploadBtnChange);
    uploadCansel.removeEventListener('click', onUploadCanselClick);
  };

  uploadInput.addEventListener('change', onUploadBtnChange);
  uploadCansel.addEventListener('click', onUploadCanselClick);
})();

