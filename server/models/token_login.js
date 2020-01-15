const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

//Validaciones personalizadas para roles
// let rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol válido'
// };

let Schema = mongoose.Schema;

let tokenLoginSchema = new Schema({
    email: {
        type: String,
        // unique: true,
        required: [true, 'El nombre es necesario']
    },
    tokenLog: {
        type: String,
        required: [true, 'schedule_mf es necesario']
    },
    date_ini: {
        type: Date,
        default: Date()
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
// tokenLoginSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' }); //{PATH} es el dato que se declara como único 

module.exports = mongoose.model('TokenLogin', tokenLoginSchema);