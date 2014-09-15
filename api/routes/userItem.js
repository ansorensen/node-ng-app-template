    // app dependencies
var encrypt = require('../utils/encrypt.js'),
    UserItem = require('../models/userItem.js');


// methods
UserItem.methods(['get', 'post', 'put', 'delete'])
    // very that modifications to the object
    .before('post', encrypt.hashPassword)
    .before('put', encrypt.hashPassword)
    .before('delete', encrypt.hashPassword);

// url
module.exports = function (app) {
    UserItem.register(app, '/api/userItems');
};