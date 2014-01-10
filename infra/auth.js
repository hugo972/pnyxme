
var passport = require('passport'),
    data = require('./data.js'),
    localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
    
    {
        usernameField: 'email',
        passwordField: 'password'
    }, 

    function (email, password, done) {
    
        data.getUser(email, function (err, user) {
    
            if (err) return done(err);
            
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Incorrect user or password.' });   
            }
            
            return done(null, user);
        });
    }));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {

    data.getUser(email, function (err, user) {
    
        if (err) return done(err);
        return done(null, user);
    });
});

exports.ensureAuth = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

exports.init = function (app) {
    
    app.post('/login', 
        
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
        
        function (req, res) {
            res.redirect('/dashboard');
        });
        
    app.get('/logout', 
        
        function (req, res) {
            req.logout();
            res.redirect('/');
        });
        
    app.post('/device/login', 
        
        passport.authenticate('local', { failureFlash: true }),
        
        function (req, res) {

            // need to register user device id
            data.addUserDevice(req.body.email, req.body.gcmId, function () {
                
                // return token back to device
                return "token";
            });
        });

    app.post('/register', function (req, res) {
        
        data.addUser({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        
        }, function (err, user) {
        
            // login the new user
            req.logIn(user, { failureFlash: true }, function (lerr) {
                
                res.redirect('/dashboard');    
            });
        });
        
    });

};