const ZynchPack = require('../models/zynch_pack'); //Ésto es un objeto para el Schema
const log = require('../config');

let meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatoFecha(element, index, zynchs) {
  var packZynch = element;
  var fch = new Date(packZynch.valid_until);
  var ani = fch.getUTCFullYear();
  var mes = fch.getUTCMonth();
  var dia = fch.getUTCDate();
  var letra = `${dia}-${meses[mes]}-${ani}`;

  packZynch.toJSON = function() {
    let packObject = this.toObject();
    packObject.valid_until = letra;
    delete packObject.email_user;

    let hoy = new Date();

    if (fch.getTime() <= hoy.getTime()) {
      packObject.expired = true;
    } else {
      packObject.expired = false;
    }

    ZynchPack.findOneAndUpdate(
      { _id: packObject._id },
      { expired: packObject.expired },
      (err, packActDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          });
        }

        log.info(`Expiración actualizada a: ${packObject.expired}`);
      }
    );

    return packObject;
  };
}

module.exports = formatoFecha;
