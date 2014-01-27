module.exports.controller = function(app, mysql) {
    app.get('/categories', function(req, res) {
        mysql.query('SELECT * FROM categories', function(err, results) {
            res.send(200, results);
        });
    });

    app.get('/categories/:id', function(req, res) {
        mysql.query('SELECT * FROM categories WHERE id = ? LIMIT 1', [ req.params.id ], function(err, result) {
            res.send(200, result[0]);
        });
    });
};
