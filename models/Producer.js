let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProducerSchema = new Schema({
    title: String,
    about:{
        short: String,
        all: String
    },
    photo: String,
    country: String,
    userIdAuthor: String,
    date: {
        type: String,
        default: new Date()
    }
});

module.exports = mongoose.model('Producer', ProducerSchema);