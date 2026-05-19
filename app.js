(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var imgs = document.querySelectorAll('img[data-fallback]');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('error', function handler(e) {
      var img = e.currentTarget;
      img.removeEventListener('error', handler);
      img.src = img.getAttribute('data-fallback');
    });
  }

  var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxo8Dych0P1DvJCGTDCJX5HiV2kDShpo3a2o1WXc3nnAjg3aVe84xPthfm00pJ4Gw67Cg/exec';
  var form = document.getElementById('leadForm');
  if (!form) return;

  var submitBtn = form.querySelector('.btn-submit');
  var submitLabel = submitBtn.querySelector('strong');
  var successMsg = form.querySelector('.form-success');
  var errorMsg = form.querySelector('.form-error');
  var defaultLabel = submitLabel.textContent;
  var openedAt = Date.now();

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    successMsg.hidden = true;
    errorMsg.hidden = true;

    if (form.elements['website'] && form.elements['website'].value) return;
    if (Date.now() - openedAt < 1500) return;

    submitBtn.disabled = true;
    submitLabel.textContent = 'جاري الإرسال...';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      });
      successMsg.hidden = false;
      form.reset();
      openedAt = Date.now();
    } catch (err) {
      errorMsg.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = defaultLabel;
    }
  });
})();
