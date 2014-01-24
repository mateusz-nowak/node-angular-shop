var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();
var passport = require('passport');
var facebookStrategy = require('passport-facebook').Strategy;

// Basic configuration
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
        clientID: '142049985936355',
        clientSecret: '234a87f93c83dc7d34503245c674376d',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    }, function(accessToken, refreshToken, profile, done) {
                
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
