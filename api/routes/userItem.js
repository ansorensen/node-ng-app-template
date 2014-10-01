    // app dependencies
var encrypt = require('../utils/encrypt.js'),
    UserItem = require('../models/userItem.js'),
    UserItemController = require('../controllers/userItem.js');


// methods
UserItem.methods(['get', 'post', 'put', 'delete'])
    .before('post', UserItemController.setOwner)
    .before('put', UserItemController.verifyOwner);

// url
module.exports = function (app) {
    UserItem.register(app, '/api/userItems');
};