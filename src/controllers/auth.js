var passport = require('passport');

module.exports.controller = function(app) {
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
