/* Password protection for the NDA case studies.
   GitHub Pages can't password-protect a path, so the protected HTML is encrypted at build time
   and decrypted in the browser by js/nda.js once the visitor enters the password.
   AES-256-GCM with a PBKDF2-SHA256 key: the format matches WebCrypto's, which js/nda.js uses. */
'use strict';
const crypto = require('crypto');

const ITERATIONS = 310000;

function encrypt(plaintext, password, { iterations = ITERATIONS } = {}) {
  if (!password) throw new Error('encrypt: a password is required');
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  // WebCrypto expects the auth tag appended to the ciphertext.
  const data = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final(), cipher.getAuthTag()]);
  return { v: 1, iterations, salt: salt.toString('base64'), iv: iv.toString('base64'), data: data.toString('base64') };
}

module.exports = { encrypt, ITERATIONS };
