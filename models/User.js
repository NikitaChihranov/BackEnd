let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName:{
        type: String,
    },
    surname:{
        type: String,
    },
    photo:{
        type: String
    },
    phone:{
        type: String,

    },
    email:{
        type: String,

    },
    adress:{
        type: String,

    },
    admin:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);