const getOwnerInfo = require('./getOwnerInfo');
const zynchs = require('./zynchs');
const packs = require('./packs');
const { centers } = require('./centers');
const update = require('./update');

const noodoeRoute = {};
noodoeRoute.getOwnerInfo = getOwnerInfo;
noodoeRoute.zynchs = zynchs;
noodoeRoute.packs = packs;
noodoeRoute.centers = centers;
noodoeRoute.update = update;

module.exports = noodoeRoute;
