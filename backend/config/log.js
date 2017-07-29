const winston = require('winston');
const config = require('./config');
const Logger = require('../logging/Logger');


var internalLogger = createInternalLogger();
var loggers = {};


function createInternalLogger() {
    let logLevelsConfig = {
        levels: {
            silly: 6,
            verbose: 5,
            info: 4,
            data: 3,
            warn: 2,
            debug: 1,
            error: 0
        },
        colors: {
            silly: 'magenta',
            verbose: 'cyan',
            info: 'green',
            data: 'grey',
            warn: 'yellow',
            debug: 'blue',
            error: 'red'
        }
    };

    winston.setLevels(logLevelsConfig.levels);
    winston.addColors(logLevelsConfig.colors);

    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {colorize: true, timestamp: true, level: 'silly'});
    winston.add(winston.transports.File, { filename: 'log/debug.log', json: false, level:'info' });

    let logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ level: 'silly' }),
            new (winston.transports.File)({
                filename: 'log/debug.log',
                level: 'info'
            })
        ]
    });

    return logger;
}


function logger(name) {
    if (!name) {
        name = "";
    }
    if (!loggers[name]) {
        if (name && config("loggers") != "all") {
            var loggerRequired = config("loggers").find(x => x == name);
            if (!loggerRequired) {
                internalLogger = null;
            }
        }
        loggers[name] = new Logger(name, internalLogger);
    }
    return loggers[name];
}

module.exports = logger;
