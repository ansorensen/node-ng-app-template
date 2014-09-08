    // app dependencies
var encrypt = require('../utils/encrypt.js'),
    User = require('../models/user.js');


// methods
User.methods(['get', 'post', 'put', 'delete'])
    .before('post', encrypt.hashPassword);

// url
module.exports = function (app) {
    User.register(app, '/api/users');
};