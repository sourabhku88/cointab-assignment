const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    phone: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    attemptTime: {
        type: Number,
        default: 1
    },
    blockTime: {
        type: Date,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)