const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Validaciones personalizadas
let statusValidos = {
    values: ['active', 'inactive'],
    message: '{VALUE} no es un status válido'
};

let Schema = mongoose.Schema;

let zynchScooterSchema = new Schema({
    id_user: {
        type: String,
        required: true
    },
    name_zynch: {
        type: String,
        required: true
    },
    vcu: {
        type: String,
        required: true,
        unique: true
    },
    predetermined: {
        type: Boolean,
        default: false
    },
    locked: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'active',
        enum: statusValidos
    },
    img: {
        type: String,
        default: 'scooter.jpeg'
    }
});

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
zynchScooterSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('ZynchScooter', zynchScooterSchema);