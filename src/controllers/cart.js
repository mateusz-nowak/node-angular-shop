module.exports.controller = function(app, mysql) {
    app.post('/cart/add', function(req, res) {
        if (!req.session.products) {
            req.session.products = [];
        }

        req.session.products.push(req.body);
        res.send(200, null);
    });

    app.delete('/cart/:id/remove', function(req, res) {
        req.session.products = (req.session.products || []).filter(function(product) {
            return product.id != req.params.id;
        });

        res.send(200, null);
    });

    app.get('/cart', function(req, res) {
        res.send(200, req.session.products || []);
    });
}