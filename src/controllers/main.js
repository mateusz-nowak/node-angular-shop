module.exports.controller = function(app) {
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    })
 
    app.use(function(req, res) {
        res.status(400);
        res.send(404, { error: 'Requested page not found.' });
    });
};
