let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    date:{
        type: Date,
        default: Date.now()
    },
    text: String,
    user:{
        type: String
    },
    product:{
        type: Schema.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);