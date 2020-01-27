const create = require('./create');
const login = require('./login');
const mail = require('./mail');
const recovery = require('./recovery');
const updatepass = require('./updatepass');

const userRoute = {};
userRoute.create = create;
userRoute.login = login;
userRoute.mail = mail;
userRoute.recovery = recovery;
userRoute.updatepass = updatepass;

module.exports = userRoute;
