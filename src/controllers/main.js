module.exports.controller = function(app) {
    var authManager = require('../services/authManager.js');

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            isAdmin: authManager.isAdmin(req.user)
        });
    })
    
    app.use(function(req, res) {
        res.status(400);
        res.send(404, { error: 'Requested page not found.' });
    });
};
