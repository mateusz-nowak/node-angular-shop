module.exports.controller = function(app) {
    app.get('/categories', function(req, res) {
        return res.send(200, [
            {
                id: 1,
                name: 'Konsole i automaty'
            },
            {
                id: 2,
                name: 'Komputery'
            },
            {
                id: 3,
                name: 'RTV i AGD'
            }
        ]);
    });

    app.get('/categories/:id', function(req, res) {
        res.send(200, {
            id: 2,
            name: 'Mock'
        });
    });
};
