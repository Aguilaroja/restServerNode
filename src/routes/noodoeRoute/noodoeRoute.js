const getOwnerInfo = require('./getOwnerInfo');
const zynchs = require('./zynchs');
const packs = require('./packs');
const centers = require('./centers');
const update = require('./update');
const allowUserSwapBattery = require('./allowUserSwapBattery');
const receiveContractBinding = require('./receiveContractBinding');

const noodoeRoute = {};
noodoeRoute.getOwnerInfo = getOwnerInfo;
noodoeRoute.zynchs = zynchs;
noodoeRoute.packs = packs;
noodoeRoute.centers = centers;
noodoeRoute.update = update;
noodoeRoute.allowUserSwapBattery = allowUserSwapBattery;
noodoeRoute.receiveContractBinding = receiveContractBinding;

module.exports = noodoeRoute;