//Marco de servidor
const express = require('express');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
// const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const ChargerCenter = require('../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../models/service_center'); //Ésto es un objeto para el Schema
const { verificaToken } = require('../middlewares/autenticacion');

app.get('/:action', verificaToken, (req, res) => {
    let action = req.params.action;
    // let dato = req.body;

    // return res.json({
    //     action,
    //     dato
    // });

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

            //Se genera el JWT
            // let token = jwt.sign({
            //     chargerCenter: chargerCenterDB
            // }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            res.json({
                ok: true,
                chargerCenter: chargerCenterDB //,
                    // token
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
    // res.json({
    //     ok: true
    // })
});


module.exports = app;