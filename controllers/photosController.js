const flickrUrl = 'https://api.flickr.com/services/rest/';
const constants = require('../constants/const');
let request = require('request');

/**
 * Helper function to gather photos data into objects and send it to frontend.
 * @param {object} res response object used in request().
 * @param {object} flickrJson Json parsed Flickr response.
 */
function gatherPicturesObjects(req, res, flickrJson) {
  let imagesArray = [];
  flickrJson.photos.photo.forEach(function(photo) {
    let photoNode = {
      id: photo.id,
      farm: photo.farm,
      title: photo.title,
      secret: photo.secret,
      server: photo.server,
    }
    imagesArray.push(photoNode);
  })
  res.status(200).send(imagesArray);
}

/**
 * Exportable function which handles Flickr api call.
 * @param {object} req representation of HTTP request.
 * @param {object} res representation of HTTP response.
 */
module.exports.getPhotos = function retreivePhotos(req, res) {
  //Get page number from query parameters sent by frontend.
  let page = req.params.page;

  request(flickrUrl + '?method=flickr.photos.getRecent&api_key='+ constants.apiKey +'&per_page=10&page=' + page + '&format=json&nojsoncallback=1', 
    function(err, response, body) {
      if (err) {
        res.status(422).send(err);
        return;
      }
      gatherPicturesObjects(req, res, JSON.parse(body));
  });
}

