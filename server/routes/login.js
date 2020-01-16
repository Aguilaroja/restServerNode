//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../models/token_login'); //Ésto es un objeto para el Schema
const ZynchMoto = require('../models/zynch_moto'); //Ésto es un objeto para el Schema
const { verificaCliente } = require('../middlewares/autenticacion');

app.get('/login', [verificaCliente], (req, res) => {
    let dato = req.query;
    let passwordIn = String(dato.password);
    let ip = req.ip;

    // console.log(ip)

    // return res.json({
    //     dato,
    //     passwordIn,
    //     ip
    // });

    // Consulta el usuario
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
                    message: 'Usuario* o contraseña incorrectos'
                }
            })
        }

        // Compara que las contraseñas sean iguales ya encriptadas
        if (!bcrypt.compareSync(passwordIn, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña* incorrectos'
                }
            })
        }

        // Genera el JWT
        let token = jwt.sign({
            user: {
                name: usuarioDB.nombre,
                email: usuarioDB.email,
                role: usuarioDB.role
            }
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        let tokenLogin = new TokenLogin({
            email: usuarioDB.email,
            tokenLog: token,
            ip_address: ip
        });

        tokenLogin.save((err, tokenLoginDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            ZynchMoto.find({ email_user: dato.email }, (err, zynchDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                if (!zynchDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Email incorrecto'
                        }
                    })
                }

                res.json({
                    ok: true,
                    user: {
                        name: usuarioDB.nombre,
                        email: usuarioDB.email,
                        role: usuarioDB.role
                    },
                    zynch: zynchDB,
                    token
                });
            });
        });
    });
});

module.exports = app;