module.exports.controller = function(app, mysql) {
    app.get('/products', function(req, res) {
        mysql.query('SELECT * FROM products ORDER BY id DESC LIMIT 10', function(err, results) {
            res.send(200, results);
        })
    });

    app.get('/categories/:id/products', function(req, res) {
        mysql.query('SELECT * FROM products WHERE category_id = ? ORDER BY id DESC', [ req.params.id ], function(err, results) {
            res.send(200, results);
        });
    });
};
