'use strict';

(function () {

  // var setupDialogElement = document.querySelector('.setup');
  // var dialogHandler = setupDialogElement.querySelector('.upload');

  var allEffects = {
    none: {
      class: 'effects__preview--none'
    },
    chrome: {
      element: effectChrome,
      class: 'effects__preview--chrome',
      css: 'grayscale',
      max: 1,
      min: 0
    },

    sepia: {
      element: effectSepia,
      class: 'effects__preview--sepia',
      css: 'sepia',
      max: 1,
      min: 0
    },
    marvin: {
      element: effectMarvin,
      class: 'effects__preview--marvin',
      css: 'invert',
      max: 100,
      min: 0,
      postFix: '%'
    },
    phobos: {
      element: effectPhobos,
      class: 'effects__preview--phobos',
      css: 'blur',
      max: 3,
      min: 0,
      postFix: 'px'
    },
    heat: {
      element: effectHeat,
      class: 'effects__preview--heat',
      css: 'brightness',
      max: 3,
      min: 1
    }
  };

  var pin = document.querySelector('.effect-level__pin');
  var imagePreview = document.querySelector('.img-upload__preview');

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      pin.style.left = (pin.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');
  // var toggle = effectList.querySelector('input');

  /*
  var classReset = function (list) {
    for (var i = 0; i < list.length; i++) {
    imagePreview.classList.remove(list[i].class);
    }
  }

  var p = function(object) {
    var list = Object.values(object);
    for (var i = 0; i < list.length; i++) {
      list[i].element.addEventListener('click', function (evt) {
        classReset(list);
        imagePreview.classList.add(list[i].class);
      });
    }
  }


  p(allEffects);
  */

  var classReset = function () {
    imagePreview.classList.remove(allEffects.chrome.class);
    imagePreview.classList.remove(allEffects.sepia.class);
    imagePreview.classList.remove(allEffects.marvin.class);
    imagePreview.classList.remove(allEffects.phobos.class);
    imagePreview.classList.remove(allEffects.heat.class);
  };

  effectChrome.addEventListener('click', function () {
    classReset();
    imagePreview.classList.add(allEffects.chrome.class);
  });

  effectSepia.addEventListener('click', function () {
    classReset();
    imagePreview.classList.add(allEffects.sepia.class);
  });

  effectMarvin.addEventListener('click', function () {
    classReset();
    imagePreview.classList.add(allEffects.marvin.class);
  });

  effectPhobos.addEventListener('click', function () {
    classReset();
    imagePreview.classList.add(allEffects.phobos.class);
  });

  effectHeat.addEventListener('click', function () {
    classReset();
    imagePreview.classList.add(allEffects.heat.class);
  });


})();
