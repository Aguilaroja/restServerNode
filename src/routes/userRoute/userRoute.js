const create = require('./create');
const login = require('./login');
const mail = require('./mail');
const updatepass = require('./updatepass');
const upload = require('./uploads');

const userRoute = {};
userRoute.create = create;
userRoute.login = login;
userRoute.mail = mail;
userRoute.updatepass = updatepass;
userRoute.upload = upload;

module.exports = userRoute;