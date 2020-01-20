const mongoose = require('mongoose');

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
    swaps: {
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
    predetermined: {
        type: Boolean,
        default: false
    }
});

//Mediante ésta método se modifica el objeto de respuesta del Schema, aquí se omite el dato password
zynchMotoSchema.methods.toJSON = function() {
    let moto = this;
    let motoObject = moto.toObject();
    delete motoObject.email_user;

    return motoObject;
}


module.exports = mongoose.model('ZynchMoto', zynchMotoSchema);