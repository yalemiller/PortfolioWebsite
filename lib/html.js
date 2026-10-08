/* Small HTML string helpers shared by the build and the block renderer. */
'use strict';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Escaped text where *a phrase* becomes <em>a phrase</em>. */
const rich = (s) => esc(s).replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

/* Inline style attribute from an object of custom properties; empty values are skipped. */
function vars(o) {
  const s = Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
  return s ? ` style="${esc(s)}"` : '';
}

/* '1fr 1.6fr' -> 'minmax(0,1fr) minmax(0,1.6fr)' so a long word can't stretch a column. */
const fr = (cols) => cols && cols.trim().split(/\s+/).map((c) => (/fr$/.test(c) ? `minmax(0,${c})` : c)).join(' ');

module.exports = { esc, rich, vars, fr };
