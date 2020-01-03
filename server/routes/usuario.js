//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const funciones = require('../../noodoe/apiNoodoe');
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema

//app.get, app.post, app.put, app.delete: son las formas en que pueden entrar las peticiones
app.post('', function(req, res) { //El tipo de request POST, lo puse en primera opción, ya que teniéndolo abajo de los GET no hacía efecto el request

    let dato = req.body;

    // let usuario = new Usuario({ //Instancia del Schema Usuario
    //     nombre: dato.nombre,
    //     email: dato.email,
    //     password: bcrypt.hashSync(dato.password, 10), //bcrypt.hashSync sirve para encriptar de una sola vía la contraseña
    //     role: dato.role
    // });

    // //save() es una palabra reservada de mongoose
    // usuario.save((err, usuarioDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }

    //     // usuarioDB.password = null;//Serviría para evitar mostrar el valor de la contraseña al momento de mostrar el resultado del insert

    //     res.json({
    //         ok: true,
    //         usuario: usuarioDB
    //     });
    // });

    /****************************************************************************/

    if (dato.action) {
        let opcion = dato.action;

        const getInfo = async(opciones, datos) => {

            try {
                const resultado = await funciones.getOpcion(opciones, datos);
                res.json({
                    resultado
                });
            } catch (error) {
                res.json({
                    maloInfo3: opciones
                });
            }

        }

        getInfo(opcion, dato)

    } else {
        //En caso que el parámetro action venga vacío
        res.json({
            status: 'Error',
            message: 'Malformed Request'
        })
    }

});

app.get('/:action', function(req, res) {
    let accion = req.params.action;

    res.json({
        status: 'Error',
        message: 'Malformed Request'
    })
});

app.get('/:action/:id', function(req, res) {
    let accion = req.params.action;
    let id = req.params.id;
    let dato = {
        accion,
        id
    };

    // res.json({
    //     dato
    // })

    if (accion) {

        const getInfo = async(opciones, datos) => {

            try {
                const resultado = await funciones.getOpcion(opciones, datos);
                res.json({
                    resultado
                });
            } catch (error) {
                res.json({
                    maloInfo1: opciones
                });
            }

        }

        getInfo(accion, dato)

    } else {
        //En caso que el parámetro action venga vacío
        res.json({
            status: 'Error',
            message: 'Malformed Request'
        })
    }
});

app.get('/:action/:id/:start/:end', function(req, res) {
    let accion = req.params.action;
    let id = req.params.id;
    let sta = req.params.start;
    let end = req.params.end;
    let dato = {
        id,
        sta,
        end
    };

    if (accion) {

        const getInfo = async(opciones, datos) => {

            try {
                const resultado = await funciones.getOpcion(opciones, datos);
                res.json({
                    resultado
                });
            } catch (error) {
                res.json({
                    maloInfo2: opciones
                });
            }

        }

        getInfo(accion, dato)

    } else {
        //En caso que el parámetro action venga vacío
        res.json({
            status: 'Error',
            message: 'Malformed Request'
        })
    }
});

app.put('/:action/:id/:status', function(req, res) {
    let accion = req.params.action;
    let id = req.params.id;
    let status = req.params.status;
    let dato = {
        id,
        status
    };

    if (accion) {

        const getInfo = async(opciones, datos) => {

            try {
                const resultado = await funciones.getOpcion(opciones, datos);
                res.json({
                    resultado
                });
            } catch (error) {
                res.json({
                    maloInfo4: opciones
                });
            }

        }

        getInfo(accion, dato)

    } else {
        //En caso que el parámetro action venga vacío
        res.json({
            status: 'Error',
            message: 'Malformed Request'
        })
    }
});

app.delete('/', function(req, res) {
    res.json('Delete Usuario');
});

module.exports = app;