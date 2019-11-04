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
        commentsNumber += 1;
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
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    pictures.appendChild(fragment);
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

  window.backend.load(URL, getImage, errorHandler);


  // ОТПРАВКА ФОРМЫ С ФОТО
  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (formEvt) {
    formEvt.preventDefault();

    window.backend.sendForm(new FormData(form), function () {
      window.helpers.hideItem(form);
      openSuccess();
    }, openError);
  });

  var openSuccess = function () {
    var successTemplate = document.querySelector('#success')
      .content;

    var successPopup = successTemplate.cloneNode(true).lastElementChild;
    var main = document.querySelector('main');

    main.appendChild(successPopup);

    var successButton = document.querySelector('.success__button');

    var closeSuccess = function () {
      main.removeChild(successPopup);
      successButton.removeEventListener('click', closeSuccess);
      document.removeEventListener('keydown', EscSuccessHandler);
    };

    successButton.addEventListener('click', closeSuccess);

    var EscSuccessHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccess();
      }
    };

    document.addEventListener('keydown', EscSuccessHandler);

    successPopup.addEventListener('click', function (evt) {
      if (evt.target === successPopup) {
        closeSuccess();
      }
    });
  };

  var openError = function () {
    window.helpers.hideItem(form);
    var errorTemplate = document.querySelector('#error')
      .content;

    var errorPopup = errorTemplate.cloneNode(true).lastElementChild;
    var main = document.querySelector('main');

    main.appendChild(errorPopup);

    var closeError = function () {
      main.removeChild(errorPopup);
      document.removeEventListener('keydown', EscErrorHandler);
    };

    var EscErrorHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeError();
      }
    };

    document.addEventListener('keydown', EscErrorHandler);

    errorPopup.addEventListener('click', function (evt) {
      if (evt.target === errorPopup || evt.target.matches('.error__button')) {
        closeError();
      }
    });
  };

})();

