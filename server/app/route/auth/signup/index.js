const express = require('express');
const router = express.Router();

const post = require('./post');

router.post('/', post);

module.exports = router;
