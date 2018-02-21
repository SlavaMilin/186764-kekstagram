'use strict';

(function () {
  var template = document.querySelector('#picture-template').content;
  var pasteInto = document.querySelector('.pictures');

  var printTemplate = function (data, count) {
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

  var successHandler = function (data) {
    printTemplate(data, window.CONSTANS.pictureIteration);
    window.preview(data);
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
