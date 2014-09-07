var express = require('express'),
	bodyParser = require('body-parser'),
	restful = require('node-restful'),
	mongoose = restful.mongoose,
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    secret = 'secretOfNymh',
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.query());

app.use(function (req, res, next) {
	console.log(req.body);
	next();
});

// protect api calls
app.use('/api', expressJwt({secret: secret}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.post('/authenticate', function(req, res) {

    if(!(req.body.email === 'joe@email.test' && req.body.password === 'pass')) {
        res.status(401).send('Wrong email or password');
        return;
    }



    var profile = {
        first_name: 'Joe',
        last_name: 'Test',
        email: 'joe@email.test',
        role: 'user',
        id: 123
    };

    var token = jwt.sign(profile, secret, {expiresInMinutes: 60*5});

    res.json({token: token, user: profile});
});

mongoose.connect("mongodb://localhost/lifeWin");

var Resource = app.user = restful.model('user', mongoose.Schema({
        email:  { type: 'string', required: true },
        password: { type: 'string', required: true },
        userName: { type: 'string', required: true }
    }))
    .methods(['get', 'post', 'put', 'delete'])
    .before('post', function(req, res, next) {

    }),

    Resource = app.object = restful.model('object', mongoose.Schema({
		name:  { type: 'string', required: true },
        desc: {type: 'string', required: false}
	}))
	.methods(['get', 'post', 'put', 'delete']);

Resource.register(app, 'api/users');
Resource.register(app, 'api/objects');

app.listen(3000);