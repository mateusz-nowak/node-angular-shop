module.exports.controller = function(app) {
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })
};
