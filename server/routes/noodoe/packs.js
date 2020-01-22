//Marco de servidor
const express = require('express');
const app = express();
const ZynchPack = require('../../models/zynch_pack'); //Ésto es un objeto para el Schema
const { verificaTokenDB, verificaCliente } = require('../../middlewares/autenticacion');
const formatoFecha = require('../../functions/formatoFecha');

app.get('/packs', [verificaTokenDB, verificaCliente], (req, res) => {
    let dato = req.query;

    ZynchPack.find({ email_user: dato.email }, (err, zynchDB) => {
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