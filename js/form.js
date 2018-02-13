'use strict';

(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadCansel = uploadForm.querySelector('#upload-cancel');
  var uploadInput = uploadForm.querySelector('#upload-file');

  var onUploadBtnChange = function () {
    uploadOverlay.classList.remove('hidden');
    uploadInput.removeEventListener('change', onUploadBtnChange);
  };

  var onUploadCanselClick = function () {
    uploadForm.reset();
    uploadOverlay.classList.add('hidden');
    uploadCansel.removeEventListener('click', onUploadCanselClick);
  };

  uploadInput.addEventListener('change', onUploadBtnChange);
  uploadCansel.addEventListener('click', onUploadCanselClick);
})();

