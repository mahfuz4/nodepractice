const http = require('http');

const app = {};

app.server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('mahfuz anam');
        res.end();
    } else {
        res.write('page not found');
        res.end();
    }
});
app.server.listen(3000, () => {
    console.log('server was listen 3000');
});
