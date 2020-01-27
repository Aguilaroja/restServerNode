const router = require('express').Router();

const userRoute = require('./userRoute');

//Middlewares
const { verificaCliente, verificaTokenJWT } = require('../server/middlewares/autenticacion');

router.get('/login', [verificaCliente], userRoute.login);
router.post('/updatepass', [verificaTokenJWT], userRoute.updatepass);
router.get('/recovery', userRoute.recovery);
router.get('/mail', [verificaCliente], userRoute.mail);
router.get('/create/:create', userRoute.create);

module.exports = router;
