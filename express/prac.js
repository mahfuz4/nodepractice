const express = require('express');
const handle = require('./handler/handler');
// const mongos = require('mongos');
// express app object
const app = express();
const admin = express();
app.use(
    express.static(`${__dirname}/mongodb/`, {
        index: 'data.html',
    }),
);

admin.on('mount', (parent) => {
    console.log('Admin mounted');
    console.log(parent);
});

admin.get('/deshboard', (req, res) => {
    res.send('dashboard');
    console.log(admin.mountpath);
});
// app routing
app.get('/', handle);
app.locals.title = 'home page';

app.use('/admin', admin);

// app listening port
app.listen(3000, () => {
    console.log('app listening on port 3000');
});
