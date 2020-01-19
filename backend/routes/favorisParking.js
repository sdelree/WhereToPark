const express = require('express');
const router = express.Router();
const favorisServices = require('../services/favorisParking');


// GETS
router.get('/', (req, res) => {
  const userId = req.session.user._id;
  favorisServices.getFavoritesByUser(userId)
      .then(favorites=>res.send(favorites))
      .catch(err => res.status(401).send(err));
});

// POST
router.post('/create', (req, res) =>{
  const name = req.body.name;
  const userId=1;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  favorisServices.getFavoritesNumber(userId)
      .then(size=>{
        if (size < 10) {
          favorisServices.createFavoris(name, userId, latitude, longitude)
              .then(favorite=>res.send(favorite))
              .catch(err => res.status(401).send(err));
        } else {
          return Promise.reject('There is already 10 Favorites parkings');
        }
      })
      .catch(err => res.status(401).send(err));
});
// PUT
router.put('/update', (req, res) =>{
  const userId = req.session.user._id;
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  favorisServices.getFavoritesByName(userId,name)
                 .then( favoris =>{
                          if(favoris != null){
                            favorisServices.updateFavorites(vehicleToUpdate)
                              .then(vehicle => {
                                favorisServices.updateFavorites(vehicle._id, {name, latitude, longitude})
                                                .then(updatedVehicle=>res.send(updatedVehicle))
                                                .catch(err => res.status(401).send(err));
                              })
                              .catch(err => res.status(401).send(err));
                          }
                          else{
                               return Promise.reject('This Parking doesn\'t exist');
                          }
                 })
                 .catch(err => res.status(401).send(err));
});


// DELETE
router.delete('/delete/:name', (req, res) => {
  const userId = req.session.user._id;
  const name = req.params.name;
  favorisServices.getFavoritesByName(userId,name)
                 .then(parking=>{
                   if(parking !== null){
                     favorisServices.deleteFavoriteParking(userId, name)
                                    .then(favorite=> res.send(favorite))
                                    .catch(err => res.status(401).send(err));
                   }
                   else {
                       return Promise.reject('This Parking doesn\'t exist');
                   }
                 })
                 .catch(err => res.status(401).send(err));
});
