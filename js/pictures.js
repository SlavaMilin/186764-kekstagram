'use strict';
var PICTURE = {
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
var EFFECT_PREFIX = 'effect-';
var RESIZE_STEP = 25;
var BASIC_SIZE_IMG = '100%';
var MIN_SIZE_IMG = 25;
var MAX_SIZE_IMG = 75;
var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MAX_WORD = 5;

var template = document.querySelector('#picture-template').content;
var pasteInto = document.querySelector('.pictures');
var gallery = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var uploadForm = document.querySelector('.upload-form');
var uploadInput = uploadForm.querySelector('#upload-file');
var uploadOverlay = uploadForm.querySelector('.upload-overlay');
var uploadCansel = uploadForm.querySelector('#upload-cancel');
var mainFilterImage = uploadForm.querySelector('.effect-image-preview');
var effectsBtn = uploadForm.querySelectorAll('input[name="effect"]');
var btnDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
var btnInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
var resizeControl = uploadForm.querySelector('.upload-resize-controls-value');
var hashtag = uploadForm.querySelector('.upload-form-hashtags');


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
      url: PICTURE.dir + (i + 1) + PICTURE.extension,
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

// пока не нужна
// var generateGallery = function (obj, data) {
//   var testData = data[0];
//   obj.classList.remove('hidden');
//   obj.querySelector('.gallery-overlay-image').src = testData.url;
//   obj.querySelector('.likes-count').textContent = testData.likes;
//   obj.querySelector('.comments-count').textContent = testData.comments.length;
// };

var onUploadBtnChange = function () {
  uploadOverlay.classList.remove('hidden');
  uploadInput.removeEventListener('change', onUploadBtnChange);
};

var onUploadCanselClick = function () {
  uploadForm.reset();
  uploadOverlay.classList.add('hidden');
  uploadCansel.removeEventListener('click', onUploadCanselClick);
};

var onFilterImgClick = function (evt) {
  mainFilterImage.className = EFFECT_PREFIX + evt.target.value;
  mainFilterImage.classList.add('effect-image-preview');
};

var onGaleryBtnClick = function () {
  gallery.classList.add('hidden');
  galleryClose.removeEventListener('click', onGaleryBtnClick);
};

var onFormSubmit = function (evt) {
  hashtag.style.borderColor = 'initial';
  var validate = validateHashtag(hashtag.value);
  if (!validate) {
    evt.preventDefault();
    hashtag.style.borderColor = 'red';
  } else {
    uploadForm.reset();
  }
};

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
    var repeat = arr.includes(index);
    if (repeat) {
      result = false;
    }
  });
  return result;
};

var resizeImage = function () {
  resizeControl.value = BASIC_SIZE_IMG;

  var countPercentSize = function (value, operator) {
    value = parseInt(value, 10);
    if (operator && value <= MAX_SIZE_IMG) {
      return value + RESIZE_STEP + '%';
    }
    if (!operator && value > MIN_SIZE_IMG) {
      return value - RESIZE_STEP + '%';
    }
    return value + '%';
  };

  var changeImgSize = function (size) {
    size = parseInt(size, 10) / 100;
    var value = 'scale(' + size + ')';
    mainFilterImage.style.transform = value;
  };

  btnDec.addEventListener('click', function () {
    var setValue = countPercentSize(resizeControl.value, false);
    resizeControl.value = setValue;
    changeImgSize(setValue);
  });
  btnInc.addEventListener('click', function () {
    var setValue = countPercentSize(resizeControl.value, true);
    resizeControl.value = setValue;
    changeImgSize(setValue);
  });
};

var openFullSizeImg = function () {
  var images = document.querySelectorAll('.picture');
  images.forEach(function (el) {
    el.addEventListener('click', function (evt) {
      evt.preventDefault();
      gallery.classList.remove('hidden');
      gallery.querySelector('.gallery-overlay-image').src = evt.target.src;
      galleryClose.addEventListener('click', onGaleryBtnClick);
    });
  });
};

uploadForm.addEventListener('submit', onFormSubmit);
uploadInput.addEventListener('change', onUploadBtnChange);
uploadCansel.addEventListener('click', onUploadCanselClick);
effectsBtn.forEach(function (el) {
  el.addEventListener('click', onFilterImgClick);
});


var picturesData = addPictureData(PICTURE.iteration, PICTURE.comments);
printTemplate(PICTURE.iteration, picturesData);
resizeImage();
openFullSizeImg();

