module.exports.controller = function(app, mysql) {
    app.get('/categories', function(req, res) {
        mysql.query('SELECT *, (SELECT COUNT(*) FROM products AS p WHERE p.category_id = c.id) as productCount FROM categories AS c', function(err, results) {
            res.send(200, results);
        });
    });

    app.get('/categories/:id', function(req, res) {
        mysql.query('SELECT * FROM categories WHERE id = ? LIMIT 1', [ req.params.id ], function(err, result) {
            res.send(200, result[0]);
        });
    });

    app.delete('/categories/:id/remove', function(req, res) {
        mysql.query('DELETE FROM categories WHERE id = ?', [ req.params.id ], function(err, result) {
            res.send(200, {
                removed: true
            });
        });
    });

    app.post('/categories', function(req, res) {
        mysql.query('INSERT INTO categories SET ?', req.body, function(err, result) {
            res.send(200, req.body);
        });
    });
};
