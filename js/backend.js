'use strict';

(function () {
  var GET_TIMEOUT = 10000;
  var DATA_TYPE = 'json';
  var SUCCESS_CODE = 200;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var ERRORS_CODE = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено'
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_TYPE;
    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var error = ERRORS_CODE.xhr.status;
      onError(error ? error : 'Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = GET_TIMEOUT;
    xhr.send();
  };

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_TYPE;

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
