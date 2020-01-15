//Marco de servidor
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../models/token_login'); //Ésto es un objeto para el Schema
const Client = require('../models/client'); //Ésto es un objeto para el Schema

//Verificar Token
let verificaToken = (req, res, next) => {
    let token = req.get('token'); //Éste es el token que viene en los HEADERS al hacer la petición

    TokenLogin.findOne({ tokenLog: token }, (err, tokenLoginDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!tokenLoginDB) {
            return res.json({
                ok: false,
                message: 'Token incorrecto'
            });
        }

        Usuario.findOne({ email: tokenLoginDB.email }, (err, usuarioDB) => {
            if (err) {
                return res.status(500), json({
                    ok: false,
                    err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontró token->usuario'
                    }
                });
            }

            req.user = usuarioDB;
            next();
        });
    });

    /*******************************************************************/
    //El siguiente código es para verificar el token con caducidad por JWT

    // jwt.verify(token, process.env.SEED, (err, decoded) => {
    //     if (err) {
    //         return res.status(401).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     req.user = decoded.user;
    //     next();
    // });
}

//Verifica AdminRole
let verificaAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}

let verificaCliente = (req, res, next) => {
    let id = req.get('id');
    let key = req.get('key_client');

    Client.findOne({ key_client: key, id_client: id }, (err, clientDB) => {
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

        next();
    });
}

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaCliente
};