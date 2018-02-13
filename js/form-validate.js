'use strict';

(function () {
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_WORD = 5;

  var uploadForm = document.querySelector('.upload-form');
  var hashtag = uploadForm.querySelector('.upload-form-hashtags');

  var validateHashtag = function (data) {
    if (data === '') {
      return true;
    }
    var array = data.toLowerCase().split(' ');
    var result = true;
    array.forEach(function (el, index, arr) {
      if (el[0] !== '#' || el.lenhth > HASHTAG_MAX_LENGTH || array.length > HASHTAG_MAX_WORD) {
        result = false;
      }
      arr.splice(index, 1);
      var repeat = arr.indexOf(el) !== -1;
      if (repeat) {
        result = false;
      }
    });
    return result;
  };
  var onFormSubmit = function (evt) {
    hashtag.style.borderColor = 'initial';
    var validate = validateHashtag(hashtag.value);
    if (!validate) {
      evt.preventDefault();
      hashtag.style.borderColor = 'red';
    }
  };
  uploadForm.addEventListener('submit', onFormSubmit);
})();
