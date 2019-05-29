const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Profile and User Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ message: 'Profile works' }));

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'users',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
// router.get('/all', (req, res) => {
//   const errors = {};

//   Profile.find()
//     .populate('user', ['name', 'avatar'])
//     .then(profiles => {
//       if (!profiles) {
//         errors.noprofiles = 'There are no profiles';
//         return res.status(404).json(errors);
//       }

//       res.json(profiles);
//     })
//     .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
// });

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
// router.get('/handle/:handle', (req, res) => {
//   const errors = {};

//   Profile.findOne({ handle: req.params.handle })
//     .populate('user', ['name', 'avatar'])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = 'There is no profile for this user';
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err => res.status(404).json(err));
// });

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
// router.get('/user/:user_id', (req, res) => {
//   const errors = {};

//   Profile.findOne({ user: req.params.user_id })
//     .populate('user', ['name', 'avatar'])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = 'There is no profile for this user';
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: 'There is no profile for this user' })
//     );
// });

// @route   POST api/profile
// @desc    Create/update user's profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills - split csv into array
    if (req.body.skills) {
      profileFields.skills = req.body.skills
        .split(',')
        .map(skill => skill.trim());
    }

    // social links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
// router.post(
//   '/experience',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateExperienceInput(req.body);

//     // check validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newExp = {
//         title: req.body.title,
//         company: req.body.company,
//         location: req.body.location,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to exp array
//       profile.experience.unshift(newExp);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
// router.post(
//   '/education',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateEducationInput(req.body);

//     // check validation
//     if (!isValid) {
//       // Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newEdu = {
//         school: req.body.school,
//         degree: req.body.degree,
//         fieldofstudy: req.body.fieldofstudy,
//         from: req.body.from,
//         to: req.body.to,
//         current: req.body.current,
//         description: req.body.description
//       };

//       // Add to edu array
//       profile.education.unshift(newEdu);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );

// @route   DELETE api/profile/experience/:exp_id
// @desc    Remove experience from profile
// @access  Private
// router.delete(
//   '/experience/:exp_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.experience
//           .map(item => item.id)
//           .indexOf(req.params.exp_id);

//         // Splice out of array
//         profile.experience.splice(removeIndex, 1);

//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @route   DELETE api/profile/education/:edu_id
// @desc    Remove education from profile
// @access  Private
// router.delete(
//   '/education/:edu_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.education
//           .map(item => item.id)
//           .indexOf(req.params.edu_id);

//         // Splice out of array
//         profile.education.splice(removeIndex, 1);

//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
// router.delete(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOneAndRemove({ user: req.user.id }).then(() => {
//       User.findOneAndRemove({ _id: req.user.id }).then(() =>
//         res.json({ success: true })
//       );
//     });
//   }
// );

module.exports = router;
