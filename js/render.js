'use strict';

(function () {
  var template = document.querySelector('#picture-template').content;
  var pasteInto = document.querySelector('.pictures');

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (el) {
      var pictureElement = template.cloneNode(true);
      pictureElement.querySelector('img').src = el.url;
      pictureElement.querySelector('.picture-likes').textContent = el.likes;
      pictureElement.querySelector('.picture-comments').textContent = el.comments.length;
      fragment.appendChild(pictureElement);
    });
    pasteInto.appendChild(fragment);
  };
})();
