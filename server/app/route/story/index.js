const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../../middlewares/token');

const read = require('./read');
const get = require('./get');
const post = require('./post');

router.get('/', verifyToken, get.getStories);
router.get('/:storyId', verifyToken, get.getStory);
router.post('/', verifyToken, post);
router.use('/read', read);

module.exports = router;
