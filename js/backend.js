'use strict';

(function () {
  var GET_TIMEOUT = 10000;
  var DATA_TYPE = 'json';

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_TYPE;
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = GET_TIMEOUT;
    xhr.send();
  };

  var upload = function (data, onSuccess) {
    var URL = 'https://js.dump.academy/kekstagram';

    var xhr = new XMLHttpRequest();
    xhr.responseType = DATA_TYPE;

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
