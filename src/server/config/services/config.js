'use strict';

const path = require('path');
let basePath = path.join(__dirname, '../../../../');
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
  basePath = './';
}
const envPath = path.join(basePath, `.env/${env}.env`);
const envConfig = require('dotenv').config({
  path: envPath
});
if (envConfig.error) {
  throw envConfig.error;
}

const development = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.HOST}:${process.env.PORT}`,
  redisUrl: process.env.REDIS_URL,
  mongoUrl: `mongodb://${process.env.MONGODB_HOST}`,
  seed: process.env.SEED,
  caducidadToken: parseInt(60 * 60 * 24 * 30), // 30 dias
  frontendStaticFolder: path.join(basePath + 'src/views')
};

const production = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.HOST}`,
  redisUrl: process.env.REDIS_URL,
  mongoUrl: `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(
    process.env.MONGODB_PASS
  )}@${process.env.MONGODB_HOST}`,
  seed: process.env.SEED,
  frontendStaticFolder: path.join(basePath + '/src/views'),
  caducidadToken: process.env.CADUCIDAD_TOKEN
};

const test = {
  env,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.HOST}:${process.env.PORT}`,
  redisUrl: process.env.REDIS_URL,
  mongoUrl: `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(
    process.env.MONGODB_PASS
  )}@${process.env.MONGODB_HOST}`,
  seed: process.env.SEED,
  frontendStaticFolder: path.join(basePath + 'src/views')
};

const config = { test, development, production };

module.exports = config[env];
