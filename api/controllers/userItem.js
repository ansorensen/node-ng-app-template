var restful = require('node-restful'),
	mongoose = restful.mongoose,
    User = require('../models/user.js'),
    UserItem = require('../models/userItem.js'),
    UserItemController = {};

UserItemController.setOwner = function(req, res, next) {
    var user = User.findOne({'userName': req.body.userName}, function(err, user){
        if(err) {res.status(401).send('Object saving error: No such user');}
        else {
            req.body._owner = user._id;
            next();
        }
    });
};

UserItemController.verifyOwner = function(req, res, next) {
    if(req.session && req.session.userId) {
        // have to get item id from the url string, unfortunately
        var itemId = req.url.substring(req.url.lastIndexOf('/') + 1);

        UserItem.findOne({'_id': itemId}, function(err, userItem) {

            if(err) {res.status(401).send(err);}
            else if (!userItem || userItem._owner !== req.session.userId) {
                res.status(401).send('Object saving error: do not have permissions');
            }
            else {
                next();
            }
        });
    }
    else {
        // TODO: redirect to login instead, maybE?
        res.status(401).send('Object saving error: do not have permissions');
    }
};

module.exports = UserItemController;