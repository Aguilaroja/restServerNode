'use strict';

const { config, express, database, log, stats } = require('./config');
const routes = require('../routes');
const mongoose = require('mongoose');
const http = require('http');
let server = null;

/**
 * Start HTTP/2 server, database
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init();
  database.init();
  server = http.createServer(app).listen(config.port);
  routes.init(app);
  stats.memory();
  log.info(`🚀  Escuchando en http://${config.url}`);
};

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close();
  mongoose.disconnect();
  log.info('Server is offline. Bye!');
};

module.exports = {
  listen,
  close
};
