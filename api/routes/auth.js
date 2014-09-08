var bodyParser = require('body-parser'),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    secret = 'secretOfNymh';

module.exports = function (app) {
    
    app.post('/authenticate', function(req, res) {
        
        var profile;

        if(!(req.body.email === 'joe@email.test' && req.body.password === 'pass')) {
            res.status(401).send('Wrong email or password');
            return;
        }

        profile = {
            first_name: 'Joe',
            last_name: 'Test',
            email: 'joe@email.test',
            role: 'user',
            id: 123
        };

        var token = jwt.sign(profile, secret, {expiresInMinutes: 60*5});

        res.json({token: token, user: profile});
    });
};