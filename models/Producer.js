let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProducerSchema = new Schema({
    title: String,
    about:{
        short: String,
        all: String
    },
    photo: {
        type: String,
        default: 'no photo'
    },
    country: String,
    userIdAuthor: String,
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Producer', ProducerSchema);