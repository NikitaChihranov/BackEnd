let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title:{
        type: String,
    },
    userIdAuthor: String,
    price:{
        type: Number,
    },
    about: {
        all:{
            type: String
        },
        short:{
            type: String
        }
    },
    colors: String,
    photos: [String],
    quantity:{
        type: Number
    },
    date:{
        type: Date,
        default: new Date()
    },
    category:{
        type: String
    },
    producer:{
        type: String
    }
});

module.exports = mongoose.model('Product', ProductSchema);