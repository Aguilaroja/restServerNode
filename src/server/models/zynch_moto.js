const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let zynchMotoSchema = new Schema({
    email_user: {
        type: String,
        required: true
    },
    name_zynch: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true,
        unique: true
    },
    swaps: {
        type: Number,
        required: true
    },
    predetermined: {
        type: Boolean,
        default: false
    }
});

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
zynchMotoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('ZynchMoto', zynchMotoSchema);