'use strict';

(function () {
  var HASHTAG_MAX_WORD = 5;
  var HASH_REG_EXP = /#[\wа-я]{1,20}/i;

  var uploadForm = document.querySelector('.upload-form');
  var hashtag = uploadForm.querySelector('.upload-form-hashtags');

  var isRepeat = function (arr) {
    return !arr.every(function (val) {
      return arr.indexOf(val) === arr.lastIndexOf(val);
    });
  };

  var isInvalidText = function (val) {
    return !HASH_REG_EXP.test(val);
  };

  var validateHashtag = function (data) {
    if (data === '') {
      return true;
    }
    var arr = data.split(' ');
    if (arr.length > HASHTAG_MAX_WORD) {
      // hashtag.setCustomValidity('нельзя указать больше ' + HASHTAG_MAX_WORD + ' хэш-тегов');
      return false;
    }
    for (var i = 0; i < arr.length; i++) {
      if (isInvalidText(arr[i])) {
        // hashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, первым символом должна быть #');
        return false;
      }
    }
    if (isRepeat(arr)) {
      // hashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      return false;
    }
    hashtag.setCustomValidity('');
    return true;
  };
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    hashtag.style.borderColor = 'initial';
    var validate = validateHashtag(hashtag.value);
    if (!validate) {
      evt.preventDefault();
      hashtag.style.borderColor = 'red';
    }
  };
  uploadForm.addEventListener('submit', onFormSubmit);
})();
