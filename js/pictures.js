'use strict';
var PICTURE = {
  ITERATION: 25,
  DIR: 'photos/',
  EXTENSION: '.jpg',
  COMMENTS: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]
};

var template = document.querySelector('#picture-template').content;
var pasteInto = document.querySelector('.pictures');
var gallery = document.querySelector('.gallery-overlay');

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
      url: PICTURE.DIR + (i + 1) + PICTURE.EXTENSION,
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

var generateGallery = function (obj, data) {
  var testData = data[0];
  obj.querySelector('.gallery-overlay-image').src = testData.url;
  obj.querySelector('.likes-count').textContent = testData.likes;
  obj.querySelector('.comments-count').textContent = testData.comments.length;
};

var picturesData = addPictureData(PICTURE.ITERATION, PICTURE.COMMENTS);
printTemplate(PICTURE.ITERATION, picturesData);
generateGallery(gallery, picturesData);

