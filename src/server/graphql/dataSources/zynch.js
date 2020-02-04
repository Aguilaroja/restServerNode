const { DataSource } = require('apollo-datasource');
const {
  getChargerCentersGraphQL,
  getServiceCentersGraphQL
} = require('../../../routes/noodoeRoute/centers');

class ZynchAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  centersReducer(centers) {
    return centers.map((val, index, array) => {
      console.log({ ...val });
      return {
        name: val.name_center,
        address: val.address,
        phoneNumber: val.phone_number,
        location: { latitude: val.latitude, longitude: val.longitude },
        distance: val.distance,
        scheduleMonFri: val.schedule_mf,
        scheduleSaturday: val.schedule_sa,
        scheduleSunday: val.schedule_su,
        openToday: val.service_today_open,
        closeToday: val.service_today_close
      };
    });
  }

  getChargerCenters = async location => {
    const centersFromDB = await getChargerCentersGraphQL({
      lat: location.latitude,
      lon: location.longitude
    });
    return this.centersReducer(centersFromDB.centers);
  };

  getServiceCenters = async location => {
    const centersFromDB = await getChargerCentersGraphQL({
      lat: location.latitude,
      lon: location.longitude
    });
    return this.centersReducer(centersFromDB.centers);
  };
}

module.exports = ZynchAPI;
