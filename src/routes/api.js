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
router.get('/zynchs', [verificaTokenDB, verificaCliente], noodoeRoute.zynchs);
router.get('/packs', [verificaTokenDB, verificaCliente], noodoeRoute.packs);
router.get('/centers/:action', [verificaCliente], noodoeRoute.centers);
router.put('/update/:update', [verificaTokenDB], noodoeRoute.update);

module.exports = router;