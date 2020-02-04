const fileUpload = require('express-fileupload');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const ZynchScooter = require('../../server/models/zynch_scooter'); //Ésto es un objeto para el Schema
const log = require('../../server/config/services/logger');
const fs = require('fs'); // file system
const path = require('path');

upload = (req, res) => {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        });
    }

    // Valida tipo
    let tiposValidos = ['scooters', 'users'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidas son ' + tiposValidos.join(', ')
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Cambiar nombre al archivo
    // 183912kuasidauso-123.jpg
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;

    archivo.mv(path.join(`public/assets/img/uploads/${ tipo }/${ nombreArchivo }`), (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Aqui, imagen cargada
        if (tipo == 'users') {
            imagenUsuario(id, res, nombreArchivo);
        } else if (tipo == 'scooters') {
            imagenScooter(id, res, nombreArchivo);
        }

    });
};

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findOne({ id: id }, (err, usuarioDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'users');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'users');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuaro no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'users');

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    });
}

function imagenScooter(id, res, nombreArchivo) {

    ZynchScooter.findOne({ vcu: id }, (err, scooterDB) => {

        if (err) {
            borraArchivo(nombreArchivo, 'scooters');

            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!scooterDB) {
            borraArchivo(nombreArchivo, 'scooters');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Scooter no existe'
                }
            });
        }

        borraArchivo(scooterDB.img, 'scooters');

        scooterDB.img = nombreArchivo;

        scooterDB.save((err, scooterGuardada) => {
            res.json({
                ok: true,
                zynch: scooterGuardada,
                img: nombreArchivo
            });
        });
    });
}

function borraArchivo(nombreImagen, tipo) {
    // Ruta de la imagen almacenada en la DB
    let pathImagen = `public/assets/img/uploads/${tipo}/${nombreImagen}`;

    // fs.existsSync(): Valida si existe esa ruta
    if (fs.existsSync(pathImagen)) {
        // Si existe borra el archivo
        fs.unlinkSync(pathImagen);
        console.log('Existe: ', pathImagen);
    } else {
        console.log('No existe: ', pathImagen);
    }
}

module.exports = upload;