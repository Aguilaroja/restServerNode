const getOwnerInfo = require('./getOwnerInfo');
const login = require('./login');
const updatepass = require('./updatepass');
const mail = require('./mail');
const recovery = require('./recovery');
const zynchs = require('./zynchs');
const packs = require('./packs');
const create = require('./create');
const centers = require('./centers');
const update = require('./update');

const noodoeRoute = {};
noodoeRoute.getOwnerInfo = getOwnerInfo;
noodoeRoute.login = login;
noodoeRoute.updatepass = updatepass;
noodoeRoute.mail = mail;
noodoeRoute.recovery = recovery;
noodoeRoute.zynchs = zynchs;
noodoeRoute.packs = packs;
noodoeRoute.create = create;
noodoeRoute.centers = centers;
noodoeRoute.update = update;

module.exports = noodoeRoute;
