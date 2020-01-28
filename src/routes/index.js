'use strict';

const apiRoute = require('./api');
const errorRoute = require('./error');
const viewRoute = require('./views');
const userRoute = require('./user');
/**
 * Initialize routes
 */
const init = app => {
    app.use('/', viewRoute);
    app.use('/', userRoute);
    app.use('/api', apiRoute);
    app.use('*', errorRoute);
};

module.exports = {
    init
};