//Marco de servidor
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const ChargerCenter = require('../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../models/service_center'); //Ésto es un objeto para el Schema

//Para futura validación del token
// const { verificaToken } = require('../middlewares/autenticacion');
// app.get('/:action', verificaToken, (req, res) => {
app.get('/:action', (req, res) => {
    let action = req.params.action;
    let lat1 = req.query.lat;
    let lon1 = req.query.lon;

    if (action === 'getChargerCenter') {

        let chargerCenter = [];

        function consultaDistancia(element, index, array) {
            // console.log("a[" + index + "] = " + element);

            let r = 6371;
            let dLat = (element.latitude - lat1) * (Math.PI / 180);
            let dLon = (element.longitude - lon1) * (Math.PI / 180);
            let a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * (element.latitude * (Math.PI / 180)) *
                Math.sin(dLat / 2) * Math.sin(dLat / 2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = r * c;

            chargerCenter.push({ id: element._id, distancia: d });
        }

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
            chargerCenter.sort(function(a, b) {
                return a.distancia - b.distancia;
            });

            // Genera un array con los ids ordenados de los centros de carga
            let idArray = [];

            for (let i = 0; i < chargerCenter.length; i++) {
                const element = chargerCenter[i];
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

                var resOrdenada = [];
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

            res.json({
                ok: true,
                serviceCenter: serviceCenterDB
            });
        });
    }
});


module.exports = app;