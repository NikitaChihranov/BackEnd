let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AboutSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('About', AboutSchema);