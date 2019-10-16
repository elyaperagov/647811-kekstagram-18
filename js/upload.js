'use strict';

(function () {

  // ЗАГРУЗКА ИЗОБРАЖЕНИЯ

  var upload = document.querySelector('#upload-file');

  var uploadShow = function () {
    var filtersWindow = document.querySelector('.img-upload__overlay');
    filtersWindow.classList.remove('hidden');
  };

  upload.addEventListener('change', uploadShow);

  // ФОРМА РЕДАКТИРОВАНИЯ

  var RESIZE_STEP = 25;
  var RESIZE_MAX = 100;
  var resize = document.querySelector('.scale__control--value');
  var resizeSmaller = document.querySelector('.scale__control--smaller');
  var resizeBigger = document.querySelector('.scale__control--bigger');
  var preview = document.querySelector('.img-upload__preview');

  /*
  function formatToPercent(number) {
  return number + '%';
  }*/


  var resizeBiggerHandler = function () {
    if (Number.parseInt(resize.value, 10) < RESIZE_MAX) {
      resize.value = Number.parseInt(resize.value, 10) + RESIZE_STEP + '%';
      preview.style.transform = 'scale(0.' + Number.parseInt(resize.value, 10) + ')';
    } else if (Number.parseInt(resize.value, 10) === RESIZE_MAX) {
      preview.style.transform = 'none';
    }
  };

  var resizeSmallerHandler = function () {
    if (Number.parseInt(resize.value, 10) > RESIZE_STEP) {
      resize.value = Number.parseInt(resize.value, 10) - RESIZE_STEP + '%';
      preview.style.transform = 'scale(0.' + Number.parseInt(resize.value, 10) + ')';
    }
  };

  resizeBigger.addEventListener('click', resizeBiggerHandler);
  resizeSmaller.addEventListener('click', resizeSmallerHandler);

})();
