'use strict';

(function () {
  var filters = document.querySelector('.filters');
  var filtersBtn = filters.querySelectorAll('.filters-radio');

  var pictures = [];

  var sortTypes = function (type, data) {
    switch (type) {
      case 'filter-popular':
        return function () {
          data.sort(function (a, b) {
            if (a.likes < b.likes) {
              return 1;
            } else if (a.likes > b.likes) {
              return -1;
            } else {
              return a.comments.length - b.comments.length;
            }
          });
          return data;
        };
      case 'filter-discussed':
        return function () {
          data.sort(function (a, b) {
            if (a.comments.length < b.comments.length) {
              return 1;
            } else if (a.comments.length > b.comments.length) {
              return -1;
            } else {
              return a.likes - b.likes;
            }
          });
          return data;
        };
      case 'filter-random':
        return function () {
          for (var i = data.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = data;
            data[j] = temp;
          }
          return data;
        };
      default:
        return pictures;
    }
  };

  var onBtnSortClick = function (evt) {
    var picturesNode = document.querySelectorAll('.picture');
    var copyData = pictures.slice(0);
    var type = evt.target.id;
    copyData = sortTypes(type, copyData);
    window.debounce(function () {
      for (var i = 0; i < picturesNode.length; i++) {
        picturesNode[i].remove();
      }
      window.render(copyData, window.CONSTANS.pictureIteration);
      window.preview(copyData);
    });
  };

  var successHandler = function (data) {
    pictures = data;
    if (filters.classList.contains('filters-inactive')) {
      filters.classList.remove('filters-inactive');
    }
    window.render(data, window.CONSTANS.pictureIteration);
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

  for (var i = 0; i < filtersBtn.length; i++) {
    filtersBtn[i].addEventListener('click', onBtnSortClick);
  }

  window.backend.load(successHandler, errorHandler);

})();
