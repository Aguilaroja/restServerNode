const request = require('request');

const createOwner = (dat) => {
    if (dat.ownerId && dat.status) {
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
    if (dat.ownerId && dat.status) {
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
    if (dat.ownerId) {
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
            message: 'An error ocurred'
        }
    }
}

const getSwapRecord = (dat) => {
    if (dat.ownerId && dat.start && dat.end) {
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
            message: 'An error ocurred'
        }
    }
}

const getCabinetStatus = (dat) => {
    if (dat.ownerId) {
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
            message: 'An error ocurred'
        }
    }
}

const getOwnerRecord = (dat) => {
    if (dat.ownerId) {
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
            message: 'An error ocurred'
        }
    }
}

const getBatteryStatus = (dat) => {
    // if (dat.batteryId) {
    if (dat.action) {
        let accion = dat.action;
        request({
                method: 'POST',
                uri: `https://iusa-dev.server.noodoe.com/${accion}`,
                // qs: { batteryId: query.batteryId }
            },
            (err, response, body) => {
                if (err) {
                    res.json({ err, status: 'Error' })
                } else {
                    res.json({
                        // accion,
                        response: JSON.parse(response.body)
                    })
                }
            }
        )
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