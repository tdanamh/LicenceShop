const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').JWT_KEY;
const checkAuthentication = require('../middleware/check-authentication');
const nodemailer = require('nodemailer');
const mailerService = require('../config/mailer-keys').service;
const mailerAuth = require('../config/mailer-keys').auth;
const mailerTransporter = nodemailer.createTransport({
  service: mailerService,
  auth: mailerAuth
});
const router = express.Router();
const saltRounds = 10;
const adminCheckAuthentication = require('../middleware/admin-check-authentication');

const User = require('../models/User');

/* GET -> receive all users */
router.get('/', function(req, res) {
  User.find()
  .then(users => res.json({ users: users }));
});

/* POST -> create a new user */
router.post('/', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let isAdmin = req.body.isAdmin;
  const mailDetails = {
    from: 'Renting Units <renting.units@gmail.com>',
    to: email,
    subject: 'Inregistrare cont',
    text: 'Un cont nou a fost creat pe platforma Renting!'
  };

  User.find({ email: email })
  .exec()
  .then(user => {
    if (user.length > 0) {
      return res.status(409).json({ message: 'Exista deja un cont cu aceasta adresa de email!' });
    }
    bcrypt.hash(password, saltRounds, function(err, hash) {
      const newUser = new User({
        email: email, 
        password: hash,
        firstName: firstName,
        lastName: lastName,
        isAdmin: isAdmin
      });
      newUser.save()
      .then(newUser =>  {
        const token = jwt.sign({
          userId: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          isAdmin: newUser.isAdmin
        }, jwtKey, { expiresIn: "1h" });
        mailerTransporter.sendMail(mailDetails, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
        res.status(200).json({ token: token, message: 'Cont creat cu succes!' })
      })
      .catch(err => res.status(500).json({ error: err, message: 'Contul nu a putut fi creat!' }));
    });
  })
  .catch(err => res.status(500).json({ error: err }));
});

/* PUT -> change firstName/lastName */
router.put('/', checkAuthentication, function(req, res) {
  let decoded = jwt.decode(req.headers.authorization.split(" ")[1]);

  let userId = decoded.userId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  
  User.find({ _id: userId })
  .exec()
  .then(user => {
    if (user.length === 0) {
      return res.status(404).json({ message: 'Cont inexistent!' });
    }
    user[0].firstName = firstName;
    user[0].lastName = lastName;
    user[0].save()
    .then(updatedUser => res.status(200).json({ user: updatedUser, message: 'Cont modificat cu succes!' }))
    .catch(err => res.status(500).json({ error: err, message: 'Contul nu a putut fi modificat!' }));
  })
  .catch(err => res.status(500).json({ error: err }));
})

/* DELETE -> admin delete user by id */
router.delete('/:id', adminCheckAuthentication, function(req, res) {
  let userId = req.params.id;
  User.findById(userId)
  .then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Utilizator inexistent!' });
    }
    user.remove()
    .then( () =>  {
      if (user.isAdmin) {
        return res.status(200).json({ message: 'Utilizator sters!', isAdmin: true })
      }
      return res.status(200).json({ message: 'Utilizator sters!' })
    })
    .catch(err => res.status(500).json({ error: err }));
  })
  .catch(err => res.status(500).json({ error: err }));
})

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
    if (user[0].isAdmin === true) {
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
      }, jwtKey, { expiresIn: "1h" });
      return res.status(202).json({ token: token, message: 'Autentificare reusita!' });
    });
  })
  .catch(err => res.status(500).json({ error: err }));
});

router.get('/check-authentication', checkAuthentication, function(req, res) {
  return res.status(200).json({ message: 'Autentificare valida!' })
});

router.get('/current-user', checkAuthentication, function(req, res) {
  let decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
  let userId = decoded.userId;
  User.findById(userId)
  .exec()
  .then(user => res.status(200).json({ currentUser: user }))
  .catch(err => res.status(500).json({ error: err }));
});

router.put('/reset-password', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.find({ email: email })
  .exec()
  .then(user => {
    const mailDetails = {
      from: 'Renting Units <renting.units@gmail.com>',
      to: email,
      subject: 'Resetare parola',
      text: 'Parola dumneavoastra a fost resetata! Noua parola este: ' + password
    };
    bcrypt.hash(password, saltRounds, function(err, hash) {
      user[0].password = hash;
      user[0].save()
      .then(updatedUser =>  {
        res.status(200).json({ message: 'Parola resetata cu succes!' })
        mailerTransporter.sendMail(mailDetails, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
      })
      .catch(err => res.status(500).json({ error: err }));
    });
  })
  .catch(err => res.status(500).json({ error: err }));
});
module.exports = router;
