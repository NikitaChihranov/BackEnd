let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    login: String,
    password: String,
    admin:{
        type: Boolean,
        default: false
    },
    superAdmin:{
        type: Boolean,
        default: false
    },
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
        type: String
    },
    email:{
        type: String
    },
    adress: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);