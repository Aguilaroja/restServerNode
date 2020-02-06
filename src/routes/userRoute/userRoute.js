const { create } = require('./create');
const login = require('./login');
const mail = require('./mail');
const updatepass = require('./updatepass');
const upload = require('./uploads');
const { createQrCodeREST } = require('./getQrCode');
const updateZynch = require('./updateZynch');

const userRoute = {};
userRoute.create = create;
userRoute.login = login;
userRoute.mail = mail;
userRoute.updatepass = updatepass;
userRoute.upload = upload;
userRoute.getQrCode = createQrCodeREST;
userRoute.updateZynch = updateZynch;

module.exports = userRoute;
