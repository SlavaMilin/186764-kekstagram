'use strict';

(function () {
  var filters = document.querySelector('.filters');
  var filtersBtn = filters.querySelectorAll('.filters-radio');

  var pictures = [];

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  var sortTypes = function (type, data) {
    if (type === 'filter-popular') {
      return data.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        } else {
          return a.comments.length - b.comments.length;
        }
      });
    } else if (type === 'filter-discussed') {
      return data.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        } else if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return a.likes - b.likes;
        }
      });
    } else if (type === 'filter-random') {
      return shuffle(data);
    }
    return pictures;
  };

  var onBtnSortClick = function (evt) {
    var picturesNode = document.querySelectorAll('.picture');
    var copyData = pictures.slice(0);
    var type = evt.target.id;
    copyData = sortTypes(type, copyData);
    for (var i = 0; i < picturesNode.length; i++) {
      picturesNode[i].remove();
    }
    window.debounce(function () {
      window.render(copyData, window.CONSTANTS.pictureIteration);
      window.preview(copyData);
    });
  };

  var onSuccess = function (data) {
    pictures = data;
    if (filters.classList.contains('filters-inactive')) {
      filters.classList.remove('filters-inactive');
    }
    window.render(data, window.CONSTANTS.pictureIteration);
    window.preview(data);
  };

  var onError = window.functions.sendError;

  for (var i = 0; i < filtersBtn.length; i++) {
    filtersBtn[i].addEventListener('click', onBtnSortClick);
  }

  window.backend.load(onSuccess, onError);

})();
