'use strict';

(function () {
  window.functions = {
    sendError: function (message) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.className = 'render-error';

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
}());