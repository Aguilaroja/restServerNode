const create = require('./create');
const login = require('./login');
const mail = require('./mail');
const updatepass = require('./updatepass');
const getQrCode = require('./getQrCode');

const userRoute = {};
userRoute.create = create;
userRoute.login = login;
userRoute.mail = mail;
userRoute.updatepass = updatepass;
userRoute.getQrCode = getQrCode;

module.exports = userRoute;
