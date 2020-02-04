const axios = require('axios');
const ChargerCenter = require('../../server/models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../../server/models/service_center'); //Ésto es un objeto para el Schema
const config = require('../../server/config/services/config');

centers = async (req, res) => {
  let action = req.params.action;
  let location = null;

  // En caso que se reciban coordenadas, ordena los centros solicitados por distancia a las coordenadas en la solicitud
  if (!!req.query.lat && !!req.query.lon) {
    location = {
      lat: req.query.lat,
      lon: req.query.lon
    };
  }

  if (action === 'getChargerCenter') {
    getAllChargerCenters((err, centers) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
      } else if (!centers) {
        res.status(400).json({
          ok: false,
          err: {
            message: 'No se encontraron centros de carga'
          }
        });
      } else {
        var sortedCenters = sortCenters(location, centers);
        res.json({
          ok: true,
          chargerCenter: location ? sortedCenters : centers
        });
      }
    });
  } else if (action === 'getServiceCenter') {
    getAllServiceCenters((err, centers) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      } else if (!centers) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No se encontraron centros de servicio'
          }
        });
      } else {
        var sortedCenters = location ? sortCenters(location, centers) : centers;
        res.json({
          ok: true,
          chargerCenter: location ? sortedCenters : centers
        });
      }
    });
  }
};

const getAllChargerCenters = async callback => {
  let ownerId = config.noodoeOwnerId;
  let ownerType = config.noodoeCabinetOwnerType;
  try {
    const respuesta = await axios({
      method: 'POST',
      url: `https://iusa-dev.server.noodoe.com/getOwnerInfo`,
      data: {
        ownerId: ownerId,
        ownerType: ownerType
      }
    }).then(async response => {
      // Crea esquema de centro de carga con datos de la respuesta de Noodoe
      // Debe ser esquema de ChargerCenter para que no haya conflictos de lectura

      let newOne = new ChargerCenter({
        address: 'No address',
        name_center: 'Demo',
        swaps_low: 0,
        swaps_medium: 0,
        swaps_full: 0,
        total_swaps_available: 0,
        schedule_mf: '00:00 - 00:00',
        schedule_sa: '00:00 - 00:00',
        schedule_su: '00:00 - 00:00',
        service_today_open: '00:00',
        service_today_close: '00:00'
      });
      if (response.data.cabinet) {
        newOne.latitude = response.data.cabinet.lat;
        newOne.longitude = response.data.cabinet.lon;
        try {
          const chargerCenters = addTodaySchedule(await ChargerCenter.find({}));
          chargerCenters.push(newOne);
          return callback(null, chargerCenters);
        } catch (err) {
          return callback(err, null);
        }
      } else
        return callback({
          ok: false,
          message: 'No response from service provider'
        });
    });
  } catch (err) {
    return callback({
      ok: false,
      message: 'No response from service provider'
    });
  }
};

const getAllServiceCenters = async callback => {
  try {
    const serviceCenters = addTodaySchedule(await ServiceCenter.find({}));
    return callback(null, serviceCenters);
  } catch (err) {
    return callback(err, null);
  }
};

const getAllChargerCentersSorted = async location => {
  var centersFromDb = [];
  getAllChargerCenters((error, centers) => {
    if (centers) {
      centersFromDb = addTodaySchedule(centers);
    } else {
      err = error;
    }
  });
  if (location) {
    return sortCenters(location, centersFromDb);
  } else {
    return centersFromDb;
  }
};
const getAllServiceCentersSorted = async location => {
  let centersFromDb = [];
  getAllServiceCenters((error, centers) => {
    if (centers) {
      centersFromDb = addTodaySchedule(centers);
    } else {
      err = error;
    }
  });
  if (location) {
    return sortCenters(location, centersFromDb);
  } else {
    return centersFromDb;
  }
};

const sortCenters = (locationUser, centers) => {
  centers = centers.map((center, index, array) => {
    const locationCenter = {
      lat: center.latitude,
      lon: center.longitude
    };
    const distance = getDistance(locationUser, locationCenter);
    return { ...center, distance };
  });
  centers.sort(function(a, b) {
    return a.distance - b.distance;
  });
  return centers;
};

function getDistance(point1, point2) {
  const rad = deg => {
    return (deg * Math.PI) / 180;
  };
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(point2.lat - point1.lat);
  var dLong = rad(point2.lon - point1.lon);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(point1.lat)) *
      Math.cos(rad(point2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

async function getChargerCentersGraphQL(location) {
  try {
    const centers = addTodaySchedule(await ChargerCenter.find({}));
    if (location) return { err: null, centers: sortCenters(location, centers) };
    else return { err: null, centers };
  } catch (err) {
    return { err, centers: null };
  }
}

async function getServiceCentersGraphQL(location) {
  try {
    const centers = addTodaySchedule(await ServiceCenter.find({}));
    if (location) return { err: null, centers: sortCenters(location, centers) };
    else return { err: null, centers };
  } catch (err) {
    return { err, centers: null };
  }
}

function addTodaySchedule(centers) {
  centers = centers.map((center, index, arr) => {
    const hourRegex = /[0-9]{2}:[0-9]{2}/g;
    let openToday = '';
    let closeToday = '';
    switch (new Date().getDay()) {
      case 0:
        openToday = center.schedule_su.match()[0];
        closeToday = center.schedule_su.match(hourRegex)[1];
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        openToday = center.schedule_mf.match(hourRegex)[0];
        closeToday = center.schedule_mf.match(hourRegex)[1];
        break;
      case 6:
        openToday = center.schedule_sa.match(hourRegex)[0];
        closeToday = center.schedule_sa.match(hourRegex)[1];
        break;
    }
    return { ...center._doc, service_today_open: openToday, service_today_close: closeToday };
  });

  return centers;
}

module.exports = {
  centers,
  getAllChargerCenters,
  getAllServiceCenters,
  getAllChargerCentersSorted,
  getAllServiceCentersSorted,
  getChargerCentersGraphQL,
  getServiceCentersGraphQL
};
