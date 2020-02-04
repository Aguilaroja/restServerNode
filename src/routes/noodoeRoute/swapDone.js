const ZynchPack = require('./../../server/models/zynch_pack');
const log = require('../../server/config/services/logger');
const jwt = require('jsonwebtoken');

swapDone = async(req, res) => {
    let vcu = req.body.vcu;
    let token = req.body.token;

    const verificado = await jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }

        return decoded;
    });

    let idVerificado = verificado.plan.id;

    const swaps = await ZynchPack.findOne({ serie: vcu, id: idVerificado });

    if (!swaps) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Not found'
            }
        });
    }

    ZynchPack.findOneAndUpdate({ serie: swaps.serie, id: swaps.id }, { available_swaps: swaps.available_swaps - 1 }, (err, swapDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!swapDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No update'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Swap done'
        });
    });
}

module.exports = swapDone;