const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const uuidv4 = require('uuid/v4');

//Validaciones personalizadas para roles
let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuidv4(),
    unique: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  telefono: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: [true, 'La contraseña es olbigatoria']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

//Mediante ésta método se modifica el objeto de respuesta del Schema, aquí se omite el dato password
usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único

module.exports = mongoose.model('Usuario', usuarioSchema);
