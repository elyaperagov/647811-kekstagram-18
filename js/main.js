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


var resizeBiggerHandler = function () {
  if (parseInt(resize.value, 10) < RESIZE_MAX) {
    resize.value = parseInt(resize.value, 10) + RESIZE_STEP + '%';
    preview.style.transform = 'scale(0.' + parseInt(resize.value, 10) + ')';
  } else if (parseInt(resize.value, 10) === RESIZE_MAX) {
    preview.style.transform = 'none';
  }
};

var resizeSmallerHandler = function () {
  if (parseInt(resize.value, 10) > RESIZE_STEP) {
    resize.value = parseInt(resize.value, 10) - RESIZE_STEP + '%';
    preview.style.transform = 'scale(0.' + parseInt(resize.value, 10) + ')';
  }
};

resizeBigger.addEventListener('click', resizeBiggerHandler);
resizeSmaller.addEventListener('click', resizeSmallerHandler);

// var scalePin = document.querySelector('.scale__pin');
/*
var hashTags = document.querySelector('.text__hashtags');
var hashTagsNumber {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20
}

var hashTagsInvalidhandler = function () {

}
*/
