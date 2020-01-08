//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const ChargerCenter = require('../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../models/service_center'); //Ésto es un objeto para el Schema

app.post('/login', (req, res) => {
    let dato = req.body;

    //Consulta el usuario
    Usuario.findOne({ email: dato.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        }

        // return res.json({
        //     dato
        // })

        //Compara que las contraseñas sean iguales ya encriptadas
        if (!bcrypt.compareSync(dato.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrectos'
                }
            })
        }

        //Consulta Centros de carga
        ChargerCenter.find({}, (err, chargeCenterDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!chargeCenterDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontraron Centros de carga'
                    }
                })
            }

            //Consulta Centros de servicio
            ServiceCenter.find({}, (err, serviceCenterDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!serviceCenterDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No se encontraron Centros de servicio'
                        }
                    });
                }

                //Se genera el JWT
                let token = jwt.sign({
                    user: {
                        name: usuarioDB.nombre,
                        email: usuarioDB.email,
                        role: usuarioDB.role
                    },
                    chargerCenter: chargeCenterDB,
                    serviceCenter: serviceCenterDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    user: {
                        name: usuarioDB.nombre,
                        email: usuarioDB.email,
                        role: usuarioDB.role
                    },
                    chargerCenter: chargeCenterDB,
                    serviceCenter: serviceCenterDB,
                    token
                });
            });
        });
    });
    // res.json({
    //     ok: true
    // })
})


module.exports = app;