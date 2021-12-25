const express = require('express');
const adminRoute = require('./adminroute');

const app = express();
const admin = express();
app.use('/admin', admin);

app.get('/', (req, res) => {
    res.send('public route');
});

app.param('user', (req, res, next, id) => {
    req.user = id === '1' ? 'admin' : 'nothing';
    console.log('i am called once');
    next();
});

app.get('/:user', (req, res) => {
    res.send(req.user);
});
admin.use('/', adminRoute);

app.listen(3000, () => {
    console.log('application listen port: 3000');
});
