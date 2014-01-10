
var mongo = require('mongoskin');

exports.connection = 'test:123@linus.mongohq.com:10094/notifyer';

var conn = mongo.db(exports.connection, {w: -1});

exports.addUser = function (user, done) {
    
    conn.collection('users').insert(user, done);
};

exports.getUser = function (id, done) {
    
    conn.collection('users').findOne({ email: id }, done);
};

exports.addUserDevice = function (id, gcmId, done) {
    
    conn.collection('devices').insert({ email: id, gcmId: gcmId }, done);
};

exports.getUserDevices = function (id, done) {
    
    conn.collection('devices').find({ email: id }).toArray(done);
};

exports.getUserApps = function (id, done) {
    
    conn.collection('apps').find({ email: id }).toArray(done);
};

exports.addApp = function (app, done) {
    
    conn.collection('apps').insert(app, done);
};

exports.getUserAppReg = function (id, done) {
    
    conn.collection('app-reg').find({ email: id }).toArray(done);
};