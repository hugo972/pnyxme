
var data = require('../infra/data.js'),
    device = require("../infra/device");

exports.init = function (app) {

    app.post('/app/add', function (req, res) {
        ///<summary>POST: add a new application</summary>
       
        req.body.email = req.user.email;
        data.addApp(req.body, function (err, result) {
            
            if (err) {
                res.send(500, err);
                return;
            }
            
            res.json(result);
        }); 
    });
    
    app.get('/test', function (req, res) {
        ///<summary>POST: register a application</summary>
       device.test();
    });
    
    app.post('/app/cast', function (req, res) {
        ///<summary>POST: send a notification to a user</summary>
        
        device.notify(req);
    });

    app.get('/app/userApps', function (req, res) {
        ///<summary>GET: get all apps of the user</summary>
        
        data.getUserApps(req.user.email, function (err, apps) {
            
            res.send(apps);
        });
    });
    
    app.get('/app/appreg', function (req, res) {
        ///<summary>GET: get all apps registered for the user</summary>
        
        data.getUserAppReg(req.user.email, function (err, appreg) {
            
            res.send(appreg);
        });
    });

};

