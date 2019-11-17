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
  var form = document.querySelector('.img-upload__form');
  var formOverlay = document.querySelector('.img-upload__overlay');
  var main = document.querySelector('main');

  var images = [];
  window.images = images;
  for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(Likes.MINIMUM, Likes.MAXIMUM),
      messages: window.helpers.getRandomNumber(Messages.MINIMUM, Messages.MAXIMUM)
    });
  }

  var renderComments = function (comments, number, handler) {
    var currentCount = 0;
    var commentTemplate = document.querySelector('#comment').content;
    socialComments.innerHTML = '';
    for (var i = 0; i < comments.length && i < number; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comments[i].avatar;
      commentElement.querySelector('.social__text').textContent = comments[i].message;
      commentElement.querySelector('.social__picture').alt = comments[i].name;
      socialComments.appendChild(commentElement);
      currentCount++;
    }

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
        renderComments(image.comments, commentsNumber, renderCommentsHandler);
      };

      renderComments(image.comments, commentsNumber, renderCommentsHandler);

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


  // ОТПРАВКА ФОРМЫ С ФОТО
  var sendFormCallback = function () {
    window.helpers.hideItem(formOverlay);
    main.classList.add('modal-open');
    openSuccess();
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    window.backend.sendForm(new FormData(form), sendFormCallback, openError);
  });

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var openSuccess = function () {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var successClickHandler = function () {
      if (success) {
        main.removeChild(success);
      }
      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', succesKeydownHandler);
    };

    document.addEventListener('click', successClickHandler);

    var succesKeydownHandler = function (evt) {
      window.helpers.isEscEvent(evt, successClickHandler);
    };

    document.addEventListener('keydown', succesKeydownHandler);
  };

  var openError = function () {
    formOverlay.classList.add('hidden');
    var errorTemplate = document.querySelector('#error').content;
    var errorPopup = errorTemplate.cloneNode(true);
    main.appendChild(errorPopup);
    var error = document.querySelector('.error');
    var closeError = function () {
      if (error) {
        main.removeChild(error);
      }
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', errorKeydownHandler);
    };

    document.addEventListener('click', closeError);

    var errorKeydownHandler = function (evt) {
      window.helpers.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', errorKeydownHandler);
  };

  window.data = {
    bigPic: bigPic,
    bigPicSocial: bigPicSocial,
    pictures: pictures
  };

})();

