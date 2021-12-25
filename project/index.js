/*
 * Title: Uptime monitor
 * Description: A restful api monitor
 * Date:
 */
// dependency
const http = require('http');
const { handleReqRes } = require('./helper/handleReqRes');
const environment = require('./helper/environment');
const data = require('./lib/data');

// app object
const app = {};

// configuration

// test data

// Create data
// data.create('test', 'newFile', { name: 'Bangladesh', language: 'Bangla' }, (err) => {
//     console.log('error was:', err);
// });

// Read data
// data.read('test', 'newFile', (err, data1) => {
//     console.log('error was:', err, 'data is:', data1);
// });

// Update data
// data.update('test', 'newFile', { age: '51', nationality: 'Bangladeshi' }, (err6) => {
//     console.log(err6);
// });

// delete data
// data.delete('test', 'del', (err4) => {
//     console.log(err4);
// });

// server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port: ${environment.port}`);
    });
};
// handle request response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
