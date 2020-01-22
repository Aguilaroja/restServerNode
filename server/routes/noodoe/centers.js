//Marco de servidor
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const ChargerCenter = require('../../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../../models/service_center'); //Ésto es un objeto para el Schema
const { verificaCliente } = require('../../middlewares/autenticacion');

app.get('/:action', [verificaCliente], (req, res) => {
    let action = req.params.action;
    let lat1 = req.query.lat;
    let lon1 = req.query.lon;
    let arrayCenter = [];
    let idArray = [];
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
            Math.cos(lat1 * (Math.PI / 180)) * (element.latitude * (Math.PI / 180)) *
            Math.sin(dLat / 2) * Math.sin(dLat / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = r * c;

        arrayCenter.push({ id: element._id, distancia: d });
    }

    if (action === 'getChargerCenter') {

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

            // Consulta distancias entre las coordenadas recibidas por GET y las coordenadas establecidas en los centros de carga
            chargerCenterDB.forEach(consultaDistancia);

            // Ordenación ascendente por distancia de los centros de carga
            arrayCenter.sort(function(a, b) {
                return a.distancia - b.distancia;
            });

            // Genera un array con los ids ordenados de los centros de carga
            for (let i = 0; i < arrayCenter.length; i++) {
                const element = arrayCenter[i];
                idArray.push(element.id);
            }

            // Consulta los centros de carga con los ids ordenados
            ChargerCenter.find({ _id: idArray }, (err, centersDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!centersDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No hay respuesta'
                        }
                    });
                }

                // Hace match del array ordenado de ids con el array de resultados de la base de datos
                idArray.forEach(val => {
                    resOrdenada.push(centersDB.find(element => element._id.toString() == val));
                });

                res.json({
                    ok: true,
                    chargerCenter: resOrdenada
                })
            });
        });

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

            // Consulta distancias entre las coordenadas recibidas por GET y las coordenadas establecidas en los centros de carga
            serviceCenterDB.forEach(consultaDistancia);

            // Ordenación ascendente por distancia de los centros de carga
            arrayCenter.sort(function(a, b) {
                return a.distancia - b.distancia;
            });

            // Genera un array con los ids ordenados de los centros de carga
            for (let i = 0; i < arrayCenter.length; i++) {
                const element = arrayCenter[i];
                idArray.push(element.id);
            }

            // Consulta los centros de carga con los ids ordenados
            ServiceCenter.find({ _id: idArray }, (err, centersDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!centersDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No hay respuesta'
                        }
                    });
                }

                // Hace match del array ordenado de ids con el array de resultados de la base de datos
                idArray.forEach(val => {
                    resOrdenada.push(centersDB.find(element => element._id.toString() == val));
                });

                res.json({
                    ok: true,
                    serviceCenter: resOrdenada
                })
            });
        });
    }
});


module.exports = app;