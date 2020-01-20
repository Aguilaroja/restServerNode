//Marco de servidor
const express = require('express');
const app = express();
const hbs = require('hbs');
// const nodemailer = require('nodemailer');
// const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
// const { verificaCliente } = require('../middlewares/autenticacion');

app.get('/recovery', (req, res) => {
    // let email = req.query.email;

    res.render('recovery');

    // return res.json({
    //     ok: true
    // });
});

module.exports = app;