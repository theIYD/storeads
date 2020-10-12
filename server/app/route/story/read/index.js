const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../../../middlewares/token');

const put = require('./put');

router.put('/:storyId', verifyToken, put);

module.exports = router;
