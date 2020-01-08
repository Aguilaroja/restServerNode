//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const ChargerCenter = require('../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../models/service_center'); //Ésto es un objeto para el Schema
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

app.post('/:create', [verificaToken, verificaAdminRole], (req, res) => {
    let accion = req.params.create;
    let dato = req.body;

    // return res.json({
    //     dato,
    //     accion
    // })

    if (accion === 'chargerCenter') {
        let charger_center = new ChargerCenter({ //Instancia del Schema ChargerCenter
            name_center: dato.name_center,
            swaps_low: dato.swaps_low,
            swaps_medium: dato.swaps_medium,
            swaps_full: dato.swaps_full,
            total_swaps_available: dato.total_swaps_available,
            schedule_mf: dato.schedule_mf,
            schedule_sa: dato.schedule_sa,
            schedule_su: dato.schedule_su,
            service_today_open: dato.service_today_open,
            service_today_close: dato.service_today_close,
            latitude: dato.latitude,
            longitude: dato.longitude,
            address: dato.address
        });

        // return charger_center;

        // save() es una palabra reservada de mongoose
        charger_center.save((err, chargerCenterDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                charger_center: chargerCenterDB
            });
        });
    } else if (accion === 'serviceCenter') {
        let service_center = new ServiceCenter({ //Instancia del Schema ServiceCenter
            name_center: dato.name_center,
            schedule_mf: dato.schedule_mf,
            schedule_sa: dato.schedule_sa,
            schedule_su: dato.schedule_su,
            service_today_open: dato.service_today_open,
            service_today_close: dato.service_today_close,
            phone_number: dato.phone_number,
            latitude: dato.latitude,
            longitude: dato.longitude,
            address: dato.address
        });

        // return charger_center;

        // save() es una palabra reservada de mongoose
        service_center.save((err, serviceCenterDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                service_center: serviceCenterDB
            });
        });
    }

});


module.exports = app;