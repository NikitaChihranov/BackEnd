let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrderSchema = new Schema({
    products: [
        {
            type: Schema.ObjectId,
            ref: 'Product'
        }
    ],
    date: {
        type: Date,
        default: new Date()
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    },
    delivery: {
        address: String,
        phone: String
    },
    details: String,
    payment: {
        type: Schema.ObjectId,
        ref: 'Payment'
    }
});

module.exports = mongoose.model('Order', OrderSchema);