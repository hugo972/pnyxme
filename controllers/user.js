
var mongo = require('mongoskin'),
    data = require('../infra/data.js'),
    auth = require("../infra/auth.js");


exports.init = function (app) {
    
    app.post('/user/register', function (req, res) {
        ///<summary>POST: register a user</summary>
    
    });
     
    app.post('/user/login', function (req, res) {
        ///<summary>POST: login a user with device information</summary>
        
    });

    app.get('/user/devices', function (req, res) {
        ///<summary>GET: gets a user devices</summary>
    
        data.getUserDevices(req.user.email, function (err, devices) {
            
            res.send(devices);
        });
    });
};