const express = require('express');
const app = express();
const axios = require('axios');
// const { verificaCliente } = require('../../middlewares/autenticacion');
// const funcion = require('../../../noodoe/funciones');

app.post('/getOwnerInfo', (req, res) => {
    let ownerId = req.body.ownerId;
    let ownerType = req.body.ownerType;

    const info = async(ownerId, ownerType) => {
        const respuesta = await axios({
                method: 'POST',
                url: `https://iusa-dev.server.noodoe.com/getOwnerInfo`,
                data: {
                    ownerId: ownerId,
                    ownerType: ownerType
                }
            })
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(err => {
                console.log(err);
                return err;
            });

        return respuesta;
    };

    info(ownerId, ownerType)
        .then(response => {
            res.json({
                response
            });
        })
        .catch(err => {
            res.json({
                err
            });
        });
});

module.exports = app;