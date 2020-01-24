const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let zynchPackSchema = new Schema({
    email_user: {
        type: String,
        required: true
    },
    name_pack: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true,
        unique: true
    },
    total_swaps: {
        type: Number,
        required: true
    },
    available_swaps: {
        type: Number,
        required: true
    },
    valid_until: {
        type: Date,
        default: Date()
    },
    expired: {
        type: Boolean,
        default: false
    },
});

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
zynchPackSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('ZynchPack', zynchPackSchema);