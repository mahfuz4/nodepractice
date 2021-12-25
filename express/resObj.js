const express = require('express');

// express app object
const app = express();
const admin = express();
app.use(express.json());
// application route

// Get request router
app.get('/user', (req, res) => {});

// post request router
app.post('/user/:id', (req, res) => {});

// app listen
app.listen(3000, () => {
    console.log('app listen port 3000');
});
