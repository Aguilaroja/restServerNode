const axios = require('axios');
const ChargerCenter = require('../../server/models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../../server/models/service_center'); //Ésto es un objeto para el Schema
const log = require('../../server/config');

centers = (req, res) => {
  let action = req.params.action;
  let lat1 = req.query.lat;
  let lon1 = req.query.lon;
  let arrayCenter = [];
  let idArray = [];
  let distancias = [];
  let resOrdenada = [];

  // En caso que no se reciban coordenadas, le asigna una por default
  if (!lat1 || !lon1) {
    // Space Bar
    // lat1 = 19.414023;
    // lon1 = -99.173065;

    // Cibeles
    lat1 = 19.419859;
    lon1 = -99.166826;
  }

  function consultaDistancia(element, index, array) {
    let r = 6371;
    let dLat = (element.latitude - lat1) * (Math.PI / 180);
    let dLon = (element.longitude - lon1) * (Math.PI / 180);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        (element.latitude * (Math.PI / 180)) *
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = r * c;

    arrayCenter.push({ id: element._id, distancia: d });
  }

  if (action === 'getChargerCenter') {
    let ownerId = '3281AAGD7900TW0314';
    let ownerType = 'cabinet';

    const info = async (ownerId, ownerType) => {
      const respuesta = await axios({
        method: 'POST',
        url: `https://iusa-dev.server.noodoe.com/getOwnerInfo`,
        data: {
          ownerId: ownerId,
          ownerType: ownerType
        }
      })
        .then(response => {
          // log.debug(response.data);
          ChargerCenter.find({}, (err, chargerCenterDB) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err
              });
            }

            if (!chargerCenterDB) {
              return res.status(400).json({
                ok: false,
                err: {
                  message: 'No se encontraron centros de carga'
                }
              });
            }

            // Crea esquema de centro de carga con datos de la respuesta de Noodoe
            // Debe ser esquema de ChargerCenter para que no haya conflictos de lectura
            let esquema = new ChargerCenter({
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
              service_today_close: '00:00',
              latitude: response.data.cabinet.lat,
              longitude: response.data.cabinet.lon,
              __v: 0 // Este dato se genera sólo aquí, el esquema en Mongo lo crea automáticamente
            });

            // Agrega el esquema como objeto al array de la consulta a la BD
            chargerCenterDB.push(esquema);

            // Consulta distancias entre las coordenadas recibidas por GET y las coordenadas establecidas en los centros de carga
            chargerCenterDB.forEach(consultaDistancia);

            // Ordenación ascendente por distancia de los centros de carga
            arrayCenter.sort(function(a, b) {
              return a.distancia - b.distancia;
            });

            // Genera dos array con los ids ordenados de los centros de carga
            for (let i = 0; i < arrayCenter.length; i++) {
              const element = arrayCenter[i];
              idArray.push(element.id);
              distancias.push(element.distancia);
            }

            // Hace match del array ordenado de ids con el array de resultados de la base de datos
            idArray.forEach(val => {
              resOrdenada.push(chargerCenterDB.find(element => element._id.toString() == val));
            });

            // Agrega propiedad de distancia para cada centro de carga
            for (let i = 0; i < resOrdenada.length; i++) {
              const element = resOrdenada[i];
              resOrdenada[i] = JSON.parse(JSON.stringify(element));
              resOrdenada[i].distancia = distancias[i];
            }

            res.json({
              ok: true,
              chargerCenter: resOrdenada
            });
          });
        })
        .catch(err => {
          log.error(err);
          return err;
        });

      return respuesta;
    };

    info(ownerId, ownerType);
  } else if (action === 'getServiceCenter') {
    ServiceCenter.find({}, (err, serviceCenterDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!serviceCenterDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No se encontraron centros de servicio'
          }
        });
      }

      // Consulta distancias entre las coordenadas recibidas por GET y las coordenadas establecidas en los centros de servicio
      serviceCenterDB.forEach(consultaDistancia);

      // Ordenación ascendente por distancia de los centros de servicio
      arrayCenter.sort(function(a, b) {
        return a.distancia - b.distancia;
      });

      // Genera dos array con los ids ordenados de los centros de servicio
      for (let i = 0; i < arrayCenter.length; i++) {
        const element = arrayCenter[i];
        idArray.push(element.id);
        distancias.push(element.distancia);
      }

      // Hace match del array ordenado de ids con el array de resultados de la base de datos
      idArray.forEach(val => {
        resOrdenada.push(serviceCenterDB.find(element => element._id.toString() == val));
      });

      // Agrega propiedad de distancia para cada centro de servicio
      for (let i = 0; i < resOrdenada.length; i++) {
        const element = resOrdenada[i];
        resOrdenada[i] = JSON.parse(JSON.stringify(element));
        resOrdenada[i].distancia = distancias[i];
      }

      res.json({
        ok: true,
        serviceCenter: resOrdenada
      });
    });
  }
};

module.exports = centers;
