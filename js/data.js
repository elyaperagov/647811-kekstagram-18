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

  var images = [];
  window.images = images;
  for (var imageNumber = 1; imageNumber <= 25; imageNumber++) {
    images.push({
      url: 'photos/' + imageNumber + '.jpg',
      likes: window.helpers.getRandomNumber(likes.minimum, likes.maximum),
      messages: window.helpers.getRandomNumber(messages.minimum, messages.maximum)
    });
  }

  // ОТКРЫВАНИЕ И ЗАКРЫВАНИЕ БОЛЬШОЙ КАРТИНКИ
  var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;

  var bigPic = document.querySelector('.big-picture');
  var bigPicSocial = bigPic.querySelector('.big-picture__social');

  var closeBigPhoto = function () {
    window.helpers.hideItem(bigPic);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  var showBigPhoto = function (data) {
    window.helpers.showItem(bigPic);
    bigPic.querySelector('.big-picture__img').querySelector('img').src = data.url;

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeBigPhoto();
      }
    });
  };


  // ОТРИСОВКА БЛОКА С КОММЕНТАРИЯМИ
  var renderComments = function (comments, number) {
    socialComments.innerHTML = '';
    for (var i = 0; i <= comments.length && i < number; i++) {
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
    /*
      for (var i = 0; i < comments.length; i++) {
      socialComments.innerHTML +=
      '<li class="social__comment">' +
         '<img class="social__picture"' +
            'src="img/avatar-' + window.helpers.getRandomNumber(1, 6) + '.svg'
          + 'alt="Автор комментария"'
         +  'width="35" height="35">'
        + '<p class="social__text">' + comments[i].message + '</p>'
    + '</li>';
    console.log(socialComments);
    }*/

    if (number > comments.length) {
      commentsLoader.classList.add('visually-hidden');
    }
    commentsLoader.classList.remove('visually-hidden');

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

      var commentsNumber = 5;

      renderComments(image.comments, commentsNumber);

      commentsLoader.addEventListener('click', function () {
        commentsNumber += 5;
        renderComments(image.comments, commentsNumber);
      });
    });

    closeButton.addEventListener('click', function () {
      closeBigPhoto(image);
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
      removePictures();
      removeFilter();
      getImage(photos);
      evt.target.classList.add('img-filters__button--active');
    });

    var randomPhotosHandler = window.debounce(function (evt) {
      removePictures();
      removeFilter();
      var uniquePhotos =
        photos.filter(function (it, i) {
          return photos.indexOf(it) === i;
        });
      window.debounce(getImage(sortRandomPhotos(uniquePhotos)));
      evt.target.classList.add('img-filters__button--active');
    });

    var discussedPhotosHandler = window.debounce(function (evt) {
      removePictures();
      removeFilter();
      window.debounce(getImage(sortByComments(photos)));
      evt.target.classList.add('img-filters__button--active');
      // console.log(sortByComments(photos));
    });

    popular.addEventListener('click', popularPhotosHandler);
    discussed.addEventListener('click', discussedPhotosHandler);
    random.addEventListener('click', randomPhotosHandler);

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
    // почему при объявлении до main.appendChild(successPopup); возникает ошибка

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

  // СОРТИРОВКА

  var popular = document.querySelector('#filter-popular');
  var discussed = document.querySelector('#filter-discussed');
  var random = document.querySelector('#filter-random');

  var removePictures = function () {
    var photo = pictures.querySelectorAll('.picture');
    photo.forEach(function (item) {
      pictures.removeChild(item);
    });
  };

  var removeFilter = function () {
    var filters = document.querySelector('.img-filters');
    var filterButtons = filters.querySelectorAll('.img-filters__button');
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortByComments = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var sortRandom = function () {
    return Math.random() - 0.5;
  };

  var sortRandomPhotos = function (arr) {
    return arr.slice(0, 10).sort(sortRandom);
  };

})();

