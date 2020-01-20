//Marco de servidor
const express = require('express');
const app = express();
const ZynchMoto = require('../models/zynch_moto'); //Ésto es un objeto para el Schema
const { verificaTokenDB, verificaCliente } = require('../middlewares/autenticacion');
const formatoFecha = require('../functions/formatoFecha');

app.get('/zynchs', [verificaTokenDB, verificaCliente], (req, res) => {
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
            zynch: zynchDB
        });
    });
});

module.exports = app;