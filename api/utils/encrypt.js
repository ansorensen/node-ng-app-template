// imports
var bcrypt = require('bcrypt'),

// functions
hashPassword;

hashPassword = function(req, res, next) {
    
    console.log('hasPassword called');
    
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            console.log(err);
            return next(err);
        }
        
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err) {
                console.log(err);
                return next(err);
            }
            
            req.body.password = hash;
            console.log(req.body.password);
            next();
            
        });
    });
};

// exports
module.exports = {
    hashPassword: hashPassword
};