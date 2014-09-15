var restful = require('node-restful'),
	mongoose = restful.mongoose,
    UserItemController = {};

UserItemController.verifyOwner = function(userItem, user) {
    var numObjects;
    
    if(userItem && user && user.) {
        numItems = user.userItem.length;
        
        for (var i = 0; i < numItems; i++) {
            if (userItem.id === user.userItems[i]) {
                return true;   
            }
        }
        
    }
    return false;   
}

module.exports = UserItemController;

