const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const User = new Schema(
    {
        _id: { type: Number },
        username: {
            type: String,
            unique: true,
            require: true,
            max: 20,
            min: 3,
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            max: 50,
        },
        admin: {
            type: Boolean,
            default: false,
        }
    },
    {
        _id: false,
        timestamps: true
    }
);

User.plugin(AutoIncrement);

module.exports = mongoose.model('User', User);