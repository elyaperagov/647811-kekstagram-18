'use strict';

(function () {
  var START_VALUE = 100;

  var effectNone = document.querySelector('#effect-none');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');

  var allEffects = {
    none: {
      element: effectNone,
      class: 'effects__preview--none',
      filter: 'none',
    },
    chrome: {
      element: effectChrome,
      class: 'effects__preview--chrome',
      filter: 'grayscale',
      max: 1,
      min: 0
    },

    sepia: {
      element: effectSepia,
      class: 'effects__preview--sepia',
      filter: 'sepia',
      max: 1,
      min: 0
    },
    marvin: {
      element: effectMarvin,
      class: 'effects__preview--marvin',
      filter: 'invert',
      max: 100,
      min: 0
    },
    phobos: {
      element: effectPhobos,
      class: 'effects__preview--phobos',
      filter: 'blur',
      max: 3,
      min: 0
    },
    heat: {
      element: effectHeat,
      class: 'effects__preview--heat',
      filter: 'brightness',
      max: 3,
      min: 1
    }
  };

  var pin = document.querySelector('.effect-level__pin');
  var imagePreview = document.querySelector('.img-upload__preview');
  var line = document.querySelector('.effect-level__line');
  var currentEffect;
  var effectLevel = document.querySelector('.effect-level');
  var colorDepth = document.querySelector('.effect-level__depth');
  var levelValue = document.querySelector('.effect-level__value');

  var initPin = function (effect) {
    pin.style.left = START_VALUE + '%';
    colorDepth.style.width = START_VALUE + '%';
    currentEffect = effect;
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX; // начальная координата

    var moveRange = line.offsetWidth; // ширина линии
    var getNewOffsetLeft = function (shift) {
      var newOffsetLeft = (pin.offsetLeft - shift) / moveRange * 100;
      if (newOffsetLeft < 0) { // Если текущее положение ползунка меньше 0 или больше 100, то ставим 0 или 100
        newOffsetLeft = 0;
      } else if (newOffsetLeft > 100) {
        newOffsetLeft = 100;
      }
      return newOffsetLeft;
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = startCoords - moveEvt.clientX; // разница координат, на которую сдвинулись
      startCoords = moveEvt.clientX;
      var newCoords = getNewOffsetLeft(shift); // новая координата
      pin.style.left = newCoords + '%'; // новое положение пина из getNewOffset
      var currentFilter = currentEffect.filter; // записываем текцщий фильтр из массива allEffects
      colorDepth.style.width = newCoords + '%'; // применяем новые свойства фильтра исходя из текущего положения пина
      levelValue.setAttribute('value', Math.round(newCoords));
      if (currentFilter === 'blur') {
        imagePreview.style.filter = currentFilter + '(' + Math.floor(currentEffect.max / 100 * newCoords) + 'px)';
      } else if (currentFilter === 'brightness') {
        imagePreview.style.filter = currentFilter + '(' + Math.round(currentEffect.min + ((currentEffect.max - currentEffect.min) / 100 * newCoords)) + ')';
      } else {
        imagePreview.style.filter = currentFilter + '(' + newCoords + '%)';
      }

      currentEffect.current = newCoords / 100; // запоминаем новое положение пина в процентом соотношении относительно длины линии
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

  var classReset = function (elements) {
    var list = Object.values(elements);
    for (var i = 0; i < list.length; i++) {
      imagePreview.classList.remove(list[i].class);
      imagePreview.removeAttribute('style');
    }
  };

  var effectsChange = function (object) {
    var list = Object.values(object);
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].element && list[i].class) {
        list[i].element.addEventListener('click', callBack(i, list));
      }
    }
  };

  var removeLine = function (i, list) {
    if (list[i].class === 'effects__preview--none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  var callBack = function (i, list) {
    return function () {
      removeLine(i, list);
      classReset(list);
      initPin(list[i]);
      imagePreview.classList.add(list[i].class);
    };
  };

  effectsChange(allEffects);

  window.effects = {
    effectLevel: effectLevel
  };

})();
