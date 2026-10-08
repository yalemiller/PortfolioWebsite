'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { webcrypto } = require('node:crypto');
const { encrypt } = require('../lib/nda');
const { decrypt } = require('../js/nda');

/* Few iterations keep the test fast; the format is what matters here. */
const FAST = { iterations: 1000 };

test('the browser decrypts what the build encrypts', async () => {
  const html = '<section class="cs-sec"><p>Under NDA — “quotes”, P&amp;G</p></section>';
  const payload = encrypt(html, 'correct horse', FAST);
  assert.equal(await decrypt(payload, 'correct horse', webcrypto.subtle), html);
});

test('a wrong password is rejected', async () => {
  const payload = encrypt('secret', 'right', FAST);
  await assert.rejects(decrypt(payload, 'wrong', webcrypto.subtle));
});

test('tampered ciphertext is rejected', async () => {
  const payload = encrypt('secret', 'right', FAST);
  const data = Buffer.from(payload.data, 'base64');
  data[0] ^= 1;
  await assert.rejects(decrypt({ ...payload, data: data.toString('base64') }, 'right', webcrypto.subtle));
});

test('each build uses a fresh salt and IV, and the plaintext is not in the payload', () => {
  const a = encrypt('the same text', 'pw', FAST);
  const b = encrypt('the same text', 'pw', FAST);
  assert.notEqual(a.salt, b.salt);
  assert.notEqual(a.iv, b.iv);
  assert.ok(!JSON.stringify(a).includes('the same text'));
});

test('encrypting without a password fails', () => {
  assert.throws(() => encrypt('x', ''), /password is required/);
});
