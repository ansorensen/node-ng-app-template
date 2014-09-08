    // app dependencies
var encrypt = require('../utils/encrypt.js'),
    Object = require('../models/object.js');


// methods
Object.methods(['get', 'post', 'put', 'delete']);

// url
module.exports = function (app) {
    Object.register(app, '/api/objects');
};