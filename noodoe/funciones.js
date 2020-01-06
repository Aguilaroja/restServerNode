// const request = require('request');
const axios = require('axios');
// const https = require('https');
const bcrypt = require('bcrypt');
const Usuario = require('../server/models/usuario'); //Ésto es un objeto para el Schema

const createOwner = (dat) => {
    if (dat.ownerId && dat.status) {
        // if (dat.action && dat.nombre) {
        //     let usuario = new Usuario({ //Instancia del Schema Usuario
        //         nombre: dat.nombre,
        //         email: dat.email,
        //         password: bcrypt.hashSync(dat.password, 10), //bcrypt.hashSync sirve para encriptar de una sola vía la contraseña
        //         role: dat.role
        //     });

        //     // return usuario

        //     //save() es una palabra reservada de mongoose
        //     usuario.save((err, usuarioDB) => {
        //         if (err) {
        //             // return res.status(400).json({
        //             //     ok: false,
        //             //     err
        //             // })
        //             return {
        //                 status: 400,
        //                 ok: false
        //                     // err
        //             }
        //         }

        //         // usuarioDB.password = null;//Serviría para evitar mostrar el valor de la contraseña al momento de mostrar el resultado del insert

        //         // res.json({
        //         //     ok: true,
        //         //     usuario: usuarioDB
        //         // });
        //         return {
        //             ok: true
        //                 // usuario: usuarioDB
        //         }
        //     });

        /******************************************************************/

        return {
            status: 'Ok',
            type: 'createOwner',
            result: ['success', 'error'],
            message: 'Not implemented'
        }
    } else {
        return {
            status: 'Error',
            type: 'createOwner',
            error: 'Error code',
            message: 'No ownerId, No status'
        }
    }
}

const updateOwnerInfo = (dat) => {
    if (dat.id && dat.status) {
        return {
            status: 'Ok',
            type: 'updateOwnerInfo',
            result: ['success', 'error'],
            message: 'Not implemented'
        }
    } else {
        return {
            status: 'Error',
            type: 'updateOwnerInfo',
            error: 'Error code',
            message: 'No ownerId, No status'
        }
    }
}

const getOwnerInfo = (dat) => {
    if (dat.dato.id) {
        return {
            type: 'getOwnerInfo',
            status: ['active', 'disable'],
            message: 'Not implemented',
            batteryIds: ['Id0', 'Id1', 'Id2', 'Id3']
        }
    } else {
        return {
            status: 'Error',
            type: 'getOwnerInfo',
            error: 'Error code',
            message: 'No ownerId'
        }
    }
}

const getSwapRecord = (dat) => {
    if (dat.dato.id && dat.dato.start && dat.dato.end) {
        return {
            status: 'Ok',
            type: 'getSwapRecord',
            swapRecord: [{ time: '00:00:00', batteryId: '0123456789' }],
            message: 'Not implemented'
        }
    } else {
        return {
            status: 'Error',
            type: 'getSwapRecord',
            error: 'Error code',
            message: 'No ownerId, No start, No end'
        }
    }
}

const getCabinetStatus = (dat) => {
    if (dat.dato.id) {
        return {
            status: ['available', 'unavailable', 'offline'],
            power: ['UPS', 'AC'],
            lat: -0.0,
            lng: -0.0,
            type: 'getCabinetStatus',
            result: ['success', 'error'],
            message: 'Not implemented'
        }
    } else {
        return {
            status: 'Error',
            type: 'getCabinetStatus',
            error: 'Error code',
            message: 'No ownerId'
        }
    }
}

const getOwnerRecord = (dat) => {
    if (dat.dato.id) {
        return {
            status: 'Ok',
            type: 'getOwnerRecord',
            record: [{
                time: '1/1/2020',
                batteryId: '0123456789',
                from: 'prevOwnerId',
                to: 'nextOwnerId',
                action: ['get', 'release']
            }],
            message: 'Not implemented'
        }
    } else {
        return {
            status: 'Error',
            type: 'getOwnerRecord',
            error: 'Error code',
            message: 'No ownerId'
        }
    }
}

const getBatteryStatus = async(dat) => {
    if (dat.dato) { //Cuando ya se establezca la variable
        // if (dat.accion) {
        let acc = dat.accion;
        let idBattery = dat.dato.id;

        const encodeURL = encodeURI(acc);

        const instance = axios.create({
            baseURL: `https://iusa-dev.server.noodoe.com/${acc}`,
            // timeout: 1000,//Sino recibe respuesta, en este tiempo para el proceso
            headers: {
                'batteryId': idBattery //,
                    // 'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com'
            }
        });

        const resp = await instance.post();

        // if (resp.data.Results.length === 0) {
        //     throw new Error(`No hay resultados para ${acc}`);
        // }

        const data = resp.data;

        return {
            data
        }

        /**************************************************************************/

        // const getClima = async(accion) => {
        //     const resp = await axios.post(`https://iusa-dev.server.noodoe.com/${accion}`)
        //         .then((res) => {
        //             console.log(res.data)
        //                 // return res.data
        //                 // res.json({
        //             return res.data
        //                 // })
        //         })
        //         .catch(e => { console.log(e) });

        //     // return `La temperatura de ${resp.data.name} es: ${resp.data.main.temp} °C`;
        //     // let r = JSON.stringify(resp;
        //     // console.log(resp.data)
        //     // return resp.data
        // }

        // getClima(acc)
        // .then((res) => {
        //     return res
        // })
        // .catch((e) => {
        //     return e
        // })

        /**************************************************************************/

        // const req = https.request({
        //         method: 'POST',
        //         hostname: 'https://iusa-dev.server.noodoe.com',
        //         path: `/${accion}`
        //     },
        //     (res) => {
        //         console.log('statusCode:', res.statusCode);
        //         console.log('headers:', res.headers);
        //         res.on('data', (d) => {
        //             return {
        //                 d,
        //                 a: 'B'
        //             }
        //             // process.stdout.write(d);
        //         })
        //     });

        // req.on('error', (e) => {
        //     return e;
        //     // console.log(e)
        // });

        // req.end();
        // return {
        //     accion
        // }

        /**************************************************************************/

        // request({
        //         method: 'POST',
        //         hostname: `https://iusa-dev.server.noodoe.com/${accion}`,
        //         qs: { batteryId: dat.id }
        //     },
        //     (err, response, body) => {
        //         if (err) {
        //             return { err, status: 'Error' }
        //         } else {
        //             return {
        //                 accion,
        //                 response: JSON.parse(response.body)
        //             }
        //         }
        //     }
        // )
    } else {
        res.json({
            status: 'Error',
            message: 'Malformed Request'
        })
    }
}

module.exports = {
    createOwner,
    updateOwnerInfo,
    getOwnerInfo,
    getSwapRecord,
    getCabinetStatus,
    getOwnerRecord,
    getBatteryStatus
}