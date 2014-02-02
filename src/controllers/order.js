module.exports.controller = function(app, mysql) {
    app.get('/orders', function(req, res) {
        mysql.query('SELECT o.id, o.name, o.surname, GROUP_CONCAT(CONCAT(i.product_id, ",", p.name, ",", p.price) separator "|") AS products FROM orders AS o INNER JOIN order_items AS i ON (i.order_id = o.id) INNER JOIN products AS p ON (p.id = i.product_id) GROUP BY o.id ORDER BY o.id DESC', function(err, results) {
            if (err) {
                return res.send(500, err);
            }
            results.map(function(order) {
                order.products = order.products.split('|').map(function(product) {
                    var productMeta = product.split(',');

                    return {
                        id: parseInt(productMeta[0]),
                        name: productMeta[1],
                        price: parseInt(productMeta[2])
                    };
                });

                return order;
            });
            res.send(200, results);
        });
    });

    app.post('/order', function(req, res) {
        if (!req.user) {
            return res.send(500, { message: 'Not logged.'});
        }

        var order = {
            name: req.user.name.familyName,
            surname: req.user.name.givenName,
            products: req.cartManager.getCart().map(function(product) {
                return product.id;
            })
        };

        mysql.beginTransaction(function(err) {
            if (err) {
                res.send(500, 'Error while processing transaction');
                return;
            }

            mysql.query('INSERT INTO orders SET ?', {
                name: order.name,
                surname: order.surname
            }, function(err, newOrder) {
                if (err) {
                    mysql.rollback();
                }

                order.products.forEach(function(item) {
                    mysql.query('INSERT INTO order_items SET ?', {
                        order_id: newOrder.insertId,
                        product_id: item
                    }, function(err, order) {
                        if (err) {
                            mysql.rollback();
                        }

                        mysql.commit();
                    });
                });
            });

            res.send(200, order);
        });
    });
};
