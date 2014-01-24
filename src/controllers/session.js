var passport = require('passport');

module.exports.controller = function(app) {
    // GET /auth
    app.get('/auth', passport.authenticate('facebook'));
    
    // GET /auth/facebook/callback
    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { 
            successRedirect: '/',
            failureRedirect: '/login'
        })
    ); 
};
