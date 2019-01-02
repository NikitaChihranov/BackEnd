let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);