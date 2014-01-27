var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    app = express(),
    passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    config = require('./config.js');

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
    app.use(app.router);
    app.use(require('less-middleware')({
        src: __dirname + '/src/assets/less',
        dest: __dirname + '/public/stylesheets',
        prefix: '/stylesheets',
        compress: true
    }));
    app.use(express.static(__dirname + '/public'));

    passport.use(new facebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    }, function(accessToken, refreshToken, profile, done) {
        // TODO
    }));
});

// Read all controllers
fs.readdirSync('./src/controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./src/controllers/' + file);
        route.controller(app);
    }
});

// Server listener
http.createServer(app).listen(3000);
