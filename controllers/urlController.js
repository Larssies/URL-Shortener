const crypto = require('crypto');
const urlModel = require('../models/urlModel');

/**
 * Generate a random short code (default 6 characters).
 * @param {number} length - The length of the code.
 * @returns {string}
 */
function generateShortCode(length = 6) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

/**
 * Renders the home page.
 */
exports.showHomePage = (req, res) => {
  res.render('index', { shortUrl: null, error: null });
};

/**
 * Handles form submissions to shorten a URL.
 */
exports.shortenUrl = (req, res) => {
  const originalUrl = req.body.originalUrl;
  if (!originalUrl) {
    return res.render('index', { shortUrl: null, error: 'Please provide a URL.' });
  }

  let shortCode = generateShortCode();
  while (urlModel.getUrl(shortCode)) {
    shortCode = generateShortCode();
  }

  urlModel.saveUrl(shortCode, originalUrl);

  const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
  res.render('index', { shortUrl, error: null });
};

/**
 * API endpoint to shorten a URL. Returns JSON.
 */
exports.apiShortenUrl = (req, res) => {
  const originalUrl = req.body.originalUrl;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Please provide a URL.' });
  }

  let shortCode = generateShortCode();
  while (urlModel.getUrl(shortCode)) {
    shortCode = generateShortCode();
  }

  urlModel.saveUrl(shortCode, originalUrl);

  const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;
  res.json({ shortUrl });
};

/**
 * Redirects to the original URL given a short code.
 */
exports.redirectToOriginal = (req, res) => {
  const code = req.params.code;
  const originalUrl = urlModel.getUrl(code);

  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.status(404).send('URL not found');
  }
};
