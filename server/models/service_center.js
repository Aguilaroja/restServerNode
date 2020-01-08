const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Validaciones personalizadas para roles
// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol válido'
// };

let Schema = mongoose.Schema;

let serviceCenterSchema = new Schema({
    name_center: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
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
    service_today_open: {
        type: String,
        required: [true, 'service_today_open es necesario']
    },
    service_today_close: {
        type: String,
        required: [true, 'service_today_close es necesario']
    },
    phone_number: {
        type: Number,
        required: [true, 'phone_number es necesario']
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
// serviceCenterSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;
// }

//Validaciones: Para éste plugin se necesita el paquete mongoose-unique-validator
serviceCenterSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('ServiceCenter', serviceCenterSchema);