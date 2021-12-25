/*
 * Title: notfound handler
 * Description: This is not found handler
 * Date: 22/8/2021
 */
// dependency
const handler = {};
handler.notFoundHandler = (requestProperty, callBack) => {
    callBack(404, {
        massage: 'this is notfound url',
    });
};

module.exports = handler;
