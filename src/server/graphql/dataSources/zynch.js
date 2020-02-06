const { DataSource } = require('apollo-datasource');
const {
  getChargerCentersGraphQL,
  getServiceCentersGraphQL
} = require('../../../routes/noodoeRoute/centers');
const {
  createChargerCenter,
  createServiceCenter,
  createZynchPack,
  createScooter,
  createClient
} = require('../../../routes/userRoute/create');

class ZynchAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  centersReducer(centers) {
    const individualReducer = val => {
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
    };
    if (Array.isArray(centers)) {
      return centers.map((val, index, array) => {
        return individualReducer(val);
      });
    } else {
      return individualReducer(centers);
    }
  }

  zynchScooterReducer(scooters) {
    const individualReducer = val => {
      console.log({ ...val });
      return {
        name: val.name_zynch,
        predetermined: val.predetermined,
        locked: val.locked,
        status: val.status,
        img: val.img,
        userId: val.id_user,
        name: val.name_zynch,
        swaps: val.swaps,
        vcu: val.vcu
      };
    };
    if (Array.isArray(scooters)) {
      return centers.map((val, index, array) => {
        return individualReducer(val);
      });
    } else {
      return individualReducer(scooters);
    }
  }

  zynchPackReducer(packs) {
    const individualReducer = val => {
      return {
        name: val.name_pack,
        userId: val.id_user,
        email: val.email,
        totalSwaps: val.total_swaps,
        swapsAvailable: val.available_swaps,
        price: val.price,
        expired: val.expired,
        validUntil: val.valid_until
      };
    };
    if (Array.isArray(packs)) {
      return centers.map((val, index, array) => {
        return individualReducer(val);
      });
    } else {
      return individualReducer(packs);
    }
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

  createChargerCenter = async chargerCenter => {
    const response = await createChargerCenter(chargerCenter);
    if (!response.err) return this.centersReducer(response.document._doc);
    else return response.err;
  };

  createServiceCenter = async serviceCenter => {
    const response = await createServiceCenter(serviceCenter);
    if (!response.err) return this.centersReducer(response.document);
    else return response.err;
  };

  createZynchPack = async zynchPack => {
    const response = await createZynchPack(zynchPack);
    if (!response.err) return this.zynchPackReducer(response.document);
    else return response.err;
  };

  createScooter = async scooter => {
    const response = await createScooter(scooter);
    if (!response.err) return this.zynchScooterReducer(response.document);
    else return response.err;
  };

  clientReducer(client) {
    return {
      name: client.name_client,
      address: client.address_client,
      id: client.id_client,
      key: client.key_client
    };
  }
  createClient = async client => {
    const response = await createClient(client);
    if (!response.err) return this.clientReducer(response.document);
    else return response.err;
  };
}

module.exports = ZynchAPI;
