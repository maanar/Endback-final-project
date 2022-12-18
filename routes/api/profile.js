// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();

// @route => get api/profile
//@dsec   => test route
//@access => public 'IF U NEED AN ACCESS'

router.get('/', (req, res) => res.send('Profile route'));
module.exports = router;
