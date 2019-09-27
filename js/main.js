'use strict';


var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();


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
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderTemplate(array[i]));
  }
}

getImage(images);
pictures.appendChild(fragment);

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
