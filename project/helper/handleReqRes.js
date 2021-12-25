/*
 * Title: handle Req Res
 * Description: handle request and response.
 * Author: MAHFUZ ANAM
 * Date: 23/8/2021
 *
 */
// dependency
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { parsJSON } = require('./utelities');

const { notFoundHandler } = require('../routeHandeller/notfoundHandallar');

const handler = {};
handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const quarryStringObject = parsedUrl.query;
    const headerObject = req.headers;
    const requestProperty = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        quarryStringObject,
        headerObject,
    };

    let realData = '';

    const decoder = new StringDecoder('utf-8');
    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;
    console.log(routes[trimmedPath]);
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        requestProperty.body = parsJSON(realData);
        chosenHandler(requestProperty, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            // return the final res.end();
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

    // console.log(headerObject);
    // console.log(method);
    // console.log(trimmedPath);
    // console.log(quarryStringObject);

    // response handle
};

module.exports = handler;
