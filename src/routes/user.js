const router = require('express').Router();

const userRoute = require('./userRoute');

//Middlewares
const { verificaCliente, verificaTokenJWT, verificaTokenDB } = require('../server/middlewares/autenticacion');

router.get('/user/login', [verificaCliente], userRoute.login);
router.post('/user/updatepass', [verificaTokenJWT], userRoute.updatepass);
router.get('/user/mail', [verificaCliente], userRoute.mail);
router.get('/user/create/:create', userRoute.create);
router.put('/user/upload/:tipo/:id', [verificaTokenDB], userRoute.upload);

module.exports = router;