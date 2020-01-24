'use strict';

const config = require('./services/config');
const express = require('./services/express');
const database = require('./services/database');
const stats = require('./services/stats');
const log = require('./services/logger');

module.exports = {
  config,
  express,
  database,
  log,
  stats
};
