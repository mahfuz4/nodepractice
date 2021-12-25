const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./handler/todoHandler');
const userHandler = require('./handler/userHandler');
// express app object
const app = express();
app.use(express.json());

// database connection
mongoose
    .connect(
        'mongodb+srv://admin:amikijani@cluster0.1c2dp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    )
    .then(() => {
        console.log('connection established successfully!');
        app.listen(3001, () => console.log('app listen port 3001'));
    })
    .catch((e) => console.log(e));

// app route
app.use('/todo', todoHandler);
app.use('/user', userHandler)
