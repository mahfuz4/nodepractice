const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

// internal import
const userSchema = require('../model/userSchema');
const User = mongoose.model('User', userSchema)

// register controller
async function register(req, res, next) {
    const hashedPass = bcrypt.hash(req.body.password, 'jdadwesf424l534ker');
    try{
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        await newUser.save();
        res.status(200).json({ message: "Todo was inserted successfully!" });
    }
    catch{
        res.status(500).json({ error: "Failed to inserted data!" });
    }

}

// login controller
async function login(req, res, next) {
    
    try{
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        await newUser.save();
        res.status(200).json({ message: "Todo was inserted successfully!" });
    }
    catch{
        res.status(500).json({ error: "Failed to inserted data!" });
    }

}

// module export
module.exports = register;