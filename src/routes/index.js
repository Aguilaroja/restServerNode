'use strict';

const apiRoute = require('./api');
const errorRoute = require('./error');
const viewRoute = require('./views');

/**
 * Initialize routes
 */
const init = app => {
  app.use('/', viewRoute);
  app.use('/api', apiRoute);
  app.use('*', errorRoute);
};

module.exports = {
  init
};
