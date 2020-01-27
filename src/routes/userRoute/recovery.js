const jwt = require('jsonwebtoken');

recovery = (req, res) => {
  let token = req.query.token;

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

module.exports = recovery;
