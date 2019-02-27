let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title:{
        type: String
    },
    photo: {
        type: Schema.ObjectId,
        ref: 'Photo'
    },
    date:{
        type: Date,
        default: new Date()
    },
    userIdAuthor: String
});

module.exports = mongoose.model('Category', CategorySchema);