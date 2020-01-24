const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const formatoFecha = require('../../server/functions/formatoFecha');

packs = (req, res) => {
  let dato = req.query;

  ZynchPack.find({ email_user: dato.email }, (err, zynchDB) => {
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

    zynchDB.forEach(formatoFecha);

    res.json({
      ok: true,
      zynch: zynchDB
    });
  });
};

module.exports = packs;
