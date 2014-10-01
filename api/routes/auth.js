var bodyParser = require('body-parser'),
    User = require('../models/user.js'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    secret = 'secretOfNymh';

module.exports = function (app) {
    
    app.post('/authenticate', function (req, res) {
        
        var profile,
            token;
        
        // fetch user with login email
        User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
                console.log('error finding user: ' + err);
                res.status(401).send(err);
            }
            else if (!user || !req.body.password) {
                console.log('!user or !password provided');
                res.status(401).send('Wrong email or password');
            }
            else {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (match) {
                    
                    console.log('password matches!');
                    
                    // if password hashes match, return select values
                    profile = {
                        'email': user.email,
                        'userName': user.userName
                    };
                    
                    token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});
                    req.session.userId = user._id;
                    res.json({token: token, user: profile});
                }
                else {
                    console.log('password does not match :(');
                    res.status(401).send('Wrong email or password');
                }
            });   
            }
            
            
        });

        
    });
};