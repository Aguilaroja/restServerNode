'use strict';

let views = {};

/**
 * Render index page
 */
views.index = (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.render('index');
  } else {
    res.render('index');
    //res.json('Server ready');
  }
};

/**
 * Render recovery page
 */
const jwt = require('jsonwebtoken');

views.recovery = (req, res) => {
  let token = req.query ? req.query.token : '';

  const verifica = jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Tiempo expirado para actualizar tu contraseña'
        }
      });
    }

    user = decoded.user;
    return user;
  });

  res.render('recovery', {
    nombre: verifica.email,
    token: token,
    anio: new Date().getFullYear()
  });
};

module.exports = views;
