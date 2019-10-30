'use strict';

(function () {

  var showItem = function (item) {
    item.classList.remove('hidden');
  };

  var hideItem = function (item) {
    item.classList.add('hidden');
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.helpers = {
    showItem: showItem,
    hideItem: hideItem,
    getRandomNumber: getRandomNumber
  };
})();
