module.exports.controller = function(app) {
    app.get('/categories/:id/products', function(req, res) {
        var requestedCategoryId = req.params.id;

        res.send(200, [
            {
                id: 1,
                thumbnail: 'http://lorempixel.com/400/200',
                name: 'Super wolno-szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            },
            {
                id: 2,
                thumbnail: 'http://lorempixel.com/400/200',
                name: '#2 Super szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            },
            {
                id: 3,
                thumbnail: 'http://lorempixel.com/400/200',
                name: 'Super szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            },
            {
                id: 4,
                thumbnail: 'http://lorempixel.com/400/200',
                name: 'Super wolno-szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            },
            {
                id: 5,
                thumbnail: 'http://lorempixel.com/400/200',
                name: '#2 Super szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            },
            {
                id: 6,
                thumbnail: 'http://lorempixel.com/400/200',
                name: 'Super szybki komputer',
                price: 1250.00,
                category_id: 3,
                description: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula'
            }
        ]);
    });
};
