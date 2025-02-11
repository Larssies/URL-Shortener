const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/', urlController.showHomePage);
router.post('/shorten', urlController.shortenUrl);
router.get('/:code', urlController.redirectToOriginal);

module.exports = router;
