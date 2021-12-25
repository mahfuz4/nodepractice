// external import
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

// internal import
const userRouter = require('./route/userRouter')

// express app object
const app = express();
app.set("view engine", "ejs");
app.use(express.json())

// database connection
mongoose
  .connect(
    "mongodb+srv://admin:amikijani@cluster0.1c2dp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((e) => console.log(`error: ${e}`));

// routing setup
app.use('/user', userRouter)

// app listen
app.listen(3000, () => {
  console.log("app listen port 3000");
});
