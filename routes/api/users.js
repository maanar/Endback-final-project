// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');// to ivoking password pakage
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
 //const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route => post api/users
//@dsec   => register user
//@access => public 'IF U NEED AN ACCESS'

router.post(
  '/',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password wiht 6 or more char').isLength({min: 6,}),
  ],
  async (req, res) => {
    //to handle response
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
      //if any of this requirements don't match we will git this respone
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      //see if the user exsist
      let user = await User.findOne({ email });
      if (user) {
       return res.status(400).json({ errors: [{ msg: 'User already exsist' }] });
      }

      //get user gravatar
      const avatar = gravatar.url(email, { 
        s: '200', //default size
        r: 'pg',   //reading
        d:'mm'    //default image/icon
      });
      
      //instance of user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      
      //return jsonwebtoken
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
   });
     
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
      
    }

  }
);
module.exports = router;
