'use strict';

(function () {

  var closeBigPhoto = function () {
    window.helpers.hideItem(window.data.bigPic);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.helpers.ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var showBigPhoto = function (data) {
    window.helpers.showItem(window.data.bigPic);
    window.data.bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.helpers.ESC_KEYCODE) {
        closeBigPhoto();
      }
    });
  };

  window.fullsize = {
    closeBigPhoto: closeBigPhoto,
    onPopupEscPress: onPopupEscPress,
    showBigPhoto: showBigPhoto
  };

})();
