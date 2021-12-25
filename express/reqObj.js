const express = require('express');

// express app object
const app = express();
const admin = express();
app.use(express.json());
// application route

app.get('/user', (req, res) => {
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.protocol);
    res.send('This is user route');
});

app.get('/user/:id', (req, res) => {
    res.cookie({ mahfuz: 'this is api cookie' });
    res.send(
        `${req.hostname} and requested user ip: ${req.ip} requested method: ${req.method} requested 
        protocol: ${req.protocol} and ${req.originalUrl}`,
    );
    console.log(req.path, req.params.id, req.query.filter, req.cookies);
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.secure);
    console.log(req.route);
    console.log(req.get('content-type'));
    console.log(req.accepts('html'));
});

// app listen
app.listen(3000, () => {
    console.log('app listen port 3000');
});
