var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    app = express(),
    passport = require('passport'),
    config = require('./config.js'),
    mysql = require('mysql');

app.configure(function() {
    app.set('views', __dirname + '/src/views');
    app.use(express.json());
    app.use(express.bodyParser());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: 'secret-hash',
        expires: new Date(Date.now() + 3600),
        maxAge: 3600
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next) {
        req.cartManager = require('./src/services/cartManager')(req);
        next();
    });
    app.use(app.router);
    app.use(require('less-middleware')({
        src: __dirname + '/src/assets/less',
        dest: __dirname + '/public/stylesheets',
        prefix: '/stylesheets',
        compress: true
    }));
    app.use(express.static(__dirname + '/public'));
});

var connection = mysql.createConnection(config.database);

connection.connect(function(error) {
    fs.readdirSync('./src/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./src/controllers/' + file);
            route.controller(app, connection);
        }
    });

    http.createServer(app).listen(3000);
});
