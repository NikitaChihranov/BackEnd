let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrderSchema = new Schema({
    product:
        {
            type: String
        },
    userId: String,
    date: {
        type: Date,
        default: new Date()
    },
    name: String,
    surname: String,
    delivery: {
        address: String,
        phone: String
    },
    details: String,
    paymentType: String,
    totalPrice: Number
});

module.exports = mongoose.model('Order', OrderSchema);