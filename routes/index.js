'use strict';

const apiRoute = require('./api');

/**
 * Initialize routes
 */
const init = app => {
  app.use('/api', apiRoute);
};

module.exports = {
  init
};
