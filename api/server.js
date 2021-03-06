// node modules
var express = require('express'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    expressJwt = require('express-jwt'),
    restful = require('node-restful'),
	mongoose = restful.mongoose,
    
    // app modules
    database = require('./config/database.js'),
    
    // initialize
    app = express()
        .use(bodyParser.urlencoded({extended: false}))
        .use(bodyParser.json())
        .use(express.query())
        .use(cookieParser())
        .use(session({secret:'The Secret of Nymh'}))
        // Todo: make these dev environment only feauters
        .use(function (req, res, next) {
            console.log(req.body);
            next();
        })
        .use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        }),
    
    // routes
    authRoute = require('./routes/auth.js')(app),
    userRoutes = require('./routes/user.js')(app),
    objectRoutes = require('./routes/userItem.js')(app);

// protect api calls
// TODO: figure out why this doesn't work
app.use('/api', expressJwt({secret: 'The Secret of My Success'}));

// Allow CORS for dev
mongoose.connect(database.url);

app.listen(3000);