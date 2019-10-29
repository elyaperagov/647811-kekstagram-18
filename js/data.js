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
  var bigPicSocial = bigPic.querySelector('.big-picture__social');

  var showItem = function (item) {
    return item.classList.remove('hidden');
  };

  var hideItem = function (item) {
    return item.classList.add('hidden');
  };

  var showBigPhoto = function (data) {
    showItem(bigPic);
    bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;
    // bigPicSocial.querySelector('.social__likes').querySelector('likes-count').textContent = image.likes;
  };

  var closeBigPhoto = function () {
    return bigPic.classList.add('hidden');
  };

  var closeButton = bigPic.querySelector('#picture-cancel');

  var socialComments = document.querySelector('.social__comments');
  //  var socialComment = document.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');

  // ШАБЛОН
  function renderTemplate(image) {
    var userImage = template.cloneNode(true);
    //  var image = images[i];

    userImage.querySelector('.picture__img').src = image.url;
    userImage.querySelector('.picture__likes').textContent = image.likes;
    userImage.querySelector('.picture__comments').textContent = image.messages;
    userImage.addEventListener('click', function () {
      showBigPhoto(image);

      bigPicSocial.querySelector('.social__likes').querySelector('.likes-count').textContent = image.likes;
      bigPicSocial.querySelector('.social__comment-count').querySelector('.comments-count').textContent = image.messages;
      bigPicSocial.querySelector('.social__caption').textContent = image.description;
      // bigPicSocial.querySelector('.social__comment').querySelector('.social__text').textContent = image.messages;
      bigPicSocial.querySelector('.comments-count').textContent = image.comments.length;
      closeButton.addEventListener('click', function () {
        closeBigPhoto(image);
        var renderComments = function (comments, number) {
          socialComments.innerHTML = '';
          for (var i = 0; i <= comments.length && i < number; i++) {
            var li = document.createElement('li');
            li.classList = 'social__comment ';

            var img = document.createElement('img');
            img.classList = 'social__picture';
            img.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
            img.width = '35';
            img.height = '35';
            img.alt = 'Аватар комментатора фотографии';
            var paragraph = document.createElement('p');
            paragraph.classList = 'social__text';
            paragraph.textContent = comments[i].message;
            li.appendChild(img);
            li.appendChild(paragraph);
            socialComments.appendChild(li);
          }

          if (number > comments.length) {
            commentsLoader.classList.add('visually-hidden');
          }
          commentsLoader.classList.remove('visually-hidden');

        };
        var commentsNumber = 5;

        renderComments(image.comments, commentsNumber);

        commentsLoader.addEventListener('click', function () {
        commentsNumber += 1;
        renderComments(image.comments, commentsNumber);
      });
      });

    });

    return userImage;
  }

  function getImage(array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    pictures.appendChild(fragment);
  }
  /*
  var onDataLoad = function (data) {
    images = data;
    getImage(images);
  };

  window.backend.onRequestLoad(onDataLoad, window.backend.onErrorRequest);
*/

  // СООБЩЕНИЕ ОБ ОШИБКЕ
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(getImage, errorHandler);

  window.data = {
    getImage: getImage,
    getRandomNumber: getRandomNumber,
    renderTemplate: renderTemplate,
    hideItem: hideItem
  };


})();

