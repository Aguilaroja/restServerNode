//Marco de servidor
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../../server/models/token_login'); //Ésto es un objeto para el Schema
const ZynchMoto = require('../../server/models/zynch_moto'); //Ésto es un objeto para el Schema
const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const formatoFecha = require('../../server/functions/formatoFecha');

login = (req, res) => {
    let dato = req.query;
    let passwordIn = String(dato.password);
    let ip = req.ip;

    // Consulta el usuario
    Usuario.findOne({ email: dato.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario* o contraseña incorrectos'
                }
            });
        }

        // Compara que las contraseñas sean iguales ya encriptadas
        if (!bcrypt.compareSync(passwordIn, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña* incorrectos'
                }
            });
        }

        // Genera el JWT
        let token = jwt.sign({
                user: {
                    name: usuarioDB.nombre,
                    email: usuarioDB.email,
                    role: usuarioDB.role
                }
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        TokenLogin.findOneAndUpdate({ ip_address: ip }, { tokenLog: token, date_ini: Date() },
            (err, tokenIpDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!tokenIpDB) {
                    let tokenLogin = new TokenLogin({
                        email: usuarioDB.email,
                        tokenLog: token,
                        ip_address: ip
                    });

                    tokenLogin.save((err, tokenLoginDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }

                        ZynchMoto.find({ email_user: dato.email, predetermined: true }, (err, zynchDB) => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    err
                                });
                            }

                            if (!zynchDB) {
                                return res.status(400).json({
                                    ok: false,
                                    err: {
                                        message: 'Email incorrecto'
                                    }
                                });
                            }

                            let objetoZynch = zynchDB[0];

                            ZynchPack.find({ serie: objetoZynch.serie }, (err, zynchPackDB) => {
                                if (err) {
                                    return res.status(500).json({
                                        ok: false,
                                        err
                                    });
                                }

                                if (!zynchPackDB) {
                                    return res.status(400).json({
                                        ok: false,
                                        err: {
                                            message: 'No existe plan para esta moto'
                                        }
                                    });
                                }

                                zynchPackDB.forEach(formatoFecha);

                                let objetoZynchPack = zynchPackDB[0];
                                var ob = JSON.parse(JSON.stringify(objetoZynchPack));
                                ob.name_zynch = objetoZynch.name_zynch;

                                res.json({
                                    ok: true,
                                    user: {
                                        name: usuarioDB.nombre,
                                        email: usuarioDB.email,
                                        role: usuarioDB.role
                                    },
                                    zynch: ob,
                                    token
                                });
                            });
                        });
                    });
                } else {
                    ZynchMoto.find({ email_user: dato.email, predetermined: true }, (err, zynchDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }

                        if (!zynchDB) {
                            return res.status(400).json({
                                ok: false,
                                err: {
                                    message: 'Email incorrecto'
                                }
                            });
                        }

                        let objetoZynch = zynchDB[0];

                        ZynchPack.find({ serie: objetoZynch.serie }, (err, zynchPackDB) => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    err
                                });
                            }

                            if (!zynchPackDB) {
                                return res.status(400).json({
                                    ok: false,
                                    err: {
                                        message: 'No existe plan para esta moto'
                                    }
                                });
                            }

                            zynchPackDB.forEach(formatoFecha);

                            let objetoZynchPack = zynchPackDB[0];
                            var ob = JSON.parse(JSON.stringify(objetoZynchPack));
                            ob.name_zynch = objetoZynch.name_zynch;

                            res.json({
                                ok: true,
                                user: {
                                    name: usuarioDB.nombre,
                                    email: usuarioDB.email,
                                    role: usuarioDB.role
                                },
                                zynch: ob,
                                token
                            });
                        });
                    });
                }
            }
        );
    });
};

module.exports = login;