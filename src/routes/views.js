'use strict';

const views = require('./viewRoute');
const router = require('express').Router();

router.get('/', views.index);
router.get('/login', views.login);
router.get('/recovery', views.recovery);

module.exports = router;
