//Marco de servidor
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const TokenLogin = require('../models/token_login'); //Ésto es un objeto para el Schema

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
                message: 'No estás autenticado'
            });
        }

        next();
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
    let user = req.get('client_key');

    
}

module.exports = {
    verificaToken,
    verificaAdminRole
};