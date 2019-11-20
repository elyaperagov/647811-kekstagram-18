'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 27;

  var showItem = function (item) {
    item.classList.remove('hidden');
  };

  var hideItem = function (item) {
    item.classList.add('hidden');
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var sortByComments = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var sortRandom = function () {
    return Math.random() - 0.5;
  };

  var sortRandomPhotos = function (arr) {
    return arr.slice(0, 10).sort(sortRandom);
  };

  var isEscEvent = function (evt, arg) {
    if (evt.keyCode === ESC_KEYCODE) {
      arg();
    }
  };

  var isEnterEvent = function (evt, arg) {
    if (evt.keyCode === ENTER_KEYCODE) {
      arg();
    }
  };

  window.helpers = {
    showItem: showItem,
    hideItem: hideItem,
    getRandomNumber: getRandomNumber,
    sortByComments: sortByComments,
    sortRandomPhotos: sortRandomPhotos,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
