// const axios = require('axios');

// const getOpcion = async(opc) => {
//     const resp = /*await axios.post(*/ `https://iusa-dev.server.noodoe.com/${opc}` /*)*/ ;

//     return JSON.stringify(resp);
// }

const getOpcion = async(opci) => {

    try {
        if (opci == 'createOwner') {
            const resultado = await createOwner(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'updateOwnerInfo') {
            const resultado = await updateOwnerInfo(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'getOwnerInfo') {
            const resultado = await getOwnerInfo(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'getSwapRecord') {
            const resultado = await getSwapRecord(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'getCabinetStatus') {
            const resultado = await getCabinetStatus(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'getOwnerRecord') {
            const resultado = await getOwnerRecord(opci); //Así capturo los datos de la función
            return resultado;
        } else if (opci === 'getBatteryStatus') {
            const resultado = await getBatteryStatus(opci); //Así capturo los datos de la función
            return resultado;
        }

        // const resultado = await createOwner(opci); //Así capturo los datos de la función
        // return resultado;
        // res.json({
        //     resultado
        // });
    } catch (error) {
        // return `La dirección ${opcion} no es correcta`;
        res.json({
            malo: opci
        });
    }

}

// getOpcion(opcion)

// const getOpcion = async(opc) => {

// const instance = axios.create({
//     baseURL: 'https://iusa-dev.server.noodoe.com/' //-,
//         // timeout: 1000,//Sino recibe respuesta, en este tiempo para el proceso
//         // headers: {
//         //     'getBatteryStatus': '' //,
//         // }
// });

// const resp = await instance.get();

// if (resp.data.Results.length === 0) {
//     throw new Error(`No hay resultados para ${dir}`);
// }

// const data = resp.data.Results[0];

/*************/

// const direc = data.name;
// const lat = data.lat;
// const lng = data.lon;

// instance.get()
//     .then(resp => {
//         console.log(resp.data);
//     })
//     .catch(err => {
//         console.log('Error: ', err);
//     });

// const resp = await createOwner();
// return {
// status: 'Ok',
// type: 'createOwner',
// result: ['success', 'error'],
// message: 'Not implemented'
// };

//     const fun = `${opc}` ();
// }

function createOwner(o) {
    // return o + 'Si';
    // const query = req.query
    // return query;
    // if (query.ownerId && query.status) {
    return {
        status: 'Ok',
        type: 'createOwner',
        result: ['success', 'error'],
        message: 'Not implemented'
    }
    // } else {
    //     res.json({
    //         status: 'Error',
    //         type: 'createOwner',
    //         error: 'Error code',
    //         message: 'An error ocurred'
    //     })
    // }
}

module.exports = {
    getOpcion
}