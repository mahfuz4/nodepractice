const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schema/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);
const router = express.Router();

// route
router.get('/:id', (req, res) => {
    Todo.find({ title: new RegExp(req.params.id, 'i') }, (err, data) => {
        if (!err && data) {
            res.status(200).json({ data, message: 'data get successfully' });
        } else {
            res.status(500).json({ error: 'jani na' });
        }
    });
});

router.post('/', (req, res) => {
    Todo.create(req.body, (err) => {
        if (!err) {
            res.status(200).json({ message: 'data created successfully' });
        } else {
            res.status(500).json({ err: 'this is server side error!' });
        }
    });
});

// put route
router.put('/', (req, res) => {});

// export component
module.exports = router;
