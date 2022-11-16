const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');
const sid = require('shortid');

module.exports = mongo.model('shorturl', new mongo.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: sid.generate,
    },
    clicks: {
        type: Number,
        default: 0
    }
}))