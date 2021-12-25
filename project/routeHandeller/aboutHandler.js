/*
 * Title: about handler
 * Description: This is about handler.
 * Date: 24/8/2021
 */
// dependency

const handler = {};
handler.aboutHandler = (requestProperty, callback) => {
    console.log(requestProperty);

    callback(200, { message: 'This is about url' });
};

module.exports = handler;
