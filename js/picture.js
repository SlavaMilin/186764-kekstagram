'use strict';

(function () {
  window.PICTURE = {
    iteration: 25,
    dir: 'photos/',
    extension: '.jpg',
    comments: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ]
  };

  // пока не нужна
  // var generateGallery = function (obj, data) {
  //   var testData = data[0];
  //   obj.classList.remove('hidden');
  //   obj.querySelector('.gallery-overlay-image').src = testData.url;
  //   obj.querySelector('.likes-count').textContent = testData.likes;
  //   obj.querySelector('.comments-count').textContent = testData.comments.length;
  // };
})();
