const QRCode = require('qrcode');
const { log } = require('../../server/config');
const qrCodeModel = require('../../server/models/qr_code'); //Ésto es un objeto para el Schema
const ZynchMoto = require('../../server/models/zynch_moto');
const ZynchPack = require('../../server/models/zynch_pack');
const Usuario = require('../../server/models/usuario');

const getQrCode = async (req, res) => {
  // Verificar que la solicitud esté formada correctamente
  const body = req.body ? req.body : null;
  const vcu = body.vcu ? body.vcu : null;
  const width = body.width ? body.width : 640;
  let qrCodeObject = {};
  console.log({ body: req.body });

  if (!vcu) {
    return res.json({
      ok: false,
      err: { message: '400 - Bad Request' }
    });
  } else {
    //Encontrar el VCU, el usuario relacionado con este VCU, los swaps disponibles
    // TODO: Encontrar el token usado cuando se generó esta solicitud
    const moto = await ZynchMoto.findOne({ serie: vcu });
    if (!moto) {
      log.debug("VCU doesn't exist");
      return res.json({
        ok: false,
        err: {
          message: "VCU doesn't exist."
        }
      });
    } else {
      qrCodeObject.user_email = moto.email_user;
    }
    log.debug('ENDED VCU');

    const pack = await ZynchPack.findOne({ email_user: qrCodeObject.user_email });
    if (!pack) {
      return res.json({
        ok: false,
        err: {
          message: 'NO PACKS FOUND'
        }
      });
    } else if (pack) {
      qrCodeObject.swapsAvailable = pack.available_swaps;
    }
    log.debug('ENDED ZYNCH');

    const user = await Usuario.findOne({ email: qrCodeObject.user_email });
    if (!user) {
      return res.json({
        ok: false,
        err: {
          message: 'NO USER FOUND'
        }
      });
    } else if (user) {
      qrCodeObject.user_id = user.id;
    }
    log.debug('ENDED USER');

    qrCodeObject.vcu = vcu;
    const expirationTime = 15.1; // 15 minutos y 6s despues de que se genera la solicitud

    qrCodeObject.dateGenerated = new Date();
    qrCodeObject.expiryDate = new Date(
      qrCodeObject.dateGenerated.getTime() + expirationTime * 60000 //el qr expira 15 minutos y 6 segundos despues de que se recibe la solicitud
    );

    QRCode.toDataURL(
      JSON.stringify(qrCodeObject),
      { errorCorrectionLevel: 'M', width: width, margin: 1 },
      (err, url) => {
        if (err) {
          log.error(err);
          return res.json({
            ok: false,
            err: {
              message:
                'Internal Error while generating the QR Code. Please contact the administrator'
            }
          });
        } else {
          qrCodeObject.base64Image = url;
          newQrCodeEntry = new qrCodeModel(qrCodeObject);
          newQrCodeEntry.save();
          res.json({
            ok: true,
            image: url
          });
        }
      }
    );
  }
};

module.exports = getQrCode;
