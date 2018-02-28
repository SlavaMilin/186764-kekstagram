'use strict';

(function () {
  var HASHTAG_MAX_WORD = 5;
  var HASHTAG_MAX_SYMBOLS = 20;
  var HASH_REG_EXP = /#[\wа-я]{1,20}/i;

  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var hashTagField = uploadForm.querySelector('.upload-form-hashtags');

  var HashTagsValidationErrors = {
    'incorrect': 'Хеш тег некорректен. Должен начинаться с #, а послне ее должно быть слово.',
    'tooLong': 'В хеш теге не может быть больше 20 символов',
    'maxTags': 'Допускается не больше 5 хеш-тегов.',
    'duplicates': 'Дублируются хеш теги'
  };

  var setValidStatusToField = function (element, status) {
    element.style.border = !status ? '2px solid red' : 'initial';
  };

  var isRepeat = function (arr) {
    return !arr.every(function (val) {
      return arr.indexOf(val) === arr.lastIndexOf(val);
    });
  };

  var isValidHashTag = function (val) {
    return HASH_REG_EXP.test(val);
  };

  var runValidateHashtag = function (hashTag) {
    hashTagField.setCustomValidity('');
    if (!isValidHashTag(hashTag)) {
      hashTagField.setCustomValidity(HashTagsValidationErrors.incorrect);
      return false;
    }

    if (hashTag.length > HASHTAG_MAX_SYMBOLS) {
      hashTagField.setCustomValidity(HashTagsValidationErrors.tooLong);
      return false;
    }

    return true;
  };

  var setValidateHashField = function (hashTags) {
    hashTagField.setCustomValidity('');
    hashTags = hashTags.trim();

    if (!hashTags) {
      return true;
    }

    var hashTagArr = hashTags.split(' ');

    if (!hashTagArr.every(runValidateHashtag)) {
      return false;
    }

    if (hashTagArr.length > HASHTAG_MAX_WORD) {
      hashTagField.setCustomValidity(HashTagsValidationErrors.maxTags);
      return false;
    }

    if (isRepeat(hashTagArr)) {
      hashTagField.setCustomValidity(HashTagsValidationErrors.duplicates);
      return false;
    }

    return true;
  };

  var onSuccess = function () {
    uploadOverlay.classList.add('hidden');
  };

  var onError = window.functions.sendError;

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    hashTagField.setCustomValidity('');
    var validate = setValidateHashField(hashTagField.value);
    setValidStatusToField(hashTagField, validate);
    if (validate) {
      window.backend.upload(new FormData(uploadForm), onSuccess, onError);
    }
  };
  uploadForm.addEventListener('submit', onFormSubmit);
})();
