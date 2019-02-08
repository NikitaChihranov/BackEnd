let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrderSchema = new Schema({
    product:
        {
            type: Schema.ObjectId,
            ref: 'Product'
        },
    date: {
        type: Date,
        default: new Date()
    },
    name: String,
    surname: String,
    delivery: {
        address: String,
        phone: String,
        price: Number
    },
    details: String,
    paymentType: String,
    totalPrice: Number
});

module.exports = mongoose.model('Order', OrderSchema);