'use strict';

const winston = require('winston');

/**
 * Logging configuration (winston)
 * Default logging level is info, however, if in development mode, the level will be debug
 * To send something to the logger, just require()
 */

var fs = require('fs');
var path = require('path');
var logDir = 'log';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
let level = 'info';
if (process.env.NODE_ENV === 'development') level = 'debug';
const log = winston.createLogger({
    level: level,

    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log')
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'debug.log'),
            level: 'debug'
        })
    ]
});

if (process.env.NODE_ENV !== 'test') {
    log.add(
        new winston.transports.Console({
            format: winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        })
    );
}

module.exports = log;