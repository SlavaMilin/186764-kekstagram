'use strict';

(function () {
  var template = document.querySelector('#picture-template').content;
  var pasteInto = document.querySelector('.pictures');

  var getRandomArrange = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomComment = function (data) {
    var result = [];
    for (var i = 0; i < getRandomArrange(1, 2); i++) {
      result.push(data.pop([getRandomArrange(0, data.length - 1)]));
    }
    return result;
  };

  var addPictureData = function (count, text) {
    var pictures = [];
    for (var i = 0; i < count; i++) {
      pictures.push({
        url: window.PICTURE.dir + (i + 1) + window.PICTURE.extension,
        likes: getRandomArrange(15, 185),
        comments: getRandomComment(text)
      });
    }
    return pictures;
  };

  var printTemplate = function (count, data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i += 1) {
      var pictureElement = template.cloneNode(true);
      pictureElement.querySelector('img').src = data[i].url;
      pictureElement.querySelector('.picture-likes').textContent = data[i].likes;
      pictureElement.querySelector('.picture-comments').textContent = data[i].comments.length;
      fragment.appendChild(pictureElement);
    }
    pasteInto.appendChild(fragment);
  };

  var picturesData = addPictureData(window.PICTURE.iteration, window.PICTURE.comments);
  printTemplate(window.PICTURE.iteration, picturesData);
})();
