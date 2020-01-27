const bcrypt = require('bcrypt');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const log = require('../../server/config');

updatepass = (req, res) => {
  let user = req.user;
  let datos = req.body;

  Usuario.findOneAndUpdate(
    { email: user.email },
    { password: bcrypt.hashSync(datos.pass1, 10) },
    (err, usuarioDB) => {
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

      log.debug(usuarioDB);

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
};

module.exports = updatepass;
