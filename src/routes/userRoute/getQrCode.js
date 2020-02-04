const QRCode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const { log } = require('../../server/config');
const qrCodeModel = require('../../server/models/qr_code'); //Ésto es un objeto para el Schema
const ZynchScooter = require('../../server/models/zynch_scooter');
const ZynchPack = require('../../server/models/zynch_pack');
const Usuario = require('../../server/models/usuario');

// Esta funcion es la entrada para la api REST
const createQrCodeREST = async (req, res) => {
  // Verificar que la solicitud esté formada correctamente
  const body = req.body;
  const vcu = body ? body.vcu : null;
  const width = body.width ? body.width : 640;
  if (!vcu && !width) {
    return res.json({
      ok: false,
      err: { message: '400 - Bad Request' }
    });
  } else {
    response = await createQrCode(vcu, width);
    return res.json(response);
  }
};
// Esta funcion hace el trabajo real de generar el QR
const createQrCode = async (vcu, width) => {
  let qrCodeObject = {};

  //Encontrar el VCU, el usuario relacionado con este VCU, los swaps disponibles
  const moto = await ZynchScooter.findOne({ vcu });
  if (!moto) {
    return {
      ok: false,
      err: {
        message: "VCU doesn't exist."
      }
    };
  } else {
    qrCodeObject.user_email = moto._doc.email_user;
  }
  const pack = await ZynchPack.findOne({ email_user: qrCodeObject.user_email });
  if (!pack) {
    return {
      ok: false,
      err: {
        message: 'NO PACKS FOUND'
      }
    };
  } else if (pack) {
    qrCodeObject.swapsAvailable = pack.available_swaps;
  }
  qrCodeObject.vcu = vcu;
  const expirationTime = 15.1; // 15 minutos y 6s despues de que se genera la solicitud
  qrCodeObject.dateGenerated = new Date();
  qrCodeObject.expiryDate = new Date(
    qrCodeObject.dateGenerated.getTime() + expirationTime * 60000 //el qr expira 15 minutos y 6 segundos despues de que se recibe la solicitud
  );
  await createQrCodeUrl(JSON.stringify(qrCodeObject), width, (err, url) => {
    if (err) {
      log.error(err);
      return {
        ok: false,
        err: {
          message: err
        }
      };
    } else {
      qrCodeObject.base64Image = url;
    }
  });
  const user = await Usuario.findOne({ email: qrCodeObject.user_email });
  if (!user) {
    return {
      ok: false,
      err: {
        message: 'NO USER FOUND'
      }
    };
  } else if (user) {
    qrCodeObject.user_id = user.id;
  }
  newQrCodeEntry = new qrCodeModel(qrCodeObject);
  newQrCodeEntry.save();
  ({
    ok: true,
    image: qrCodeObject.base64Image
  });

  return { ok: true, image: qrCodeObject.base64Image };
};

/**
 * Add an image to the center of the QR code
 * @param url
 * @param imageCenter
 * @param width
 * @param cWidth
 */
const createQrCodeUrl = async (dataForQrCode, width, callback) => {
  try {
    width = Number(width);
    const cWidth = width * 0.25;
    const cvs = createCanvas(1, 1);
    const url = await QRCode.toCanvas(cvs, dataForQrCode, {
      width: width,
      errorCorrectionLevel: 'M',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    const canvas = createCanvas(width, width);
    const ctx = canvas.getContext('2d');
    const imgPath = path.join(__dirname, '../../../public/assets/img/qrCenter.svg');
    const img = await loadImage(imgPath);
    ctx.drawImage(url, 0, 0, width, width, 0, 0, width, width);
    const center = (width - cWidth) / 2;
    ctx.drawImage(img, center, center, cWidth, cWidth);
    const dataUrl = canvas.toDataURL('image/png');
    if (!!dataUrl) {
      callback(null, dataUrl);
    } else callback('Error while generating QRcode', null);
  } catch (err) {
    callback(err.message, null);
  }
};

module.exports = { createQrCodeREST, createQrCode };
