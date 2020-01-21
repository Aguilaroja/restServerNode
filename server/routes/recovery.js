//Marco de servidor
const express = require('express');
const app = express();
const hbs = require('hbs');
// const nodemailer = require('nodemailer');
// const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
// const { verificaCliente } = require('../middlewares/autenticacion');

app.get('/recovery', (req, res) => {
    let token = req.query.token;

    res.render('recovery', {
        token: token,
        anio: new Date().getFullYear()
    });
});

app.post('/updatepass', (req, res) => {
    let token = req.body;
    console.log(token);
});

module.exports = app;