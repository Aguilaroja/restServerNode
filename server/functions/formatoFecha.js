//Marco de servidor
const express = require('express');
const app = express();
const ZynchMoto = require('../models/zynch_moto'); //Ésto es un objeto para el Schema

let meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatoFecha(element, index, zynchs) {
    var motoZynch = element;
    var fch = new Date(motoZynch.valid_until);
    var ani = fch.getUTCFullYear();
    var mes = fch.getUTCMonth();
    var dia = fch.getUTCDate();
    var letra = `${dia}-${meses[mes]}-${ani}`;

    motoZynch.toJSON = function() {
        let motoObject = this.toObject();
        motoObject.valid_until = letra;

        let hoy = new Date();

        if (fch.getTime() <= hoy.getTime()) {
            motoObject.expired = true;
            ZynchMoto.findOneAndUpdate({ _id: motoObject._id }, { expired: true }, (err, motoActDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
            });
        }

        return motoObject;
    }
}

module.exports = formatoFecha;