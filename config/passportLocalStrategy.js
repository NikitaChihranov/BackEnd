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
            if (principal && principal.admin === false) {
                console.log('ADMIN FALSE');
                return done(null, principal);
            }
            else if(principal.admin === true) {
                console.log('You`re admin');
                return done(null, principal);
            }
        }catch(e) {
            console.log('Incorrect login or password');
            return done(null, new User({firstName:'not found'}));
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
                let user = await User.create(req.body);
                return done(null, user);
            }
        }catch(e){
            return done(e);
        }
    }
);
module.exports = strategies;