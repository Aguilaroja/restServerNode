'use strict';

const router = require('express').Router();

//Middlewares
const {
    verificaCliente,
    verificaTokenDB,
    verificaTokenJWT
} = require('../server/middlewares/autenticacion');

const noodoeRoute = require('./noodoeRoute');

router.post('/getOwnerInfo', noodoeRoute.getOwnerInfo);
router.get('/login', [verificaCliente], noodoeRoute.login);
router.post('/updatepass', [verificaTokenJWT], noodoeRoute.updatepass);
router.get('/recovery', noodoeRoute.recovery);
router.get('/mail', [verificaCliente], noodoeRoute.mail);
router.get('/zynchs', [verificaTokenDB, verificaCliente], noodoeRoute.zynchs);
router.get('/packs', [verificaTokenDB, verificaCliente], noodoeRoute.packs);
router.get('/create/:create', noodoeRoute.create);
router.get('/centers/:action', [verificaCliente], noodoeRoute.centers);
router.put('/update/:update', [verificaTokenDB], noodoeRoute.update);

module.exports = router;