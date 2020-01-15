//Marco de servidor
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ClientService = require('../models/client_service'); //Ésto es un objeto para el Schema

let verificaCliente = async(req, res, next) => {
    let id = req.get('id');
    let key = req.get('key_client');

    ClientService.findOne({ key_client: key, id_client: id }, (err, clientDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!clientDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Autenticación errónea'
                }
            });
        }

        req.dataClient = clientDB;

        mongoose.disconnect().then(() => {
            console.log('Base de datos outline')
        });

        next();
    });
}

module.exports = {
    verificaCliente
}