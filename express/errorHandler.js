const express = require('express');
const fs = require('fs');
// express app object
const app = express();

app.get('/', (req, res) => {
    res.send(a);
});

app.get('/b', (req, res) => {
    res.send(b);
});

// async function
app.get('/readFile', (req, res, next) => {
    fs.readFileSync('/file-does-not-find', (err, data) => {
        if (!err) {
            console.log(data);
        } else {
            next(err);
        }
    });
});

app.get('/asy', (req, res, next) => {
    setTimeout(() => {
        try {
            console.log('aa');
            res.end();
        } catch (err) {
            next(err);
        }
    }, 100);
});

// 404 handler
app.use((req, res, next) => {
    // res.send('Requested url not found!');
    next('Requested url not found!');
});

// error handler
app.use((err, req, res, next) => {
    if (req.headersSent) {
        next('there was a problem');
    } else if (err.message) {
        console.log(err.message);
        res.status(500).send(err.message);
    } else {
        res.status(500).send('error');
    }
});

// app listen
app.listen(3000, () => {
    console.log('application listen port 3000');
});
