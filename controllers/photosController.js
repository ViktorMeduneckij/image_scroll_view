const flickrUrl = 'https://api.flickr.com/services/rest/';
const constants = require('../constants/const');
let request = require('request');

/**
 * Helper function to gather photos data into objects and send it to frontend.
 * @param {object} res response object used in request().
 * @param {object} flickrJson Json parsed Flickr response.
 */
function gatherPicturesObjects(res, flickrJson) {
  let imagesArray = [];

  flickrJson.photos.photo.forEach(function(photo) {
    let photoNode = {
      id: photo.id,
      farm: photo.farm,
      title: photo.title,
      secret: photo.secret
    }
    imagesArray.push(photoNode);
  })
  res.status(200).send(imagesArray);
}

/**
 * Exportable function which handles Flickr api call.
 */
module.exports.getPhotos = function retreivePhotos(req, res) {
  request(flickrUrl + '?method=flickr.photos.getRecent&api_key='+ constants.apiKey +'&format=json&nojsoncallback=1', function(err, response, body) {
    if (err) {
      res.status(422).send(err);
      return;
    }
    gatherPicturesObjects(res, JSON.parse(body));
  });
}

