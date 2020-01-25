'use strict';

const error = require('./errorRoute');
const router = require('express').Router();

router.get('*', error.handle);

module.exports = router;
