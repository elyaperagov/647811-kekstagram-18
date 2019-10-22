'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  window.pictures = pictures;
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
  window.images = images;
  for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: getRandomNumber(likes.minimum, likes.maximum),
      messages: getRandomNumber(messages.minimum, messages.maximum)
    });
  }


  // ОТКРЫВАНИЕ И ЗАКРЫВАНИЕ БОЛЬШОЙ КАРТИНКИ
  var bigPic = document.querySelector('.big-picture');

  var showItem = function (item) {
    return item.classList.remove('hidden');
  };

  var hideItem = function (item) {
    return item.classList.add('hidden');
  };

  var showBigPhoto = function (data) {
    showItem(bigPic);
    bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;
  };

  var closeBigPhoto = function () {
    return bigPic.classList.add('hidden');
  };

  var closeButton = bigPic.querySelector('#picture-cancel');


  // ШАБЛОН
  function renderTemplate(image) {
    var userImage = template.cloneNode(true);
    //  var image = images[i];

    userImage.querySelector('.picture__img').src = image.url;
    userImage.querySelector('.picture__likes').textContent = image.likes;
    userImage.querySelector('.picture__comments').textContent = image.messages;
    userImage.addEventListener('click', function () {
      showBigPhoto(image);
      closeButton.addEventListener('click', function () {
        closeBigPhoto(image);
      });
    });

    return userImage;
  }

  function getImage(array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    return fragment;
  }
  /*
  var onDataLoad = function (data) {
    images = data;
    getImage(images);
  };

  window.backend.onRequestLoad(onDataLoad, window.backend.onErrorRequest);
*/

  // СООБЩЕНИЕ ОБ ОШИБКЕ
  /*  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };*/

  //  window.backend.load(getImage, errorHandler);

  window.data = {
    getImage: getImage,
    getRandomNumber: getRandomNumber,
    renderTemplate: renderTemplate,
    hideItem: hideItem
  };


})();

