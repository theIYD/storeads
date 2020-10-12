const express = require('express');
const router = express.Router();

const signIn = require('./signin');
const signUp = require('./signup');

router.use('/signIn', signIn);
router.use('/signUp', signUp);

module.exports = router;
