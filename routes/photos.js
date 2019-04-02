var photosController = require('../controllers/photosController.js');

/**
 * Exported function, which listens to incoming photo related paths 
 * and assigns corresponding functions from controller.
 */
module.exports = function(app) {
  app.get('/get-recent', photosController.getPhotos);
}

