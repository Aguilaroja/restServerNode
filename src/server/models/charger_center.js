const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Validaciones personalizadas para roles
// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol válido'
// };

let Schema = mongoose.Schema;

let chargerCenterSchema = new Schema({
  name_center: {
    type: String,
    unique: true,
    required: [true, 'El nombre es necesario']
  },
  swaps_low: {
    type: Number,
    required: [true, 'swaps_low es necesario']
  },
  swaps_medium: {
    type: Number,
    required: [true, 'swaps_medium es necesario']
  },
  swaps_full: {
    type: Number,
    required: [true, 'swaps_full es necesario']
  },
  total_swaps_available: {
    type: Number,
    required: [true, 'total_swaps_available es necesario']
  },
  schedule_mf: {
    type: String,
    required: [true, 'schedule_mf es necesario']
  },
  schedule_sa: {
    type: String,
    required: [true, 'schedule_sa es necesario']
  },
  schedule_su: {
    type: String,
    required: [true, 'schedule_su es necesario']
  },
  latitude: {
    type: Number,
    required: [true, 'latitude es necesario']
  },
  longitude: {
    type: Number,
    required: [true, 'longitude es necesario']
  },
  address: {
    type: String,
    default: 's/n'
  }
});

//Mediante ésta método se modifica el objeto de respuesta del Schema, aquí se omite el dato password
// chargerCenterSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
chargerCenterSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('ChargerCenter', chargerCenterSchema);
