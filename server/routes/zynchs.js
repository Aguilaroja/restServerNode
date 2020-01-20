//Marco de servidor
const express = require('express');
const app = express();
const ZynchMoto = require('../models/zynch_moto'); //Ésto es un objeto para el Schema
const { verificaCliente } = require('../middlewares/autenticacion');
const formatoFecha = require('../functions/formatoFecha');

app.get('/zynchs', [verificaCliente], (req, res) => {
    let dato = req.query;

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

        zynchDB.forEach(formatoFecha);

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

module.exports = app;