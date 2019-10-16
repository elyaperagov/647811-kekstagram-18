'use strict';

(function () {

  // var pin = document.querySelector('.effect-level__pin');
  // var effectList = document.querySelector('.effects__list');
  var imagePreview = document.querySelector('.img-upload__preview');
  var effectChrome = document.querySelector('#effect-chrome');
  var effectSepia = document.querySelector('#effect-sepia');
  var effectMarvin = document.querySelector('#effect-marvin');
  var effectPhobos = document.querySelector('#effect-phobos');
  var effectHeat = document.querySelector('#effect-heat');
  // var toggle = effectList.querySelector('input');


  var allEffects = {
    chrome: {
      element: effectChrome,
      class: 'effects__preview--chrome'
    },

    sepia: {
      element: effectSepia,
      class: 'effects__preview--sepia'
    },
    marvin: {
      element: effectMarvin,
      class: 'effects__preview--marvin'
    },
    phobos: {
      element: effectPhobos,
      class: 'effects__preview--phobos'
    },
    heat: {
      element: effectHeat,
      class: 'effects__preview--heat'
    }
  };
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
