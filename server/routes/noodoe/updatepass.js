//Marco de servidor
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../../models/usuario'); //Ésto es un objeto para el Schema
const { verificaTokenJWT } = require('../../middlewares/autenticacion');

app.post('/updatepass', [verificaTokenJWT], (req, res) => {
    let user = req.user;
    let datos = req.body;

    Usuario.findOneAndUpdate({ email: user.email }, { password: bcrypt.hashSync(datos.pass1, 10) }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe el usuario'
                }
            });
        }

        console.log(usuarioDB);

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

module.exports = app;