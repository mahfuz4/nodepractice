const express = require('express');

const app = express();
const admin = express();

app.use(express.json());
const logger = (req, res, next) => {
    console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${
            req.protocol
        } - ${req.ip}`,
    );
    next();
};

admin.use(logger);
app.use('/admin', admin);

app.get('/', (req, res) => {
    res.send('home url!');
});
admin.get('/about', (req, res) => {
    res.send('mahfuz');
});

app.listen(3000, () => {
    console.log('app listen port 3000');
});
