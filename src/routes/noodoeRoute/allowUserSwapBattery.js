const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const ZynchScooter = require('../../server/models/zynch_scooter'); //Ésto es un objeto para el Schema
const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const log = require('../../server/config/services/logger');
const jwt = require('jsonwebtoken');
const formatoFecha = require('../../server/functions/formatoFecha');

allowUserSwapBattery = async(req, res) => {
    let uid = req.query.uid;
    let vcu = req.query.vcu;

    const scooter = await ZynchScooter.findOne({ vcu: vcu });
    // console.log(scooter);
    if (!scooter) {
        return res.json({
            result: {
                ok: false,
                err: {
                    message: "There's no zynch with this VCU"
                }
            }
        });
    }

    if (scooter.locked == true) {
        return res.json({
            result: {
                ok: false,
                err: {
                    message: "Scooter is locked"
                }
            }
        });
    }

    if (scooter.status == 'inactive') {
        return res.json({
            result: {
                ok: false,
                err: {
                    message: "Scooter was eliminated before"
                }
            }
        });
    }

    const plan = await ZynchPack.findOne({ vcu: vcu });
    // console.log(plan);
    let arrayPlan = [plan];
    arrayPlan.forEach(formatoFecha);
    let objPlan = arrayPlan[0];

    if (objPlan.expired == true) {
        return res.json({
            result: {
                ok: false,
                err: {
                    message: "Scooter Plan is expired"
                }
            }
        });
    }

    if (objPlan.available_swaps < 1) {
        return res.json({
            result: {
                ok: false,
                err: {
                    available_swaps: objPlan.available_swaps
                }
            }
        });
    }

    let token = jwt.sign({
            plan: {
                id: objPlan.id,
                name_plan: objPlan.name_pack,
                valid_until: formato(objPlan.valid_until),
                expired: objPlan.expired,
                total_swaps: objPlan.total_swaps,
                available_swaps: objPlan.available_swaps
            }
        },
        process.env.SEED, { expiresIn: 60 * 10 });

    let obj = {
        name_plan: objPlan.name_pack,
        valid_until: formato(objPlan.valid_until),
        expired: objPlan.expired,
        total_swaps: objPlan.total_swaps,
        available_swaps: objPlan.available_swaps
    }

    res.json({
        result: {
            ok: true,
            plan: obj,
            token
        }
    });
};

const formato = (fecha) => {
    let meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    var fch = new Date(fecha),
        ani = fch.getUTCFullYear(),
        mes = fch.getUTCMonth(),
        dia = fch.getUTCDate();
    var letra = `${dia}-${meses[mes]}-${ani}`;

    return letra;
}

module.exports = allowUserSwapBattery;