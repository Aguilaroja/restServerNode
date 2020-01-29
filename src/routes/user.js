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
router.post('/getQrCode', /*[verificaTokenDB],*/ userRoute.getQrCode);

module.exports = router;
