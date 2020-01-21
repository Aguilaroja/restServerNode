//Marco de servidor
const express = require('express');
const app = express();
const hbs = require('hbs');
const jwt = require('jsonwebtoken');

app.get('/recovery', (req, res) => {
    let token = req.query.token;

    const verifica = jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Tiempo expirado para actualizar tu contraseña'
                }
            })
        }

        user = decoded.user;
        return user;
    });

    res.render('recovery', {
        nombre: verifica.email,
        token: token,
        anio: new Date().getFullYear()
    });
});

module.exports = app;