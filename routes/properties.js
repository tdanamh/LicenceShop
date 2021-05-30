const express = require('express');
const adminCheckAuthentication = require('../middleware/admin-check-authentication');

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
      imagesPaths: imagesPaths
    });
    newProperty.save()
    .then(newProperty => res.status(200).json({ property: newProperty, message: 'Proprietate creata cu succes!' }))
    .catch(err => res.status(500).json({ error: err, message: 'Proprietatea nu a putut fi creata!' }));
    
  })
  .catch(err => res.status(500).json({ error: err }));
})

/* DELETE -> admin delete property by id */
router.delete('/:id', adminCheckAuthentication, function(req, res) {
  let propertyId = req.params.id;
  Property.findById(propertyId)
  .then(property => {
    if (!property) {
      return res.status(404).json({ message: 'Proprietate inexistenta!' });
    }
    property.remove()
    .then( () => res.status(200).json({ message: 'Proprietate stearsa!' }))
    .catch(err => res.status(500).json({ error: err }));
  })
  .catch(err => res.status(500).json({ error: err }));
})

router.put('/', adminCheckAuthentication, function(req, res) {
  let propertyId = req.body.propertyId;
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
  let imagesPaths = req.body.imagesPaths;

  Property.findById(propertyId)
  .then(property => {
    property.name = name;
    property.description = description;
    property.address = address;
    property.country = country;
    property.city = city;
    property.pricePerNight = pricePerNight;
    property.adultsNumber = adultsNumber;
    property.roomsNumber = roomsNumber;
    property.dimmension = dimmension;
    property.balcony = balcony;
    property.privateBathroom = privateBathroom;
    property.airConditioning = airConditioning;
    property.freeParking = freeParking;
    property.breakfastIncluded = breakfastIncluded;
    property.petsAllowed = petsAllowed;
    property.distanceFromCenter = distanceFromCenter;
    property.imagesPaths = imagesPaths;

    property.save()
    .catch(err => res.status(500).json({ error: err }));

    res.status(200).json({ message: 'Proprietate modificata cu succes!' });
  })
  .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;