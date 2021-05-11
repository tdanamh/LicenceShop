const express = require('express');

const router = express.Router();

const Property = require('../models/Property');

/* GET -> receive all properties */
router.get('/', function(req, res) {
  Property.find()
  .then(properties => res.json(properties));
});

router.get('/:id', function(req, res) {
  Property.findById(req.params.id)
  .then(property => res.json(property))
  .catch(err => res.status(500).json({error: err}));
});

/* POST -> create a new property */
router.post('/', function(req, res) {
  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let country = req.body.country;
  let city = req.body.city;
  let pricePerNight = req.body.pricePerNight;
  let adultsNumber = req.body.adultsNumber;
  let roomsNumber = req.body.roomsNumber;
  let dimmension = req.body.dimmension;
  let balcony = req.body.balcony;
  let privateBathroom = req.body.privateBathroom;
  let airConditioning = req.body.airConditioning;
  let freeParking = req.body.freeParking;
  let breakfastIncluded = req.body.breakfastIncluded;
  let petsAllowed = req.body.petsAllowed;
  let distanceFromCenter = req.body.distanceFromCenter;
  let score = req.body.score;
  let imagesPaths = req.body.imagesPaths;
  Property.find({ name: name })
  .exec()
  .then(property => {
    if (property.length > 0) {
      return res.status(409).json({ message: 'Exista deja o proprietate cu acest nume!' });
    }
    const newProperty = new Property({
      name: name,
      description: description,
      address: address,
      country: country,
      city: city,
      pricePerNight: pricePerNight,
      adultsNumber: adultsNumber,
      roomsNumber: roomsNumber,
      dimmension: dimmension,
      balcony: balcony,
      privateBathroom: privateBathroom,
      airConditioning: airConditioning,
      freeParking: freeParking,
      breakfastIncluded: breakfastIncluded,
      petsAllowed: petsAllowed,
      distanceFromCenter: distanceFromCenter,
      score: score,
      imagesPaths: imagesPaths
    });
    newProperty.save()
    .then(newProperty => res.status(200).json({ property: newProperty, message: 'Proprietate creata cu succes!' }))
    .catch(err => res.status(500).json({ error: err, message: 'Proprietatea nu a putut fi creat!' }));
    
  })
  .catch(err => res.status(500).json({ error: err }));
})

module.exports = router;