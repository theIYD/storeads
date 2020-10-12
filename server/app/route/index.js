const express = require('express');
const router = express.Router();

const auth = require('./auth');
const story = require('./story');

router.use('/auth', auth);
router.use('/story', story);

module.exports = router;
