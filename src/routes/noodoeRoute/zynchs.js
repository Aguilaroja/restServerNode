const ZynchMoto = require('../../server/models/zynch_moto'); //Ésto es un objeto para el Schema
const log = require('../../server/config');

zynchs = (req, res) => {
  let dato = req.query;
  log.debug(dato);

  ZynchMoto.find({ email_user: dato.email }, (err, zynchDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!zynchDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Email incorrecto'
        }
      });
    }

    res.json({
      ok: true,
      zynch: zynchDB
    });
  });
};

module.exports = zynchs;
