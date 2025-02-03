const urlDatabase = {};

/**
 * Save a URL mapping.
 * @param {string} code - The short code.
 * @param {string} originalUrl - The original URL.
 */
function saveUrl(code, originalUrl) {
  urlDatabase[code] = originalUrl;
}

/**
 * Get the original URL for a given code.
 * @param {string} code - The short code.
 * @returns {string|undefined} - The original URL or undefined if not found.
 */
function getUrl(code) {
  return urlDatabase[code];
}

module.exports = {
  saveUrl,
  getUrl,
};
