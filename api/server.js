// node modules
var express = require('express'),
	bodyParser = require('body-parser'),
    restful = require('node-restful'),
	mongoose = restful.mongoose,
    
    // app modules
    database = require('./config/database.js'),
    
    // initialize
    app = express()
        .use(bodyParser.urlencoded({extended: false}))
        .use(bodyParser.json())
        .use(express.query()),
    
    // routes
    authRoute = require('./routes/auth.js')(app),
    userRoutes = require('./routes/user.js')(app),
    objectRoutes = require('./routes/object.js')(app);

app.use(function (req, res, next) {
	console.log(req.body);
	next();
});

// protect api calls
// app.use('/api', expressJwt({secret: secret}));

// Allow CORS for dev
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoose.connect(database.url);

/*
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


var User = app.user = restful.model('user', mongoose.Schema({
        email:  { type: 'string', required: true },
        password: { type: 'string', required: true },
        userName: { type: 'string', required: true }
    }))
    .methods(['get', 'post', 'put', 'delete'])
    .before('post', encrypt.hashPassword),

    Object = app.object = restful.model('object', mongoose.Schema({
		name:  { type: 'string', required: true },
        desc: {type: 'string', required: false}
	}))
	.methods(['get', 'post', 'put', 'delete']);

User.register(app, '/api/users');
Object.register(app, '/api/objects');*/

app.listen(3000);