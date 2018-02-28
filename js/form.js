'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadCansel = uploadForm.querySelector('#upload-cancel');
  var uploadInput = uploadForm.querySelector('#upload-file');
  var mainPucture = uploadForm.querySelector('.effect-image-preview');
  var resizeControl = uploadForm.querySelector('.upload-resize-controls-value');
  var descrtiption = uploadForm.querySelector('.upload-form-description');

  var onUploadBtnChange = function () {
    var errorNode = document.querySelector('.render-error');

    var img = uploadInput.files[0];
    var regExp = new RegExp('^image/(' + FILE_TYPES.join('|').replace('\+', '\\+') + ')$', 'i');
    if (errorNode) {
      errorNode.remove();
    }
    if (!regExp.test(img.type)) {
      window.functions.sendError('Выбран не верный формат изображения, пожалуйста, повторите попытку');
      return;
    }

    var reader = new FileReader();
    reader.addEventListener('load', function () {
      mainPucture.src = reader.result;
    });
    reader.readAsDataURL(img);

    uploadOverlay.classList.remove('hidden');
    window.addEventListener('keydown', onFormEscPress);
    resizeControl.value = window.CONSTANTS.basicSizeImg;
  };

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.CONSTANTS.escKeycode) {
      uploadForm.reset();
      uploadOverlay.classList.add('hidden');
      uploadInput.addEventListener('change', onUploadBtnChange);
      window.removeEventListener('keydown', onFormEscPress);
    }
  };

  var onUploadCanselClick = function () {
    uploadForm.reset();
    uploadOverlay.classList.add('hidden');
    uploadInput.addEventListener('change', onUploadBtnChange);
    uploadCansel.removeEventListener('click', onUploadCanselClick);
  };

  var onDescriptionFocus = function () {
    window.removeEventListener('keydown', onFormEscPress);
    descrtiption.addEventListener('focusout', onDescriptionFucusOut);
  };

  var onDescriptionFucusOut = function () {
    window.addEventListener('keydown', onFormEscPress);
  };

  uploadInput.addEventListener('change', onUploadBtnChange);
  uploadCansel.addEventListener('click', onUploadCanselClick);
  descrtiption.addEventListener('focus', onDescriptionFocus);
})();

