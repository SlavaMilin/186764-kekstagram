'use strict';
var pictures = [];
var COMMENT = [
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


for (var i = 0; i < 25; i++) {
  pictures.push({
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomArrange(15, 185),
    comments: getRandomComment(COMMENT)
  });
}

