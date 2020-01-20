const express = require('express');
const router = express.Router();
const vehiclesService = require('../services/vehicles');


// GETS
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  vehiclesService.getVehiclesById(id)
    .then(vehicle =>{
      if (vehicle.userId === userId) {
        res.send(vehicle);
      } else {
        return Promise.reject(new Error('The connected user is not the vehicle\'s owner'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// GET OWNER BY ID
router.get('/', (req, res) => {
  const userId = req.user._id;
  vehiclesService.getVehiclesByOwner(userId)
    .then(vehicle => res.send(vehicle))
    .catch(err => res.status(401).send(err));
});

// CREATE
router.post('/', (req, res) => {
  const userId = req.user._id;
  const {isElectric, height, name} = req.body;

  vehiclesService.createVehicle(userId, name, isElectric, height)
    .then(vehicle => res.status(201).send(vehicle))
    .catch(err => res.status(500).send(err));
});

// GET VEHICLE BY ID
router.get('/:vehicleId', (req, res) => {
  const userId = req.user._id;
  const vehicleId = req.params.vehicleId;
  vehiclesService.getVehiclesById(vehicleId)
    .then(vehicle=> {
      if (vehicle.userId === userId) {
        res.send(vehicle);
      } else {
        return Promise.reject(new Error('The connected user is not the owner of the vehicle!!'));
      }
    })
    .catch(err => res.status(401).send(err));
});


router.get('/:vehicleName', (req, res) => {
  const userId = req.user._id;
  const vehicleName = req.params.vehicleName;
  vehiclesService.getVehicleByName(vehicleName)
    .then(vehicle=>{
      if (vehicle.userId === userId) {
        res.send(vehicle);
      } else {
        return Promise.reject(new Error('The connected user is not the vehicle\'s owner'));
      }
    })
    .catch(err => res.status(401).send(err));
});


// UPDATE
router.put('/updateType/:vehicleId', (req, res) =>{
  const vehicleToUpdate = req.params.vahicleId;
  const isElectric = req.body.isElectric;
  const height = req.body.height;
  const name = req.body.name;
  vehiclesService.getVehiclesById(vehicleToUpdate)
    .then(vehicle => {
      if (vehicle !== null) {
        vehiclesService.updateVehicle(vehicle._id, {name, isElectric, height})
          .then(updatedVehicle => res.send(updatedVehicle))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This vehicle doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});

// DELETE
router.delete('/:vehicleId', (req, res) =>{
  const id = req.params.vehicleId;
  vehiclesService.getVehiclesById(id)
    .then(vehicle => {
      if (vehicle !== null) {
        vehiclesService.deleteVehicle(vehicle._id)
          .then(updatedVehicle => res.send(updatedVehicle))
          .catch(err => res.status(401).send(err));
      } else {
        return Promise.reject(new Error('This vehicle doesn\'t exist'));
      }
    })
    .catch(err => res.status(401).send(err));
});
module.exports = router;
