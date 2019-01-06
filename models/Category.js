let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title:{
        type: String
    },
    photo: {
        type: Schema.ObjectId,
        ref: 'Photo'
    }
});

module.exports = mongoose.model('Category', CategorySchema);