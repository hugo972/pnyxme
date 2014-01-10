
var gcm = require('node-gcm');
    
exports.notify = function (req) {

    // 1. Get the target user info from DB
    // 2. Determin the target platform (Android, Apple)
    // 3. Use the correct function to send
    pushGCM(req.body);
};

exports.test = function () {
    pushGCM("hello there");
}

function pushAPN(data) {
    ///<summary>Send the notification using Apple APN messaging</summary>
    
}

function pushGCM(data) {
    ///<summary>Send the notification using Android GCM messaging</summary>
    
    var message = new gcm.Message({
        collapseKey: 'Updates Available',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            msg: data.message,
            title: "hello"
        }
    });

    var sender = new gcm.Sender('AIzaSyB-WW-vCEC2spwTGX2nyF370tvENOvi5SU');
    // a real id - "APA91bHgg1XHHJ5avWv4-3SbkIBSde2L-f7Keeb3K8_nnDwSR9nI2Qw4twMAQieKCF7NmGQEsEDvj7XWiWFoS7wJEdqNCUGL1L0sRZj-7qjZ8l1kKgbr0MaNwK_mMh6HKuvkgNcNEXOR0mq2rwBAr7-57TKN5X0DjQ"
    var registrationIds = ['APA91bHgg1XHHJ5avWv4-3SbkIBSde2L-f7Keeb3K8_nnDwSR9nI2Qw4twMAQieKCF7NmGQEsEDvj7XWiWFoS7wJEdqNCUGL1L0sRZj-7qjZ8l1kKgbr0MaNwK_mMh6HKuvkgNcNEXOR0mq2rwBAr7-57TKN5X0DjQ'];

    sender.send(message, registrationIds, 4, function (err, result) {
        console.log(result);
    });
}