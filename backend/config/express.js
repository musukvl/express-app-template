const express = require('express');
//const favicon = require('serve-favicon');
const logger = require('./log')("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const partials = require('express-partials');
const config = require('./config');

const index = require('../routes/index');


async function init() {
    var app = express();

    // view engine setup
    app.set('views', 'views');
    app.use(partials());
    app.set('view engine', 'ejs');
    app.set('view options', {
        layout: 'layout'
    });

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static('public'));

    app.use('/', index);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use((err, req, res, next) => {

        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    return app;
}

module.exports = { init };