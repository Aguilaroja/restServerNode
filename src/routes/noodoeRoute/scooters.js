const ZynchScooter = require('../../server/models/zynch_scooter'); //Ésto es un objeto para el Schema

scooter = (req, res) => {
    let dato = req.query;

    ZynchScooter.find({ id_user: dato.id_user }, (err, scooterDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!scooterDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Email incorrecto'
                }
            });
        }

        res.json({
            ok: true,
            scooter: scooterDB
        });
    });
};

module.exports = scooter;