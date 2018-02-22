'use strict';

(function () {
  var template = document.querySelector('#picture-template').content;
  var pasteInto = document.querySelector('.pictures');

  window.render = function (data, count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var pictureElement = template.cloneNode(true);
      pictureElement.querySelector('img').src = data[i].url;
      pictureElement.querySelector('.picture-likes').textContent = data[i].likes;
      pictureElement.querySelector('.picture-comments').textContent = data[i].comments.length;
      fragment.appendChild(pictureElement);
    }
    pasteInto.appendChild(fragment);
  };
})();
