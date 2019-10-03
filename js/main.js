'use strict';


var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');


var likes = {
  minimum: 15,
  maximum: 200
};


var messages = {
  minimum: 1,
  maximum: 20
};


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var images = [];
for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
  images.push({
    url: 'photos/' + imageNumber + '.jpg',
    likes: getRandomNumber(likes.minimum, likes.maximum),
    messages: getRandomNumber(messages.minimum, messages.maximum)
  });
}

function renderTemplate(image) {
  var userImage = template.cloneNode(true);
  //  var image = images[i];

  userImage.querySelector('.picture__img').src = image.url;
  userImage.querySelector('.picture__likes').textContent = image.likes;
  userImage.querySelector('.picture__comments').textContent = image.messages;

  return userImage;
}

function getImage(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderTemplate(array[i]));
  }
  return fragment;
}

pictures.appendChild(getImage(images));

var bigPicture = document.querySelector('.big-picture');
var openBigPictures = document.querySelectorAll('.picture__img');
var closeBigPictures = bigPicture.querySelectorAll('.big-picture__cancel');

for (var k = 0; k < openBigPictures.length; k++) {
  openBigPictures[k].addEventListener('click', function (e) {
    e.preventDefault();
    bigPicture.classList.remove('hidden');
  });
}

for (var j = 0; j < closeBigPictures.length; j++) {
  closeBigPictures[j].addEventListener('click', function (e) {
    e.preventDefault();
    e.target.closest('.big-picture').classList.add('hidden');
  });
}
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
  if (Number.parseInt(resize.value) < RESIZE_MAX) {
    resize.value = Number.parseInt(resize.value) + RESIZE_STEP + '%';
    preview.style.transform = 'scale(0.' + Number.parseInt(resize.value) + ')';
  } else if (Number.parseInt(resize.value) === RESIZE_MAX) {
    preview.style.transform = 'none';
  }
};

var resizeSmallerHandler = function () {
  if (Number.parseInt(resize.value) > RESIZE_STEP) {
    resize.value = Number.parseInt(resize.value) - RESIZE_STEP + '%';
    preview.style.transform = 'scale(0.' + Number.parseInt(resize.value) + ')';
  }
};

resizeBigger.addEventListener('click', resizeBiggerHandler);
resizeSmaller.addEventListener('click', resizeSmallerHandler);

//var hashTag = document.querySelector('.text__hashtags');
//var submitButton = document.querySelector('#upload-submit');

  var PREFERENCES = {
    HASH: '#',
    START_POSITION: 0,
    MAX_QUANTITY: 5,
    MAX_LENGTH: 20
  };


var Errors = {
  HASHTAGS_TOO_MANY: 'нельзя указать больше пяти хэш-тегов;',
  HASHTAG_HAS_NO_HASH: 'хэш-тег начинается с символа # (решётка);',
  HASHTAG_TOO_LONG: 'максимальная длина одного хэш-тега 20 символов, включая решётку;',
  HASHTAG_ONLY_HASH: 'хеш-тег не может состоять только из одной решётки;',
  HASHTAG_USED_TWICE: 'один и тот же хэш-тег не может быть использован дважды;',
  HASHTAG_SPACE: 'хэш-теги разделяются пробелами;',
};


var formElement = document.querySelector('#upload-select-image');
var inputElement = formElement.querySelector('.text__hashtags');
var buttonElement = formElement.querySelector('.img-upload__submit');

//console.log(formElement, inputElement, buttonElement);

function checkDoubleHashtags(hashtags) {
  for (var i = 0; i < hashtags.length; i++) {
    var currentHashtag = hashtags[i];
    for (var j = 0; j < hashtags.length; j++) {
      if (currentHashtag === hashtags[j] && i !== j) {
        return true;
      }
    }
  }
  return false;
}

var validateHashtag = function(hashtag) {
  var isLong = hashtag.length < 2;
  var isNotHashtag = hashtag[0] !== '#';
  var isOnlyHash = hashtag === '#';
 // var isTooMany = hashtag.length > PREFERENCES.MAX_QUANTITY;
  var isSpaceUsed = hashtag.indexOf(PREFERENCES.HASH, 1) > 1;
  var isDouble = checkDoubleHashtags(hashtag);

  if (isLong) {
    inputElement.setCustomValidity(Errors.HASHTAG_TOO_LONG);
    return false;
  }

  if (isNotHashtag) {
    inputElement.setCustomValidity(Errors.HASHTAG_HAS_NO_HASH);
    return false;
  }

  if (isOnlyHash) {
    inputElement.setCustomValidity(Errors.HASHTAG_ONLY_HASH);
    return false;
  }

 // if (isTooMany) {
 //   inputElement.setCustomValidity(Errors.HASHTAGS_TOO_MANY);
 //   return false;
 //}

  if (isSpaceUsed) {
    inputElement.setCustomValidity(Errors.HASHTAG_SPACE);
    return false;
  }

  if (isDouble) {
    inputElement.setCustomValidity(Errors.HASHTAG_USED_TWICE);
    return false;
  }

  return true;
}

var validate = function(hashtags) {
  var result = true;

  for (var i = 0; i < hashtags.length; i++) {
    var hastag = hashtags[i];
    result = result && validateHashtag(hastag)
  }
  if (result) {
    inputElement.setCustomValidity('');
  }
}

var handler = function(event) {
  var hashtags = inputElement.value.split(' ');
  validate(hashtags);
}


buttonElement.addEventListener('click', handler);

/*
  var hashTagsInvalidhandler = function (hashtag) {
    if (hashtag[PREFERENCES.START_POSITION] !== '#') {
      hashTag.setCustomValidity(Errors.HASHTAG_HAS_NO_HASH);
      return false;
    } else if (hashtag.length > PREFERENCES.MAX_LENGTH) {
      hashTag.setCustomValidity(Errors.HASHTAG_TOO_LONG);
      return false;
    } else if (hashtag.length > PREFERENCES.MAX_LENGTH) {
      hashTag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      return false;
    }
    return true;
  };

submitButton.addEventListener('submit', hashTagsInvalidhandler(hashTag));*/
