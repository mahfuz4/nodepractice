/*
 * Title: route
 * Description: route file
 * Date: 22/8/2021
 */
// dependency
const { sampleHandler } = require('./routeHandeller/sampleHandeller');
const { homeHandler } = require('./routeHandeller/homeHandeller');
const { aboutHandler } = require('./routeHandeller/aboutHandler');
const { userHandler } = require('./routeHandeller/userHandler');
const { tokenHandler } = require('./routeHandeller/tokenHandler');
const { checkHandler } = require('./routeHandeller/checkHandler');

const routes = {
    sample: sampleHandler,
    '': homeHandler,
    about: aboutHandler,
    user: userHandler,
    token: tokenHandler,
    check: checkHandler,
};

module.exports = routes;
