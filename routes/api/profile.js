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
    res.status(500).send('Server Error');
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
      check('location', 'is required').not().isEmpty(),
      check('phone_number', 'is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check for the body errors
    const { website, location, phone_number, date } = req.body;

    //Build profile object for profile fields to isert into the database
    const profileField = {};
    //get requist start user when token was sent
    profileField.user = req.user.id;
    if (website) profileField.website = website;
    if (location) profileField.location = location;
    if (phone_number) profileField.phone_number = phone_number;
    if (date) profileField.date = date;

    // if if have an array of data
    /*if(skils){
        profileField.skills =skills.split(',').map(skill=>skill.trim());
    }
    console.log(skills)*/
    console.log(website, location, phone_number, date);
    res.send('Hello!');

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
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
