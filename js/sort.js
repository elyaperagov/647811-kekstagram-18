'use strict';

(function () {
  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');

  var removePictures = function () {
    var photo = window.data.pictures.querySelectorAll('.picture');
    photo.forEach(function (item) {
      window.data.pictures.removeChild(item);
    });
  };

  var removeFilter = function () {
    var filters = document.querySelector('.img-filters');
    var filterButtons = filters.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  window.sort = {
    removePictures: removePictures,
    removeFilter: removeFilter,
    popular: popular,
    discussed: discussed,
    random: random
  };

})();
