'use strict';

(function () {

  var PREFERENCES = {
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

  var validateComment = function (comment) {
    if (comment.length > PREFERENCES.MAX_COMMENT_LENGTH) {
      textarea.setCustomValidity('Длина комментария не может составлять больше 140 символов;');
      return false;
    }
    return true;
  };

  // console.log(formElement, inputElement, buttonElement);

  var checkDoubleHashtags = function (tags) {
    for (var i = 0; i < tags.length; i++) {
      for (var t = 0; t < tags.length; t++) {
        if (tags[i] === tags[t] && i !== t) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtag = function (hashtag) {
    var isLong = hashtag.length > PREFERENCES.MAX_LENGTH;
    var isNotHashtag = hashtag[0] !== '#';
    var isOnlyHash = hashtag === '#';
    var isSpaceUsed = hashtag.indexOf(PREFERENCES.HASH, 1) > 1;

    if (isLong) {
      inputElement.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку;');
      return;
    }

    if (isNotHashtag) {
      inputElement.setCustomValidity('хэш-тег начинается с символа # (решётка);');
      return;
    }

    if (isOnlyHash) {
      inputElement.setCustomValidity('хеш-тег не может состоять только из одной решётки;');
      return;
    }

    if (isSpaceUsed) {
      inputElement.setCustomValidity('хэш-теги разделяются пробелами;');
      return;
    }

    inputElement.setCustomValidity('');
  };

  var validateHashtags = function (tags) {
    var isDouble = checkDoubleHashtags(tags);
    if (isDouble) {
      inputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
      return false;
    }

    var isTooMany = tags.length > PREFERENCES.MAX_QUANTITY;
    if (isTooMany) {
      inputElement.setCustomValidity('нельзя указать больше пяти хэш-тегов;');
      return false;
    }
    return true;
  };

  var validate = function (tags) {
    var result = true;
    result = result && validateHashtags(tags);
    if (!result) {
      return;
    }
    for (var i = 0; i < tags.length; i++) {
      var hastag = tags[i];
      result = result && validateHashtag(hastag);
      if (!result) {
        break;
      }
    }
    if (result) {
      inputElement.setCustomValidity('');
    }
  };

  var handler = function () {
    var hashtags = inputElement.value.split(' ');
    if (inputElement.value !== '') {
      validate(hashtags);
    }
    var comments = textarea.value.split('');
    if (textarea.value !== '') {
      validateComment(comments);
    }
  };

  buttonElement.addEventListener('click', handler);


})();
