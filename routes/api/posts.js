// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();

// @route => get api/posts
//@dsec   => test route
//@access => public 'IF U NEED AN ACCESS'

router.get('/', (req, res) => res.send('Posts route'));
module.exports = router;
