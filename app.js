var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    app = express(),
    passport = require('passport'),
    googleStrategy = require('passport-google').Strategy,
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
        secret: 'secret-hash'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(require('less-middleware')({
        src: __dirname + '/src/assets/less',
        dest: __dirname + '/public/stylesheets',
        prefix: '/stylesheets',
        compress: true
    }));
    app.use(express.static(__dirname + '/public'));

    passport.use(new googleStrategy(config.googleAuth, function(identifier, profile, done) {
        return done(null, profile);
    }));
    passport.serializeUser(function(user, done) {
        return done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        return done(null, user);
    });
});

var connection = mysql.createConnection(config.database);

connection.connect(function(error) {
    // Read all controllers
    fs.readdirSync('./src/controllers').forEach(function (file) {
        if (file.substr(-3) == '.js') {
            route = require('./src/controllers/' + file);
            route.controller(app, connection);
        }
    });

    http.createServer(app).listen(3000);
});
