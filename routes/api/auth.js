// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');// to ivoking password pakage
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route => get api/auth
//@dsec   => test route
//@access => public 'IF U NEED AN ACCESS'

router.get('/', auth , async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});


// @route => post api/auth
//@dsec   => Aunthenticate auth & get token
//@access => public 'IF U NEED AN ACCESS'

router.post(
    '/',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      //to handle response
      const errors = validationResult(req);
      //check for errors
      if (!errors.isEmpty()) {
        //if any of this requirements don't match we will git this respone
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
      try {
        //see if the user exsist
        let user = await User.findOne({ email });

        if (!user) {
         return res.
         status(400).
         json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
     const isMatch = await bcrypt.compare(password , user.password);

     if(!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
     }

  const payload = {
    user : {
      id : user.id
  
    }
  }
  //log in validation
  jwt.sign( 
    payload,
     config.get('jwtSecret'), //Token
     {expiresIn:360000},
     (err,token)=>{
      if(err) throw err;
      res.json({ token });
     }
    );
       
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
      }
  
    }
  );
module.exports = router;
