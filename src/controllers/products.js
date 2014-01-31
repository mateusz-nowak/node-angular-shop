module.exports.controller = function(app, mysql) {
    app.get('/products', function(req, res) {
        mysql.query('SELECT * FROM products ORDER BY id DESC LIMIT 10', function(err, results) {
            res.send(200, results);
        });
    });

    app.post('/products', function(req, res) {
        var product = req.body;

        product.category_id = product.category.id;
        product.price *= 100;
        delete product.category;

        mysql.query('INSERT INTO products SET ?', [ product ], function(err, results) {
            res.send(200, product);
        });
    });

    app.delete('/products/:id', function(req, res) {
        mysql.query('DELETE FROM products WHERE id = ?', [ req.params.id ], function(err, result) {
            res.send(200, null);
        });
    });

    app.post('/products/search', function(req, res) {
        var conditions = req.body;
        var sqlConditions = [],
            sqlConditionsFlatten = [];

        if (conditions.name) {
            sqlConditions.push('name LIKE ?');
            sqlConditionsFlatten.push('%' + conditions.name + '%');
        }

        if (conditions.price && conditions.price.min) {
            sqlConditions.push('price >= ?');
            sqlConditionsFlatten.push(conditions.price.min);
        }

        if (conditions.price && conditions.price.max) {
            sqlConditions.push('price <= ?');
            sqlConditionsFlatten.push(conditions.price.max);
        }

        mysql.query('SELECT * FROM products WHERE ' + sqlConditions.join(' AND '), sqlConditionsFlatten, function(err, results) {
            res.send(200, results);
        });
    });

    app.get('/products/:id', function(req, res) {
        mysql.query('SELECT * FROM products WHERE id = ?', [ req.params.id ], function(err, results) {
            res.send(200, results[0]);
        });
    });

    app.get('/categories/:id/products', function(req, res) {
        mysql.query('SELECT * FROM products WHERE category_id = ? ORDER BY id DESC', [ req.params.id ], function(err, results) {
            res.send(200, results);
        });
    });
};
