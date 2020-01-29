const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let qrCodeSchema = new Schema({
  user_id: {
    type: String,
    unique: false,
    required: false
  },
  user_email: {
    type: String,
    unique: false,
    required: true
  },
  vcu: {
    type: String,
    unique: true,
    required: true
  },
  base64Image: {
    type: String,
    required: true
  },
  swapsAvailable: {
    type: Number,
    required: true,
    default: 0
  },
  activeToken: {
    type: String,
    required: false,
    default: null
  },
  dateGenerated: {
    type: Date,
    default: null,
    required: false
  },
  expiryDate: {
    type: Date,
    default: null,
    required: false
  }
});

//Mediante ésta método se modifica el objeto de respuesta del Schema, aquí se omite el dato password
qrCodeSchema.methods.toJSON = function() {
  let qr = this;
  let qrObject = user.toObject();
  delete qrObject._id;

  return qrObject;
};

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
qrCodeSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('QrCode', qrCodeSchema);
