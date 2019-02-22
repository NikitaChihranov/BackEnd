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
    addressDelivery: String,
    phoneNumber: String,
    details: String,
    paymentType: String,
    totalPrice: Number,
    status: {
        type: String,
        default: 'ordered'
    }
});

module.exports = mongoose.model('Order', OrderSchema);