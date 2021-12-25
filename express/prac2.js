// external import 
const express = require('express');

// express app object
const app = express();

// app enable
app.enable('case sensitive routing');

// json object
app.use(express.json());
app.use(express.static(`${__dirname}/mongodb`, { index: 'data.html' }));

// all request method this specific route
app.all('/all', (req, res) => {
    res.send('This is all route!');
});

// app.route method
app.route('/test')
    .get((req, res) => {
        res.send('This is test route get!');
    })
    .post((req, res) => {
        res.send('This is test route post!');
    })
    .put((req, res) => {
        res.send('This is test route put!');
    });

// application route
app.get('/', (req, res) => {
    res.send('home page');
});

// app listen port
app.listen(3000, () => {
    console.log('app listen port 3000');
});
