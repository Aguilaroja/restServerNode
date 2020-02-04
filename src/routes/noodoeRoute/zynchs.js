const ZynchMoto = require('../../server/models/zynch_moto'); //Ésto es un objeto para el Schema

zynchs = (req, res) => {
    let dato = req.query;

    ZynchMoto.find({ id_user: dato.id_user }, (err, zynchDB) => {
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
                    message: 'Email incorrecto'
                }
            });
        }

        res.json({
            ok: true,
            zynch: zynchDB
        });
    });
};

module.exports = zynchs;