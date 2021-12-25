const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello programmer!');
        res.write('How are you?');
        res.end();
    } else if (req.url === '/about') {
        res.write('This is about page');
        res.end();
    } else {
        res.write('page not found');
        res.end();
    }
});
server.on('connection', (socket) => {
    console.log('new connection');
});
server.listen(3000);
console.log('server is listening on port 3000');
