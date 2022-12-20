const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Refresh token
const Token = new Schema(
    {
        token: {
            type: String,
            require: true,
        }
    }
);

module.exports = mongoose.model('Token', Token);