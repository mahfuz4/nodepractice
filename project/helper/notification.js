/*
 * Title: notification
 * Description: send notification to user
 * Author: MAHFUZ ANAM
 * Date: 06/9/2021
 *
 */

// Dependency
const https = require('https');
// module scaffolding
const notifications = {};

// send sms to towilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // input validation
    const userPhone =
        typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const userMsg =
        typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
            ? msg.trim()
            : false;
    if (userPhone && userMsg) {
        // configure the request payload.
        const payload = {};
    } else {
        callback('There was an error on serverSide!');
    }
};
// module export
module.exports = notifications;
