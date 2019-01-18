let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/User');
let strategies = {};
strategies.SignIn = new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, login, password, done) => {
        try {
            console.log('passport local works');
            let principal = await User.findOne({
                login, password
            });

            if (principal) {
                console.log('passport local works principal');
                return done(null, principal);
            }
            else{
                console.log('Incorrect login or password');
                return done(false, null);
            }
        }catch(e) {
            return done(e);
        }
}
);

strategies.SignUp = new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function (req, login, password, done) {
        try {
            console.log('passport works');
            let alreadyExists = await User.findOne({login});
            if (alreadyExists) {
                return done(false, null);
            } else {
                console.log;
                let user = await User.create(req.body);
                return done(null, user);
            }
        }catch(e){
            console.log('e:' + e);
            return done(e);
        }
    }
);
module.exports = strategies;