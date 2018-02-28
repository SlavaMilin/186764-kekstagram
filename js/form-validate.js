'use strict';

(function () {

  var HASHTAG_MAX_WORD = 5;
  var HASHTAG_MAX_SYMBOLS = 20;
  var HASH_REG_EXP = /#[\wа-я]{1,20}/i;

  var SPACE_SYMBOL = ' ';

  var uploadForm = document.querySelector('.upload-form');
  var submitBtn = uploadForm.querySelector('#upload-submit');

  var uploadOverlay = uploadForm.querySelector('.upload-overlay');
  var hashtagField = uploadForm.querySelector('.upload-form-hashtags');

  var HashTagsValidationErrors = {
    'incorrect': 'Хеш тег некорректен. Должен начинаться с #, а послне ее должно быть слово.',
    'tooLong': 'В хеш теге не может быть больше 20 символов',
    'maxTags': 'Допускается не больше 5 хеш-тегов.',
    'duplicates': 'Дублируются хеш теги'
  };

  var setValidStatusToField = function (element, status) {
    element.style.border = !status ? '2px solid red' : 'initial';
  };

  var isValidHashTag = function (hashTag) {
    return HASH_REG_EXP.test(hashTag);
  };

  var isRepeat = function (arr) {
    return !arr.every(function (val) {
      return arr.indexOf(val) === arr.lastIndexOf(val);
    });
  };

  var runValidateHash = function (hashTag) {
    hashTag = hashTag.toLowerCase();

    if (!isValidHashTag(hashTag)) {
      hashtagField.setCustomValidity(HashTagsValidationErrors.incorrect);
      return false;
    }

    if (hashTag.length > HASHTAG_MAX_SYMBOLS) {
      hashtagField.setCustomValidity(HashTagsValidationErrors.tooLong);
      return false;
    }

    return true;
  };

  var setValidateHashField = function () {
    var allTags = hashtagField.value.trim();

    if (!allTags) {
      hashtagField.setCustomValidity('');
      return true;
    }

    var hashTagArr = allTags.split(SPACE_SYMBOL);

    if (!hashTagArr.every(runValidateHash)) {
      return false;
    }

    if (hashTagArr.length > HASHTAG_MAX_WORD) {
      hashtagField.setCustomValidity(HashTagsValidationErrors.maxTags);
      return false;
    }

    if (isRepeat(hashTagArr)) {
      hashtagField.setCustomValidity(HashTagsValidationErrors.duplicates);
      return false;
    }

    hashtagField.setCustomValidity('');
    return true;
  };

  var onError = window.functions.sendError;

  var onSuccess = function () {
    uploadOverlay.classList.add('hidden');
  };

  var bind = function () {
    submitBtn.addEventListener('click', onFormSubmit);
  };
  var onFormSubmit = function (evt) {

    var validate = setValidateHashField();
    setValidStatusToField(hashtagField, validate);

    if (validate) {
      evt.preventDefault();
      window.backend.upload(new FormData(uploadForm), onSuccess, onError);
      uploadForm.reset();
    }
  };

  bind();

})();
