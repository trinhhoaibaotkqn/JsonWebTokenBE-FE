const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv').config();

const route = require('./routes');

const app = express();
const port = 8080;

const db = require('../src/configdb/index');
db.connect();
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true,
  }
));

//init route
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})