//Marco de servidor
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const TokenLogin = require('../../server/models/token_login'); //Ésto es un objeto para el Schema
const ZynchScooter = require('../../server/models/zynch_scooter'); //Ésto es un objeto para el Schema
const ZynchPack = require('../../server/models/zynch_pack'); //Ésto es un objeto para el Schema
const formatoFecha = require('../../server/functions/formatoFecha');
const { config, log } = require('../../server/config');

login = (req, res) => {
    let dato = req.query;
    let passwordIn = String(dato.password);
    let ip = req.ip;

    // Consulta el usuario
    Usuario.findOne({ email: dato.email }, (err, usuarioDB) => {
        if (err) {
            log.debug(`${err}`);
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
                    id: usuarioDB.id,
                    name: usuarioDB.nombre,
                    email: usuarioDB.email,
                    role: usuarioDB.role
                }
            },
            process.env.SEED, { expiresIn: config.caducidadToken }
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

                        ZynchScooter.find({ id_user: usuarioDB.id, predetermined: true }, (err, scooterDB) => {
                            if (err) {
                                return res.status(500).json({
                                    ok: false,
                                    err
                                });
                            }

                            if (!scooterDB) {
                                return res.status(400).json({
                                    ok: false,
                                    err: {
                                        message: 'Email incorrecto'
                                    }
                                });
                            }

                            let objetoScooter = scooterDB[0];

                            ZynchPack.find({ vcu: objetoScooter.vcu }, (err, zynchPackDB) => {
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
                                ob.name_zynch = objetoScooter.name_zynch;

                                res.json({
                                    ok: true,
                                    user: {
                                        id: usuarioDB.id,
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
                    ZynchScooter.find({ id_user: usuarioDB.id, predetermined: true }, (err, scooterDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }

                        if (!scooterDB) {
                            return res.status(400).json({
                                ok: false,
                                err: {
                                    message: 'ID incorrecto'
                                }
                            });
                        }

                        let objetoScooter = scooterDB[0];

                        ZynchPack.find({ vcu: objetoScooter.vcu }, (err, zynchPackDB) => {
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
                            ob.name_zynch = objetoScooter.name_zynch;

                            res.json({
                                ok: true,
                                user: {
                                    id: usuarioDB.id,
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