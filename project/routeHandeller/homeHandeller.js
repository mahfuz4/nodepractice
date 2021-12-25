/*
 * Title: home Handler
 * Description: This is home handler
 * Author: MAHFUZ ANAM
 * Date: 24/8/2021
 *
 */
// dependency
const handler = {};
handler.homeHandler = (requestProperty, callBack) => {
    console.log(requestProperty);

    callBack(200, { message: 'This is a home url' });
};

module.exports = handler;
