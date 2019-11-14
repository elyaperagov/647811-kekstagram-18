'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  window.pictures = pictures;
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;
  var bigPic = document.querySelector('.big-picture');
  var bigPicSocial = bigPic.querySelector('.big-picture__social');


  var likes = {
    minimum: 15,
    maximum: 200
  };


  var messages = {
    minimum: 1,
    maximum: 20
  };

  var images = [];
  window.images = images;
  for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(likes.minimum, likes.maximum),
      messages: window.helpers.getRandomNumber(messages.minimum, messages.maximum)
    });
  }

  // ОТРИСОВКА БЛОКА С КОММЕНТАРИЯМИ
  var renderComments = function (comments, number) {
    socialComments.innerHTML = '';
    for (var i = 0; i < comments.length && i < number; i++) {
      var li = document.createElement('li');
      li.classList = 'social__comment ';
      var img = document.createElement('img');
      img.classList = 'social__picture';
      img.src = 'img/avatar-' + window.helpers.getRandomNumber(1, 6) + '.svg';
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
    } else {
      commentsLoader.classList.remove('visually-hidden');
    }
  };

  var closeButton = bigPic.querySelector('#picture-cancel');
  var socialComments = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');

  // ШАБЛОН
  function renderTemplate(image) {
    var userImage = template.cloneNode(true);

    userImage.querySelector('.picture__img').src = image.url;
    userImage.querySelector('.picture__likes').textContent = image.likes;
    userImage.querySelector('.picture__comments').textContent = image.messages;
    userImage.addEventListener('click', function () {
      window.fullsize.showBigPhoto(image);

      bigPicSocial.querySelector('.social__likes').querySelector('.likes-count').textContent = image.likes;
      bigPicSocial.querySelector('.social__comment-count').querySelector('.comments-count').textContent = image.messages;
      bigPicSocial.querySelector('.social__caption').textContent = image.description;
      // bigPicSocial.querySelector('.social__comment').querySelector('.social__text').textContent = image.messages;
      bigPicSocial.querySelector('.comments-count').textContent = image.comments.length;

      var commentsNumber = 5;

      renderComments(image.comments, commentsNumber);

      commentsLoader.addEventListener('click', function () {
        commentsNumber += 5;
        renderComments(image.comments, commentsNumber);
      });
    });

    closeButton.addEventListener('click', function () {
      window.fullsize.closeBigPhoto(image);
    });

    return userImage;
  }

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

    var popularPhotosHandler = window.debounce(function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      getImage(photos);
      evt.target.classList.add('img-filters__button--active');
    });

    var randomPhotosHandler = window.debounce(function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      var uniquePhotos =
        photos.filter(function (it, i) {
          return photos.indexOf(it) === i;
        });
      window.debounce(getImage(window.helpers.sortRandomPhotos(uniquePhotos)));
      evt.target.classList.add('img-filters__button--active');
    });

    var discussedPhotosHandler = window.debounce(function (evt) {
      window.sort.removePictures();
      window.sort.removeFilter();
      window.debounce(getImage(window.helpers.sortByComments(photos)));
      evt.target.classList.add('img-filters__button--active');
    });

    window.sort.popular.addEventListener('click', popularPhotosHandler);
    window.sort.discussed.addEventListener('click', discussedPhotosHandler);
    window.sort.random.addEventListener('click', randomPhotosHandler);

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
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');

  var sendFormCallback = function () {
    window.helpers.hideItem(form);
    openSuccess();
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    window.backend.sendForm(new FormData(form), sendFormCallback, openError);
  });

  var openSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successPopup = successTemplate.cloneNode(true).querySelector('.success');

    main.appendChild(successPopup);

    var successButton = document.querySelector('.success__button');

    var closeSuccessHandler = function () {
      main.removeChild(successPopup);
      successButton.removeEventListener('click', closeSuccessHandler);
      document.removeEventListener('keydown', escSuccessHandler);
    };

    successButton.addEventListener('click', closeSuccessHandler);

    var escSuccessHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccessHandler();
      }
    };

    document.addEventListener('keydown', escSuccessHandler);

    document.addEventListener('click', function (evt) {
      if (evt.target === successPopup) {
        closeSuccessHandler();
      }
    });
  };

  var openError = function () {
    window.helpers.hideItem(form);
    var errorTemplate = document.querySelector('#error').content;

    var errorPopup = errorTemplate.cloneNode(true).querySelector('.error');

    main.appendChild(errorPopup);

    var errorButton = document.querySelector('.error__button');

    var closeErrorHandler = function () {
      main.removeChild(errorPopup);
      errorButton.removeEventListener('click', closeErrorHandler);
      document.removeEventListener('keydown', escErrorHandler);
    };

    errorButton.addEventListener('click', closeErrorHandler);

    var escErrorHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorHandler();
      }
    };

    document.addEventListener('keydown', escErrorHandler);

    document.addEventListener('click', function (evt) {
      if (evt.target === errorPopup) {
        closeErrorHandler();
      }
    });

  };

  window.data = {
    bigPic: bigPic,
    bigPicSocial: bigPicSocial,
    pictures: pictures,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();

