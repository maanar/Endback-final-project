// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
// const { check, validationResult } = require('express-validator/check');

// @route => post api/users
//@dsec   => register user
//@access => public 'IF U NEED AN ACCESS'

router.post(
  '/',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password wiht 6 or more char').isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    //to handle response
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
      //if any of this requirements don't match we will git this respone
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);
module.exports = router;
