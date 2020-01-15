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
    }
});

module.exports = mongoose.model('ZynchMoto', zynchMotoSchema);