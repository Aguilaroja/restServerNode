const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../../server/models/usuario'); //Ésto es un objeto para el Schema
const log = require('../../server/config/services/logger');

mail = (req, res) => {
    let id_user = req.query.id_user;

    if (!id_user) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Bad request'
            }
        });
    }

    Usuario.findOne({ id: id_user }, (err, usuarioDB) => {
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
                    message: 'Email incorrecto'
                }
            });
        }

        let destinatario = usuarioDB.email;

        // Genera el JWT
        let token = jwt.sign({
                user: {
                    id: usuarioDB.id_user,
                    name: usuarioDB.nombre,
                    email: usuarioDB.email,
                    img: usuarioDB.img
                }
            },
            process.env.SEED, { expiresIn: 60 * 5 }
        ); // Expira en 5 minutos

        let output = `<b>Recuperación de contraseña</b><p>Link para actualizar contraseña: </p><a href="https://spacebar-iusa.herokuapp.com/recovery?token=${token}">Actualiza aquí</a>`;
        // output += `<b>Recuperación de contraseña</b><p>Link para actualizar contraseña: </p><a href="localhost:3000/recovery?token=${token}">Actualiza aquí</a>`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emmanuel.aguilaroja@gmail.com', // generated ethereal user
                pass: 'ndmtggmsjcmfrvcp' // generated ethereal password
            }
        });

        let mailOptions = {
            from: '"Spacebar Mailer 👻" <emmanuel.aguilaroja@gmail.com>', // sender address
            to: destinatario, // list of receivers
            subject: 'Recuperación de contraseña Zynch', // Subject line
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                log.error(err);
                return;
            }

            log.info('Message sent: %s', info.messageId);
            log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.json({
                ok: true,
                message: 'Email enviado correctamente'
            });
        });
    });
};

module.exports = mail;