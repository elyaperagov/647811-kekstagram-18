'use strict';

(function () {

  var COMMENTS = 5;

  var Likes = {
    MINIMUM: 15,
    MAXIMUM: 200
  };

  var Messages = {
    MINIMUM: 1,
    MAXIMUM: 20
  };

  var pictures = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var bigPic = document.querySelector('.big-picture');
  var bigPicSocial = bigPic.querySelector('.big-picture__social');
  var closeButton = bigPic.querySelector('#picture-cancel');
  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');

  var images = [];
  for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(Likes.MINIMUM, Likes.MAXIMUM),
      messages: window.helpers.getRandomNumber(Messages.MINIMUM, Messages.MAXIMUM)
    });
  }

  var renderComments = function (comments) {
    socialComments.innerHTML = '';
    var li = document.createElement('li');
    li.classList.add('social__comment');
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments.avatar;
    img.width = '35';
    img.height = '35';
    img.alt = comments.name;
    var paragraph = document.createElement('p');
    paragraph.classList.add('social__text');
    paragraph.textContent = comments.message;
    li.appendChild(img);
    li.appendChild(paragraph);
    return li;
  };

  var generateComment = function (comments, number, handler) {
    var fragment = document.createDocumentFragment();
    var currentCount = 0;
    for (var i = 0; i < comments.length && i < number; i++) {
      fragment.appendChild(renderComments(comments[i]));
      currentCount++;
    }
    socialComments.appendChild(fragment);

    bigPicSocial.querySelector('.comments__current-count').textContent = currentCount;

    if (number > comments.length) {
      commentsLoader.classList.add('visually-hidden');
      commentsLoader.removeEventListener('click', handler);
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
  };

  // ШАБЛОН
  var renderTemplate = function (image) {
    var userImage = template.cloneNode(true);

    userImage.querySelector('.picture__img').src = image.url;
    userImage.querySelector('.picture__likes').textContent = image.likes;
    userImage.querySelector('.picture__comments').textContent = image.comments.length;
    userImage.addEventListener('click', function () {
      window.fullsize.showBigPhoto(image);

      bigPicSocial.querySelector('.likes-count').textContent = image.likes;
      bigPicSocial.querySelector('.social__caption').textContent = image.description;
      bigPicSocial.querySelector('.comments-count').textContent = image.comments.length;

      var commentsNumber = COMMENTS;

      var renderCommentsHandler = function () {
        commentsNumber += COMMENTS;
        generateComment(image.comments, commentsNumber, renderCommentsHandler);
      };

      generateComment(image.comments, commentsNumber, renderCommentsHandler);

      commentsLoader.addEventListener('click', renderCommentsHandler);
    });

    closeButton.addEventListener('click', window.fullsize.closeBigPhoto);

    return userImage;
  };

  var getImage = function (array) {
    var fragment = document.createDocumentFragment();
    var filters = document.querySelector('.img-filters');
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    pictures.appendChild(fragment);
    filters.classList.remove('img-filters--inactive');
  };

  // СОРТИРОВКА

  var successHandler = function (data) {
    var photos = data;
    getImage(photos);

    var popularPhotosHandler = function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      getImage(photos);
      evt.target.classList.add('img-filters__button--active');
    };

    var randomPhotosHandler = function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      var uniquePhotos =
        photos.filter(function (it, i) {
          return photos.indexOf(it) === i;
        });
      getImage(window.helpers.sortRandomPhotos(uniquePhotos));
      evt.target.classList.add('img-filters__button--active');
    };

    var discussedPhotosHandler = function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      getImage(window.helpers.sortByComments(photos));
      evt.target.classList.add('img-filters__button--active');
    };

    window.sort.popular.addEventListener('click', window.debounce(function (evt) {
      popularPhotosHandler(evt);
    }));
    window.sort.discussed.addEventListener('click', window.debounce(function (evt) {
      discussedPhotosHandler(evt);
    }));
    window.sort.random.addEventListener('click', window.debounce(function (evt) {
      randomPhotosHandler(evt);
    }));
  };

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

  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend.load(URL, successHandler, errorHandler);

  window.data = {
    bigPic: bigPic,
    pictures: pictures
  };

})();

