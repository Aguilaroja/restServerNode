const getOwnerInfo = require('./getOwnerInfo');
const scooters = require('./scooters');
const packs = require('./packs');
const centers = require('./centers');
const update = require('./update');
const allowUserSwapBattery = require('./allowUserSwapBattery');
const receiveContractBinding = require('./receiveContractBinding');
const swapDone = require('./swapDone');

const noodoeRoute = {};
noodoeRoute.getOwnerInfo = getOwnerInfo;
noodoeRoute.scooters = scooters;
noodoeRoute.packs = packs;
noodoeRoute.centers = centers;
noodoeRoute.update = update;
noodoeRoute.allowUserSwapBattery = allowUserSwapBattery;
noodoeRoute.receiveContractBinding = receiveContractBinding;
noodoeRoute.swapDone = swapDone;

module.exports = noodoeRoute;