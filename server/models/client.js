const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let clientSchema = new Schema({
    id_client: {
        type: String,
        unique: true
    },
    name_client: {
        type: String,
        unique: true,
        required: true
    },
    key_client: {
        type: String,
        required: true
    },
    address_client: {
        type: String,
        default: 's/n'
    }
});

//Mediante ésta método se modifica el objeto de respuesta del Schema, aquí se omite el dato password
clientSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject._id;

    return userObject;
}

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
clientSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('Client', clientSchema);