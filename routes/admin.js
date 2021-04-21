const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').JWT_KEY;

const router = express.Router();
const saltRounds = 10;

const User = require('../models/User');

/* POST -> login using email && password */
router.post('/login', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  User.find({ email: email })
  .exec()
  .then(user => {
    if (user.length === 0) {
      return res.status(404).json({ message: 'Cont inexistent!' });
    }
    if (user[0].isAdmin === false) {
      return res.status(401).json({ message: 'Credentiale gresite!' });
    }
    bcrypt.compare(password, user[0].password, function(err, result) {
      if (result === false) {
        return res.status(401).json({ message: 'Credentiale gresite!' });
      }
      let token = jwt.sign({
        userId: user[0]._id,
        email: user[0].email,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        isAdmin: user[0].isAdmin,
      }, jwtKey, { expiresIn: "5h" });
      return res.status(202).json({ token: token, message: 'Autentificare reusita!' });
    });
  })
  .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;