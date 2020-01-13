//Marco de servidor
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const ChargerCenter = require('../models/charger_center'); //Ésto es un objeto para el Schema
const ServiceCenter = require('../models/service_center'); //Ésto es un objeto para el Schema
const { verificaToken } = require('../middlewares/autenticacion');

app.put('/:update', [verificaToken], (req, res) => {
    let accion = req.params.update;
    let dato = req.body;
    let id = dato.id;
    let cambiaDisponibles = {
        swaps_low: dato.swaps_low,
        swaps_medium: dato.swaps_medium,
        swaps_full: dato.swaps_full,
        total_swaps_available: dato.total_swaps_available
    }

    if (accion === 'putChargerCenter') {

        ChargerCenter.findOneAndUpdate(id, cambiaDisponibles, { new: true }, (err, disponiblesActualizadoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!disponiblesActualizadoDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'Swaps no actualizados'
                })
            }

            res.json({
                ok: true,
                disponiblesActualizadoDB
            });
        });

    }
});


module.exports = app;