const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

// mongoose instance method
// mongoose static method
// mongoose query
todoSchema.query = {
    byTitle(keyworkd) {
        return this.find({ title: new RegExp(keyworkd, 'i') });
    },
};

module.exports = todoSchema;
