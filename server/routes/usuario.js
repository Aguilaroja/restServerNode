//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore'); //Paquetería para evitar cambios desde las peticiones como argumentos
const app = express();
const funciones = require('../../noodoe/apiNoodoe');
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema

//app.get, app.post, app.put, app.delete: son las formas en que pueden entrar las peticiones
app.post('', function(req, res) { //El tipo de request POST, lo puse en primera opción, ya que teniéndolo abajo de los GET no hacía efecto el request

    let dato = req.body;

    /****************************************************************************/
    // Ésta parte debe estar en funciones.js

    let usuario = new Usuario({ //Instancia del Schema Usuario
        nombre: dato.nombre,
        email: dato.email,
        password: bcrypt.hashSync(dato.password, 10), //bcrypt.hashSync sirve para encriptar de una sola vía la contraseña
        role: dato.role
    });

    //save() es una palabra reservada de mongoose
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null;//Serviría para evitar mostrar el valor de la contraseña al momento de mostrar el resultado del insert

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /****************************************************************************/

    // if (dato.action) {
    //     let opcion = dato.action;

    //     const getInfo = async(opciones, datos) => {

    //         try {
    //             const resultado = await funciones.getOpcion(opciones, datos);
    //             res.json({
    //                 resultado
    //             });
    //         } catch (error) {
    //             res.json({
    //                 maloInfo3: opciones
    //             });
    //         }

    //     }

    //     getInfo(opcion, dato)

    // } else {
    //     //En caso que el parámetro action venga vacío
    //     res.json({
    //         status: 'Error',
    //         message: 'Malformed Request'
    //     })
    // }

});

app.get('/:action', function(req, res) {
    let accion = req.params.action;
    let dato = req.query;
    dato = {
        dato,
        accion
    }

    // res.json({
    //     dato
    // })

    if (accion) {
        if (accion == 'pagina') {
            let desde = req.query.desde || 0;
            desde = Number(desde);

            let limite = req.query.limite || 5;
            limite = Number(limite);

            Usuario.find({}, 'nombre email') //El segundo parámetro es para indicarle cuáles datos requiero
                .limit(limite)
                .skip(desde)
                .exec((err, usuarios) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        })
                    }

                    Usuario.countDocuments({}, (err, conteo) => {
                        res.json({
                            ok: true,
                            usuarios,
                            cuantos: conteo
                        })
                    })
                })
        } else {
            // return dato;

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
        }
    } else {
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
    // let body = req.body;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); //La paquetería de underscore sirve para indicarle al PUT qué datos SI se pueden actualizar

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

    /****************************************************************************/

    // if (accion) {

    //     const getInfo = async(opciones, datos) => {

    //         try {
    //             const resultado = await funciones.getOpcion(opciones, datos);
    //             res.json({
    //                 resultado
    //             });
    //         } catch (error) {
    //             res.json({
    //                 maloInfo4: opciones
    //             });
    //         }

    //     }

    //     getInfo(accion, dato)

    // } else {
    //     //En caso que el parámetro action venga vacío
    //     res.json({
    //         status: 'Error',
    //         message: 'Malformed Request'
    //     })
    // }
});

app.delete('/:id', function(req, res) {
    let id = req.params.id;
    let cambiaEstado = {
        estado: req.query.estado
    }

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado'
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});

module.exports = app;