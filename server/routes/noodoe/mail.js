// 'use strict';
//Marco de servidor
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../../models/usuario'); //Ésto es un objeto para el Schema
const { verificaCliente } = require('../../middlewares/autenticacion');

app.get('/mail', [verificaCliente], (req, res) => {
    let email = req.query.email;

    if (!email) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Bad request'
            }
        });
    }

    Usuario.findOne({ email: email }, (err, usuarioDB) => {
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
                    message: 'Email incorrecto'
                }
            });
        }

        let destinatario = usuarioDB.email;

        // Genera el JWT
        let token = jwt.sign({
            user: {
                name: usuarioDB.nombre,
                email: usuarioDB.email,
                role: usuarioDB.role
            }
        }, process.env.SEED, { expiresIn: 60 * 5 }); // Expira en 5 minutos

        let output = `<b>Recuperación de contraseña</b><p>Link para actualizar contraseña: </p><a href="https://restservernode-ar.herokuapp.com/recovery?token=${token}">Actualiza aquí</a>`;
        // output += `<b>Recuperación de contraseña</b><p>Link para actualizar contraseña: </p><a href="localhost:3000/recovery?token=${token}">Actualiza aquí</a>`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emmanuel.aguilaroja@gmail.com', // generated ethereal user
                pass: 'ndmtggmsjcmfrvcp' // generated ethereal password
            }
        });

        let mailOptions = {
            from: '"Spacebar Mailer 👻" <emmanuel.aguilaroja@gmail.com>', // sender address
            to: destinatario, // list of receivers
            subject: "Recuperación de contraseña Zynch", // Subject line
            html: output // html body
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            res.json({
                ok: true,
                message: 'Email enviado correctamente'
            });
        });
    });
});

module.exports = app;