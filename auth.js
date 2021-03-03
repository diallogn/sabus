var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/userAdmin');

passport.use( new localStrategy(
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user) {
            if(err) throw err;

            if(!user) {
                return done(null, false, {message: 'Unknown User'})
            }

            User.comparePassword(password, user.password , function(err, isMatch ) {
                if(err) throw err;

                if(isMatch) {
                    return done(null, user)
                }else {
                    return done(null, false, {message: 'Invalid Password'})
                }
            })
        })

    }
))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.getUserById(id, (err, user) => {
        done(err, user)
    });
})

module.exports = passport.authenticate('local', {successRedirect: '/admin', failureRedirect: '/users/login', failureFlash: true})