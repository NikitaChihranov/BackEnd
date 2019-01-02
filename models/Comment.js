let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    date:{
        type: Date,
        default: new Date()
    },
    text: String,
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    product:{
        type: Schema.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);