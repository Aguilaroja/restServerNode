'use strict';

const express = require('express');
const router = express.Router();

//Middlewares
const {
  verificaCliente,
  verificaTokenDB,
  verificaTokenJWT
} = require('../server/middlewares/autenticacion');

const getOwnerInfo = require('./noodoe/getOwnerInfo');
const login = require('./noodoe/login');
const updatepass = require('./noodoe/updatepass');
const mail = require('./noodoe/mail');
const recovery = require('./noodoe/recovery');
const zynchs = require('./noodoe/zynchs');
const packs = require('./noodoe/packs');
const create = require('./noodoe/create');
const centers = require('./noodoe/centers');
const update = require('./noodoe/update');
const error = require('./noodoe/error');

router.post('/getOwnerInfo', getOwnerInfo);
router.get('/login', [verificaCliente], login);
router.post('/updatepass', [verificaTokenJWT], updatepass);
router.get('/recovery', recovery);
router.get('/mail', [verificaCliente], mail);
router.get('/zynchs', [verificaTokenDB, verificaCliente], zynchs);
router.get('/packs', [verificaTokenDB, verificaCliente], packs);
router.get('/create/:create', create);
router.get('/centers/:action', [verificaCliente], centers);
router.put('/update/:update', [verificaTokenDB], update);
router.post('/error', error.post);
router.get('/error', error.get);
router.put('/error', error.put);
router.delete('/error', error.put);

module.exports = router;
