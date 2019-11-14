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

  window.helpers = {
    showItem: showItem,
    hideItem: hideItem,
    getRandomNumber: getRandomNumber,
    sortByComments: sortByComments,
    sortRandom: sortRandom,
    sortRandomPhotos: sortRandomPhotos
  };
})();
