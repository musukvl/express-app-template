const config = require('./config');
const logger = require('./log')("server");
const http = require('http');

class Server {
    constructor(app) {
        this._app = app;

        let port = this.normalizePort(process.env.PORT || config('app-port'));
        app.set('port', port);

        this._server = http.createServer(app);
        this._server.listen(port);
        logger.info(`Listening port: ${port}`);
        this._server.on('error', this.onError);
        this._server.on('listening', this.onListening);
    }

    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                logger.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                logger.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    onListening() {
        var self = this;
        return () => {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            logger('Listening on ' + bind);
        }
    }

    normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }
}

function init(app) {
    let server = new Server(app);
    return server;
}

module.exports = { init };