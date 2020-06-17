const express = require('express');
const bcyptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//@route    POST api/users
//@des      regiter a new user
//@acess    public

router.post(
  '/',
  [
    check('name', 'name is required ').not().isEmpty(),
    check('email', 'email must be correct').isEmail(),

    check('password', 'Password length must be 3').isLength({ min: 3 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User Already Registed' });
      }

      user = new User({
        name,
        password,
        email,
      });

      const salt = await bcyptjs.genSalt(10);
      user.password = await bcyptjs.hash(password, salt);

      user = await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ server: 'server error ' });
    }
  }
);

module.exports = router;
