const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const route = require('./routes');


const app = express();
const port = 8080;

mongoose.connect(process.env.MONGODB_URL, () =>
  console.log("Connect to database successfully"));

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());
app.use(cookieParser());

app.use(cors());
//init route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})