const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");

const User = new mongoose.model("User", userSchema);
const router = express.Router();

// route
router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      user: req.body.user,
      username: req.body.username,
      password: hashedPassword,
    });
    
    console.log(hashedPassword);

    await newUser.save();
    
  } catch {
    res.status(500).json({ error: "this is server side errors!" });
  }
  
});
// export component
module.exports = router;
