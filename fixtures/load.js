var program = require('commander'),
    fs = require('fs'),
    mysql = require('mysql'),
    config = require('../config'),
    connection = mysql.createConnection(config.database);

program.parse(process.argv);

connection.connect(function(error) {
    var truncateTable = ['order_items', 'orders', 'products', 'categories'];

    truncateTable.forEach(function(tableName) {
        connection.query('TRUNCATE TABLE ' + tableName, function(err, res) {
            if (err) {
                console.log(err);
            }
        });
    });

    fs.readdirSync('./fixtures').forEach(function (file) {
        if (!file.match(/json/)) {
            return;
        }

        var fixtures = JSON.parse(fs.readFileSync('fixtures/' + file, 'utf8'));
        var table = file.replace('.json', '');

        fixtures.forEach(function(row) {
            connection.query('INSERT INTO ?? SET ?', [ table, row ], function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });

    connection.end();
});
