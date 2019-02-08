let passport = require('passport');
let User = require('../models/User');
let LocalStrategies = require('./passportLocalStrategy');
passport.serializeUser(function (user,done){
    done(null, user._id);
});
passport.deserializeUser(async function (id, done){
    try{
        let user = await User.findOne({_id: id});
        done(null, user);
    }catch(e) {
        done(e);
    }
});
passport.use('local.signin', LocalStrategies.SignIn);
passport.use('local.signup', LocalStrategies.SignUp);