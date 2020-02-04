'use strict';

const router = require('express').Router();

//Middlewares
const {
    verificaCliente,
    verificaTokenDB,
    verificaTokenJWT
} = require('../server/middlewares/autenticacion');

const noodoeRoute = require('./noodoeRoute');

// router.post('/getOwnerInfo', noodoeRoute.getOwnerInfo); // Habilitar cuando sea necesario
router.get('/scooters', [verificaTokenDB, verificaCliente], noodoeRoute.scooters);
router.get('/packs', [verificaTokenDB, verificaCliente], noodoeRoute.packs);
router.get('/centers/:action', [verificaCliente], noodoeRoute.centers);
router.get('/allowUserSwapBattery', [verificaCliente], noodoeRoute.allowUserSwapBattery);
router.post('/receiveContractBinding', [verificaCliente], noodoeRoute.receiveContractBinding);
router.put('/swapDone', [verificaCliente], noodoeRoute.swapDone);
// router.put('/update/:update', [verificaTokenDB], noodoeRoute.update); // Habilitar cuando sea necesario

module.exports = router;