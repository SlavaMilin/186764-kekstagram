'use strict';
var PICTURE_ITERATION = 25;
var template = document.querySelector('#picture-template').content;
var pasteInto = document.querySelector('.pictures');
var gallery = document.querySelector('.gallery-overlay');
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomArrange = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomComment = function (data) {
  var result = [];
  for (var i = 0; i < getRandomArrange(1, 2); i += 1) {
    result.push(data.pop([getRandomArrange(0, data.length - 1)]));
  }
  return result;
};

var addPictureData = function (iteration, text) {
  var pictures = [];
  for (var i = 0; i < iteration; i++) {
    pictures.push({
      url: 'photos' + (i + 1) + '.jpg',
      likes: getRandomArrange(15, 185),
      comments: getRandomComment(text)
    });
  }
  return pictures;
};

var printTemplate = function (iteration, data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < iteration; i += 1) {
    var pictureElement = template.cloneNode(true);
    pictureElement.querySelector('img').src = data[i].url;
    pictureElement.querySelector('.picture-likes').textContent = data[i].likes;
    pictureElement.querySelector('.picture-comments').textContent = data[i].comments;
    fragment.appendChild(pictureElement);
  }
  pasteInto.appendChild(fragment);
};

var generateGallery = function (obj, data) {
  obj.classList.remove('hidden');
  obj.querySelector('.gallery-overlay-image').src = data[0].src;
  obj.querySelector('.likes-count').textContent = data[0].likes;
  obj.querySelector('.comments-count').textContent = data[0].comments;
};

var pictureData = addPictureData(PICTURE_ITERATION, COMMENTS);
printTemplate(PICTURE_ITERATION, pictureData);
generateGallery(gallery, pictureData);

