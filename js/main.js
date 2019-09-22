'use strict';


var pictures = document.querySelector('.pictures');
var template = document.querySelector('#picture').content.querySelector('.picture');

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var likes = {
  minimum: 15,
  maximum: 200
};

var photos = {
  minimum: 1,
  maximum: 25
};

var comments = {
  minimum: 1,
  maximum: 2000
};

var names = ['ААРОН', 'АБАЙ', 'АББАС', 'АБДУЛЛА', 'АБДУЛА', 'АБЕЛЬ', 'АБЕЛЬ', 'АВЕЛ', 'АВЕЛЬ', 'АБОВ', 'АБРАМ', 'АВРААМ', 'АБРЕК', 'АВАЗ'];


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}


var images = [];
  var i;
    for (i = 0; i <= 25; i++) {
    images.push({
    url:'photos/' + getRandomNumber(photos.minimum, photos.maximum) + '.jpg',
      likes: getRandomNumber(likes.minimum, likes.maximum),
      comments:  getRandomNumber(comments.minimum, comments.maximum),
      //names: arrayRandElement(names)
})
}



var renderTemplate = function () {
  var userImage = template.cloneNode(true);

  userImage.querySelector('.picture__img').src = images[i].url;
  userImage.querySelector('.picture__likes').textContent = images[i].likes;
  userImage.querySelector('.picture__comments').textContent = images[i].comments;
  //userImage.querySelector('.picture__comments').textContent = images[i].names;

  return userImage;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < images.length; i++) {
  fragment.appendChild(renderTemplate(images[i]));
}
pictures.appendChild(fragment);

