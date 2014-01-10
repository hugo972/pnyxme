var express = require('express'),
    http = require('http'),
    path = require('path'),
    flash = require('connect-flash'),
    passport = require('passport'),
    data = require('./infra/data.js'),
    auth = require("./infra/auth.js"),
    MongoStore = require('connect-mongo')(express),
    viewController = require("./controllers/view.js"),
    appController = require("./controllers/app.js"),
    userController = require("./controllers/user.js");

var app = express();

app.configure(function () {
    
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join( __dirname, '/client/views') ); // critical to use path.join on windows
    app.set('view engine', 'vash');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.session({ 
        store: new MongoStore({
            url: 'mongodb://' + data.connection
        }),
        secret: '67fe2ff2-3cc1-4061-aec1-56a005657ed1' 
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function () {
    
    app.use(express.errorHandler());
});

// Init service infra
auth.init(app);

// Init the API controllers
viewController.init(app);
appController.init(app);
userController.init(app);

// Start the service
http.createServer(app).listen(app.get('port'), function() {
    
    console.log("PnyxMe server listening on port " + app.get('port'));
});
