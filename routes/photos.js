var photosController = require('../controllers/photosController.js');

/**
 * Listens to incoming photo related paths 
 * and assigns corresponding functions from controller.
 */
module.exports = function(app) {
  app.get('/get-recent&page=:page', photosController.getPhotos);
}

