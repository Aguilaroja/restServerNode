const bcrypt = require('bcrypt');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const ZynchMoto = require('../../server/models/zynch_moto'); //Ésto es un objeto para el Schema
const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const log = require('../../server/config/services/logger');

receiveContractBinding = async(req, res) => {
    let datoUser = req.body.user;
    let datoVehicle = req.body.vehicle;
    let datoPlan = req.body.plan;

    let usuario = new Usuario({
        nombre: datoUser.name,
        email: datoUser.email,
        password: bcrypt.hashSync(datoUser.password, 10) //bcrypt.hashSync sirve para encriptar de una sola vía la contraseña
    });

    //save() es una palabra reservada de mongoose
    const guardaUser = await usuario.save();

    if (!guardaUser) {
        return res.json({
            ok: false,
            err: {
                message: 'Register failed'
            }
        });
    }

    let scooter = new ZynchMoto({
        id_user: guardaUser.id,
        name_zynch: datoVehicle.name,
        serie: datoVehicle.vcu
    });

    const guardaVehicle = await scooter.save();

    if (!guardaVehicle) {
        return res.json({
            ok: false,
            err: {
                message: 'Register failed'
            }
        });
    }

    let plan = new ZynchPack({
        name_pack: datoPlan.name,
        id_user: guardaUser.id,
        total_swaps: datoPlan.total_swaps,
        available_swaps: datoPlan.available_swaps,
        serie: guardaVehicle.serie,
        valid_until: datoPlan.valid_until,
        price: datoPlan.price
    });

    const guardaPlan = await plan.save();

    res.json({
        ok: true,
        user: guardaUser,
        vehicle: guardaVehicle,
        plan: guardaPlan
    })
};

module.exports = receiveContractBinding;