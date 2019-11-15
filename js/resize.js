'use strict';

(function () {

  var upload = document.querySelector('#upload-file');
  var filtersWindow = document.querySelector('.img-upload__overlay');
  var closePreview = document.querySelector('.img-upload__cancel');
  var uploadShow = function () {
    filtersWindow.classList.remove('hidden');
    window.helpers.hideItem(window.effects.effectLevel);
  };

  var uploadClose = function () {
    window.helpers.hideItem(filtersWindow);
    document.removeEventListener('keydown', uploadCloseHandler);
  };

  closePreview.addEventListener('click', uploadClose);

  var uploadCloseHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE && !window.validity.inputElement.matches(':focus') && !window.validity.textarea.matches(':focus')) {
      uploadClose();
    }
  };

  document.addEventListener('keydown', uploadCloseHandler);
  upload.addEventListener('change', uploadShow);

  var RESIZE_STEP = 25;
  var RESIZE_MAX = 100;
  var resize = document.querySelector('.scale__control--value');
  var resizeSmaller = document.querySelector('.scale__control--smaller');
  var resizeBigger = document.querySelector('.scale__control--bigger');
  var preview = document.querySelector('.img-upload__preview');


  var resizeBiggerHandler = function () {
    if (Number.parseInt(resize.value, 10) < RESIZE_MAX) {
      var valueControl = Number.parseInt(resize.value, 10) + RESIZE_STEP;
      resize.value = valueControl + '%';
      preview.style.transform = 'scale(' + valueControl / 100 + ')';
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
