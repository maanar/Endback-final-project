// which will handel getting adjacent web for authentication
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route => GET api/profile/me
//@dsec   => Get current users profile
//@access => private

router.get('/me', auth, async (req, res) => {
  try {
    //find profile
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user ' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route => Post api/profile
//@dsec   => Create or update users profile
//@access => private
router.post(
  '/',
  [
    auth,
    [
      check('city', 'is required').not().isEmpty(),
      check('country', 'is required').not().isEmpty(),
      check('phone_number', 'is required').not().isEmpty(),
      check('date', 'is required').not().isEmpty(),
      check('gander', 'is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check for the body errors
    const { city, country, phone_number, date ,gander} = req.body;

    //Build profile object for profile fields to isert into the database
    const profileField = {};
    //get requist start user when token was sent
    profileField.user = req.user.id;
    if (city) profileField.website = city; 
    if (country) profileField.location = country;
    if (phone_number) profileField.phone_number = phone_number;
    if (date) profileField.date = date;
    if (gander) profileField.date = gander;

    // if if have an array of data
    /*if(skils){
        profileField.skills =skills.split(',').map(skill=>skill.trim());
    }
    console.log(skills)*/
    console.log(website, location, phone_number, date);
    return res.send(
      'Hello!',
    );

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update if there's profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileField },
          { new: true }
        );
        return res.json(profile);
      }
      //Create if there's no profile
      profile = new Profile(profileField);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
); 

// @route => Get api/profile
//@dsec   => Get all profiles
//@access => public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.findOne().populate('user', ['name', 'avatar']);
    res.json(profiles); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route => Get api/profile/user/user:id
//@dsec   => Get profile by user ID
//@access => public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id}
    ).populate('user', ['name', 'avatar']);
    if (!profile)
      return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route => Delete api/profile
//@dsec   => Delete profile , user& Products
//@access => privat
router.delete('/', auth,async (req, res) => {
  try {
    //todo-remove users posts

    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({msg:'User deleted'}); 
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

