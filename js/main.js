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
var i;
for (i = 0; i < 25; i++) {
  images.push({
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(likes.minimum, likes.maximum),
    messages: getRandomNumber(messages.minimum, messages.maximum)
  });
}


var renderTemplate = function () {
  var userImage = template.cloneNode(true);

  userImage.querySelector('.picture__img').src = images[i].url;
  userImage.querySelector('.picture__likes').textContent = images[i].likes;
  userImage.querySelector('.picture__comments').textContent = images[i].messages;

  return userImage;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < images.length; i++) {
  fragment.appendChild(renderTemplate(images[i]));
}
pictures.appendChild(fragment);

var popup = document.querySelector('.big-picture');
var openPopupButton = document.querySelectorAll('.picture__img');
var closePopupButton = popup.querySelectorAll('.big-picture__cancel');

for (var k = 0; k < openPopupButton.length; k++) {
  openPopupButton[k].addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.remove('hidden');
  });
}

for (var j = 0; j < closePopupButton.length; j++) {
  closePopupButton[j].addEventListener('click', function (e) {
    e.preventDefault();
    e.target.closest('.big-picture').classList.add('hidden');
  });
}


/*
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}*/
