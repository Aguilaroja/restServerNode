//Marco de servidor
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const Usuario = require('../models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../models/token_login'); //Ésto es un objeto para el Schema

app.post('/login', (req, res) => {
    let dato = req.body;
    let passwordIn = String(dato.password);

    // return res.json({
    //     dato
    // });

    // return res.json({
    //     // dato,
    //     email: dato.email,
    //     pass: dato.password
    // });

    //Consulta el usuario
    Usuario.findOne({ email: dato.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario* o contraseña incorrectos'
                }
            })
        }

        //Compara que las contraseñas sean iguales ya encriptadas
        if (!bcrypt.compareSync(passwordIn, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña* incorrectos'
                }
            })
        }

        //Se genera el JWT
        let token = jwt.sign({
            user: {
                name: usuarioDB.nombre,
                email: usuarioDB.email,
                role: usuarioDB.role
            }
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        TokenLogin.findOne({ email: usuarioDB.email }, (err, usuarioTokenDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioTokenDB) {
                let tokenLogin = new TokenLogin({
                    email: usuarioDB.email,
                    tokenLog: token
                });

                tokenLogin.save((err, tokenLoginDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    res.json({
                        ok: true,
                        user: {
                            name: usuarioDB.nombre,
                            email: usuarioDB.email,
                            role: usuarioDB.role
                        },
                        token
                    });
                });
            } else {
                let id = {
                    _id: usuarioTokenDB._id
                };
                let cambiaToken = {
                    tokenLog: token
                };

                TokenLogin.findOneAndUpdate(id, cambiaToken, { new: true }, (err, tokenActualizadoDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    if (!tokenActualizadoDB) {
                        return res.status(400).json({
                            ok: false,
                            err: 'Token no actualizado'
                        })
                    }

                    res.json({
                        ok: true,
                        user: {
                            name: usuarioDB.nombre,
                            email: usuarioDB.email,
                            role: usuarioDB.role
                        },
                        token: tokenActualizadoDB.tokenLog
                    });
                });

            }

        });
    });
});

app.get('/login', (req, res) => {
    let dato = req.query;
    let passwordIn = String(dato.password);

    // return res.json({
    // dato
    // });

    // return res.json({
    //     // dato,
    //     email: dato.email,
    //     pass: dato.password
    // });

    //Consulta el usuario
    Usuario.findOne({ email: dato.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario* o contraseña incorrectos'
                }
            })
        }

        //Compara que las contraseñas sean iguales ya encriptadas
        if (!bcrypt.compareSync(passwordIn, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña* incorrectos'
                }
            })
        }

        //Se genera el JWT
        let token = jwt.sign({
            user: {
                name: usuarioDB.nombre,
                email: usuarioDB.email,
                role: usuarioDB.role
            }
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        TokenLogin.findOne({ email: usuarioDB.email }, (err, usuarioTokenDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioTokenDB) {
                let tokenLogin = new TokenLogin({
                    email: usuarioDB.email,
                    tokenLog: token
                });

                tokenLogin.save((err, tokenLoginDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    res.json({
                        ok: true,
                        user: {
                            name: usuarioDB.nombre,
                            email: usuarioDB.email,
                            role: usuarioDB.role
                        },
                        token
                    });
                });
            } else {
                let id = {
                    _id: usuarioTokenDB._id
                };
                let cambiaToken = {
                    tokenLog: token
                };

                TokenLogin.findOneAndUpdate(id, cambiaToken, { new: true }, (err, tokenActualizadoDB) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        })
                    }

                    if (!tokenActualizadoDB) {
                        return res.status(400).json({
                            ok: false,
                            err: 'Token no actualizado'
                        })
                    }

                    res.json({
                        ok: true,
                        user: {
                            name: usuarioDB.nombre,
                            email: usuarioDB.email,
                            role: usuarioDB.role
                        },
                        token: tokenActualizadoDB.tokenLog
                    });
                });

            }

        });
    });
});


module.exports = app;