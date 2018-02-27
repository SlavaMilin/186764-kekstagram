'use strict';

(function () {
  var GET_TIMEOUT = 10000;
  var DATA_TYPE = 'json';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;
        default:
          onError('Произошла ошибка');
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.responseType = DATA_TYPE;
    xhr.open('GET', URL_LOAD);
    xhr.timeout = GET_TIMEOUT;
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.responseType = DATA_TYPE;

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
