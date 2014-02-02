module.exports.controller = function(app, mysql)
{
    var getProductById = function(id, cb) {
        return mysql.query('SELECT * FROM products WHERE id = ?', [id], function(err, results) {
            cb(results[0]);
        });
    };

    app.get('/cart', function(req, res) {
        res.send(200, req.cartManager.getCart());
    });

    app.delete('/cart/:id', function(req, res) {
        getProductById(req.params.id, function(product) {
            req.cartManager.removeProduct(product);
            res.send(200, req.cartManager.getCart());
        });
    });

    app.post('/cart', function(req, res) {
        getProductById(req.body.id, function(product) {
            req.cartManager.addProduct(product);
            res.send(200, product);
        });
    });
};
