const router = require('express').Router();

const userRoute = require('./userRoute');

//Middlewares
const {
    verificaCliente,
    verificaTokenJWT,
    verificaTokenDB
} = require('../server/middlewares/autenticacion');

router.get('/login', [verificaCliente], userRoute.login);
router.post('/updatepass', [verificaTokenJWT], userRoute.updatepass);
router.get('/mail', [verificaCliente], userRoute.mail);
router.get('/create/:create', userRoute.create);
router.put('/upload/:tipo/:id', [verificaCliente, verificaTokenDB], userRoute.upload);
router.post('/getQrCode', [verificaCliente], userRoute.getQrCode);
router.put('/updateZynch/:action', [verificaCliente, verificaTokenDB], userRoute.updateZynch);

module.exports = router;