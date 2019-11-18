'use strict';

(function () {

  var Preferences = {
    HASH: '#',
    START_POSITION: 0,
    MAX_QUANTITY: 5,
    MAX_LENGTH: 20,
    MAX_COMMENT_LENGTH: 140
  };

  var formElement = document.querySelector('#upload-select-image');
  var inputElement = formElement.querySelector('.text__hashtags');
  var buttonElement = formElement.querySelector('#upload-submit');
  var textarea = document.querySelector('.text__description');

  var colorChange = function (element) {
    element.style = 'border-color: red; border-width: 5px;';
  };

  var validateComment = function (comment) {
    if (comment.length > Preferences.MAX_COMMENT_LENGTH) {
      textarea.setCustomValidity('Длина комментария не может составлять больше 140 символов;');
      colorChange(textarea);
      return false;
    }
    return true;
  };

  var checkDoubleHashtags = function (tags) {
    for (var i = 0; i < tags.length; i++) {
      for (var t = i; t < tags.length; t++) {
        if (i !== t && tags[i] === tags[t]) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtag = function (hashtag) {
    var isLong = hashtag.length > Preferences.MAX_LENGTH;
    var isNotHashtag = hashtag[0] !== '#';
    var isOnlyHash = hashtag === '#';
    var isSpaceUsed = hashtag.indexOf(Preferences.HASH, 1) > 1;

    if (isLong) {
      inputElement.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку;');
      return false;
    }

    if (isNotHashtag) {
      inputElement.setCustomValidity('хэш-тег начинается с символа # (решётка);');
      return false;
    }

    if (isOnlyHash) {
      inputElement.setCustomValidity('хеш-тег не может состоять только из одной решётки;');
      return false;
    }

    if (isSpaceUsed) {
      inputElement.setCustomValidity('хэш-теги разделяются пробелами;');
      return false;
    }

    inputElement.setCustomValidity('');
    return true;
  };

  var validateHashtags = function (tags) {
    var isDouble = checkDoubleHashtags(tags);
    if (isDouble) {
      inputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
      return false;
    }

    var isTooMany = tags.length > Preferences.MAX_QUANTITY;
    if (isTooMany) {
      inputElement.setCustomValidity('нельзя указать больше пяти хэш-тегов;');
      return false;
    }
    return true;
  };

  var validate = function (tags) {
    var result = true;
    result = result && validateHashtags(tags);
    for (var i = 0; i < tags.length; i++) {
      var hastag = tags[i];
      result = result && validateHashtag(hastag);
      if (!result) {
        break;
      }
    }
    if (result) {
      inputElement.setCustomValidity('');
    } else {
      colorChange(inputElement);
    }
  };

  var handler = function () {
    var hashtags = inputElement.value.toLowerCase().split(' ');
    if (inputElement.value !== '') {
      validate(hashtags);
    }
    var comments = textarea.value.split('');
    if (textarea.value !== '') {
      validateComment(comments);
    }
  };

  buttonElement.addEventListener('click', handler);

  window.validity = {
    inputElement: inputElement,
    textarea: textarea
  };

})();
