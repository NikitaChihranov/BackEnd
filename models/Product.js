let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title:{
        type: String,
    },
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
        type: String,
        default: new Date()
    },
    gender:{
        type: String
    },
    category:{
        type: String
    },
    producer:{
        type: String
    }
});

module.exports = mongoose.model('Product', ProductSchema);