const ZynchMoto = require('../../server/models/zynch_moto'); //Ésto es un objeto para el Schema

updateZynch = (req, res) => {
    let dato = req.body;
    let action = req.params.action;

    if (action == 'rename') {
        ZynchMoto.findOneAndUpdate({ serie: dato.vcu }, { name_zynch: dato.rename },
            (err, zynchDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!zynchDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'VCU incorrecto'
                        }
                    });
                }

                res.json({
                    ok: true,
                    message: 'Actualización correcta'
                });
            });
    } else if (action == 'delete') {
        res.json({
            ok: true,
            message: 'Servicio DELETE sin implentar'
        })
    } else if (action == 'locked') {
        res.json({
            ok: true,
            message: 'Servicio LOCKED sin implentar'
        })
    }
};

module.exports = updateZynch;