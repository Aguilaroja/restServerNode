const funcion = require('./funciones');
const getOpcion = async(opc, dat) => {

    try {
        if (opc == 'createOwner') {
            const crea = await funcion.createOwner(dat);
            return crea;
        } else if (opc == 'updateOwnerInfo') {
            const actualiza = await funcion.updateOwnerInfo(dat);
            return actualiza;
        } else if (opc == 'getOwnerInfo') {
            const resultado = await funcion.getOwnerInfo(dat);
            return resultado;
        } else if (opc == 'getSwapRecord') {
            const resultado = await funcion.getSwapRecord(dat);
            return resultado;
        } else if (opc == 'getCabinetStatus') {
            const resultado = await funcion.getCabinetStatus(dat);
            return resultado;
        } else if (opc == 'getOwnerRecord') {
            const resultado = await funcion.getOwnerRecord(dat);
            return resultado;
        } else if (opc == 'getBatteryStatus') {
            const resultado = await funcion.getBatteryStatus(dat);
            return resultado;
        }

    } catch (error) {

        res.json({
            maloF: opc
        });
    }

}

module.exports = {
    getOpcion
}