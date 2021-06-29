const express = require('express');
const jwt = require('jsonwebtoken');
const checkAuthentication = require('../middleware/check-authentication');
const nodemailer = require('nodemailer');
const mailerService = require('../config/mailer-keys').service;
const mailerAuth = require('../config/mailer-keys').auth;
const mailerTransporter = nodemailer.createTransport({
  service: mailerService,
  auth: mailerAuth
});

const router = express.Router();

const BookProperty = require('../models/BookProperty');


router.get('/', function(req, res) {
  BookProperty.find()
  .populate({ path: 'propertyId', model: Property })
  .then(bookProperties => { return res.json({ bookings: bookProperties })})
  .catch(err => res.status(500).json({ err: err }));
});

router.get('/byUserId', checkAuthentication, function(req, res) {
  let decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
  let userId = decoded.userId;
  
  BookProperty.find({ userId: userId })
  .populate({ path: 'propertyId', model: Property })
  .then(bookProperties => res.status(200).json({ myBookings: bookProperties }))
  .catch(err => res.status(500).json({ error: err }));
});

router.post('/', checkAuthentication, function(req, res) {
  let decoded = jwt.decode(req.headers.authorization.split(" ")[1]);

  let userId = decoded.userId;
  let propertyId = req.body.propertyId;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;

  let inputStartDate = new Date(startDate);
  let inputEndDate = new Date(endDate);

  const email = decoded.email;
  let emailSD = inputStartDate.toLocaleString().split(',')[0];
  let emailED = inputEndDate.toLocaleString().split(',')[0];
  const mailDetails = {
    from: 'Renting Units <renting.units@gmail.com>',
    to: email,
    subject: 'Inregistrare rezervare',
    text: 'A fost creata o rezervare pe platforma Renting! Data de start: ' + emailSD + ', data de incheiere: ' + emailED + '. Plata se va face cash dupa dorinta proprietarului, in functie de indicatiile sale. Multumim pentru folosirea platformei Renting!'
  };

  BookProperty.find({ propertyId: propertyId })
  .exec()
  .then(bookProperties => {
    // Check if booking doesn't OVERLAP
    let ok = true;
    bookProperties.forEach(function(item) {
      let sd = item.startDate, ed = item.endDate;
      let propertyStartDate = new Date(sd), propertyEndDate = new Date(ed);
      if (ok) {
        // Compare exact startDate & endDate
        if (inputStartDate.getTime() === propertyStartDate.getTime() || inputEndDate.getTime() === propertyEndDate.getTime()) {
          ok = false;
        }
        if ( (inputStartDate >= propertyStartDate && inputStartDate <= propertyEndDate) || (inputEndDate >= propertyStartDate && inputEndDate <= propertyEndDate) ) {
          ok = false;
        }
      }
    });
    if (!ok) {
      return res.status(409).json({ message: 'Exista deja o rezervare cu aceste date!' });
    }
    mailerTransporter.sendMail(mailDetails, function(err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    const newBookProperty = new BookProperty({
      userId: userId,
      propertyId: propertyId,
      startDate: startDate,
      endDate: endDate
    });
    newBookProperty.save()
    .then(newBookProperty => res.status(200).json({ newBookProperty: newBookProperty, message: 'Rezervare creata cu succes!' }))
    .catch(err => res.status(500).json({ err: err }));
  })
  .catch(err => res.status(500).json({ err: err }));
});

module.exports = router;