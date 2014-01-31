var passport = require('passport'),
    googleStrategy = require('passport-google').Strategy,
    config = require('./../../config.js'),
    passportConfig = function(passport) {
        passport.use(new googleStrategy(config.googleAuth, function(identifier, profile, done) {
            return done(null, profile);
        }));
        passport.serializeUser(function(user, done) {
            return done(null, user);
        });
        passport.deserializeUser(function(user, done) {
            return done(null, user);
        });
    };

module.exports.controller = function(app) {
    passportConfig(passport);

    // GET /auth
    app.get('/auth', passport.authenticate('google'));

    // GET /auth/result
    app.get('/auth/result', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    // GET /auth/logout
    app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
