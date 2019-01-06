let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PhotoSchema = new Schema({
    path: String,
    caption: String
});

module.exports = mongoose.model('Photo', PhotoSchema);