(function () {
  'use strict';

  var databaseRoot = 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app';
  var fallbackHeader = '../../assets/bmh-logo-discharge.jpg';

  function showHeaderFallback(img) {
    var fallback = img.parentElement.querySelector('.letterhead-fallback');
    img.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
  }

  function setImage(img, src) {
    if (!img || !src) return;
    img.onerror = function () {
      if (img.src !== new URL(fallbackHeader, window.location.href).href) {
        img.src = fallbackHeader;
        return;
      }
      showHeaderFallback(img);
    };
    img.src = src;
  }

  function loadCurrentLetterhead() {
    var header = document.querySelector('[data-current-header]');
    var footer = document.querySelector('[data-current-footer]');
    setImage(header, fallbackHeader);

    fetch(databaseRoot + '/printLetterhead.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Letterhead request failed');
        return response.json();
      })
      .then(function (letterhead) {
        if (letterhead && letterhead.header) setImage(header, letterhead.header);
        if (footer && letterhead && letterhead.footer) {
          var img = document.createElement('img');
          img.alt = 'Hospital footer';
          img.src = letterhead.footer;
          footer.replaceChildren(img);
        }
      })
      .catch(function () {
        // The bundled hospital header remains visible when the live setting is unavailable.
      });
  }

  document.addEventListener('DOMContentLoaded', loadCurrentLetterhead);
}());

