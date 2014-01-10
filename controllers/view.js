
var auth = require("../infra/auth.js");

exports.init = function (app) {
    
    app.get('/', function (req, res){
        res.render('index', { user: req.user });
    });

    app.get('/login', function (req, res){
        res.render('login', { });
    });

    app.get('/register', function (req, res){
        res.render('register', { user: req.user });
    });

    app.get('/download', function (req, res){
        res.render('download', { user: req.user });
    });

    app.get('/contact', function (req, res){
        res.render('contact', { user: req.user });
    });

    app.get('/dashboard', auth.ensureAuth, function (req, res){
        res.render('dashboard', { user: req.user });
    });
};