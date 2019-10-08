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

var PREFERENCES = {
  HASH: '#',
  START_POSITION: 0,
  MAX_QUANTITY: 5,
  MAX_LENGTH: 20
};


var formElement = document.querySelector('#upload-select-image');
var inputElement = formElement.querySelector('.text__hashtags');
var buttonElement = formElement.querySelector('#upload-submit');

// console.log(formElement, inputElement, buttonElement);

var checkDoubleHashtags = function (tags) {
  for (var i = 0; i < tags.length; i++) {
    for (var t = 0; t < tags.length; t++) {
      if (tags[i] === tags[j] && i !== j) {
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
};

buttonElement.addEventListener('click', handler);

// var pin = document.querySelector('.effect-level__pin');
// var effectList = document.querySelector('.effects__list');
var imagePreview = document.querySelector('.img-upload__preview');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');
// var toggle = effectList.querySelector('input');


var allEffects = {
  chrome: {
    element: effectChrome,
    class: 'effects__preview--chrome'
  },

  sepia: {
    element: effectSepia,
    class: 'effects__preview--sepia'
  },
  marvin: {
    element: effectMarvin,
    class: 'effects__preview--marvin'
  },
  phobos: {
    element: effectPhobos,
    class: 'effects__preview--phobos'
  },
  heat: {
    element: effectHeat,
    class: 'effects__preview--heat'
  }
};
/*
var classReset = function (list) {
  for (var i = 0; i < list.length; i++) {
  imagePreview.classList.remove(list[i].class);
  }
}

var p = function(object) {
  var list = Object.values(object);
  for (var i = 0; i < list.length; i++) {
    list[i].element.addEventListener('click', function (evt) {
      classReset(list);
      imagePreview.classList.add(list[i].class);
    });
  }
}


p(allEffects);
*/

var classReset = function () {
  imagePreview.classList.remove(allEffects.chrome.class);
  imagePreview.classList.remove(allEffects.sepia.class);
  imagePreview.classList.remove(allEffects.marvin.class);
  imagePreview.classList.remove(allEffects.phobos.class);
  imagePreview.classList.remove(allEffects.heat.class);
};

effectChrome.addEventListener('click', function () {
  classReset();
  imagePreview.classList.add(allEffects.chrome.class);
});

effectSepia.addEventListener('click', function () {
  classReset();
  imagePreview.classList.add(allEffects.sepia.class);
});

effectMarvin.addEventListener('click', function () {
  classReset();
  imagePreview.classList.add(allEffects.marvin.class);
});

effectPhobos.addEventListener('click', function () {
  classReset();
  imagePreview.classList.add(allEffects.phobos.class);
});

effectHeat.addEventListener('click', function () {
  classReset();
  imagePreview.classList.add(allEffects.heat.class);
});

