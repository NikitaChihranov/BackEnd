let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title:{
        type: String
    }
});

module.exports = mongoose.model('Category', CategorySchema);