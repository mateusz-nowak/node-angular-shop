// GET /users
exports.index = function(req, res){
    res.send(200, [{
            'username': 'matixe',
            'name': 'Mateusz',
            'surname': 'Nowak'
    }]);
};
