'use strict';

const config = require('./config');
const log = require('./logger');
const mongoose = require('mongoose');

/**
 * Connect database
 */
const init = () => {
    mongoose.connect(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    const db = mongoose.connection;
    error(db);
    open(db);
};

/**
 * Database error
 * @callback
 * @param {object} error
 */
const error = db => {
    db.on('error', error => {
        log.error('Error al conectar a Base de Datos');
        log.error(error);
    });
};

/**
 * Database connected
 * @callback
 */
const open = db => {
    db.once('open', () => {
        log.info('Database online');
        log.debug(`Mongo Url string: ${config.mongoUrl}`);
    });
};

module.exports = {
    init
};