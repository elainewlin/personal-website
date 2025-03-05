// Code snippets from the post, Simple non-cryptographic hash functions in Javascript.
// Do NOT use these for passwords - use a library instead.

const mod_hash = (num) => num % 5;

// Magic number.
const DJB_IV = 5381;

function djbx33a(str) {
  let hash = DJB_IV;

  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash >>> 0;
}

// Magic numbers, base 16.
const FNV_PRIME = 0x01000193
const FNV_IV = 0x811c9dc5

function fnv1a_32(str) {
  let hash = FNV_IV;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * FNV_PRIME) >>> 0;
  }
  return hash;
}