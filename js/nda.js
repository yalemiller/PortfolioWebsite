/* NDA gate: decrypts the case study that lib/nda.js encrypted at build time.
   Loaded only on NDA pages that have protected content. Also exports decrypt() for the tests. */
(function () {
  'use strict';

  function bytes(b64) {
    var bin = atob(b64), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /* Resolves to the HTML string; rejects when the password is wrong. */
  function decrypt(payload, password, subtle) {
    subtle = subtle || window.crypto.subtle;
    return subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return subtle.deriveKey(
          { name: 'PBKDF2', salt: bytes(payload.salt), iterations: payload.iterations, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      })
      .then(function (key) { return subtle.decrypt({ name: 'AES-GCM', iv: bytes(payload.iv) }, key, bytes(payload.data)); })
      .then(function (plain) { return new TextDecoder().decode(plain); });
  }

  if (typeof module === 'object' && module.exports) {
    module.exports = { decrypt: decrypt };
    return;
  }

  var gate = document.querySelector('[data-nda]');
  var source = document.querySelector('[data-nda-payload]');
  var target = document.querySelector('[data-nda-content]');
  if (!gate || !source || !target) return;
  var form = gate.querySelector('form');
  var input = gate.querySelector('input');
  var error = gate.querySelector('.nda__error');
  var submit = form.querySelector('button');
  var payload = JSON.parse(source.textContent);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!input.value) return;
    submit.disabled = true;
    error.textContent = '';
    decrypt(payload, input.value).then(function (html) {
      target.innerHTML = html;
      gate.closest('section').remove();
      if (window.YM && window.YM.init) window.YM.init(target);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, function () {
      error.textContent = "That password didn't work. Check it and try again.";
      submit.disabled = false;
      input.select();
    });
  });
})();
