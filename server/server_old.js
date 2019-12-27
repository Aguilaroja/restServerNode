//Requiere de config para saber el puerto por donde entrarás las peticiones
require('./config/config');

//Para enviar peticiones
// const request = require('request');

const funciones = require('../noodoe/apiNoodoe');

//Marco de servidor
const express = require('express');
const app = express();

//Da formato JSON a las respuestas
const bodyParser = require('body-parser');

//parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//app.get, app.post, app.put, app.delete: son las formas en que pueden entrar las peticiones
app.get('/', function(req, res) {
    res.json('Get Usuario');
});

app.post('/', function(req, res) {
    // let body = req.body;
    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

    let dato = req.body;

    if (dato.action) {
        let opcion = dato.action;

        // let arr = res.json({
        //     dato
        // });

        // return arr;

        const getInfo = async(opciones, datos) => {

            try {
                const resultado = await funciones.getOpcion(opciones, datos); //Así capturo los datos de la función
                // return res;
                res.json({
                    resultado
                });
            } catch (error) {
                // return `La dirección ${opcion} no es correcta`;
                res.json({
                    malo: opciones
                });
            }

        }

        getInfo(opcion, dato)
            // .then(
            //     // res.json({
            //     // bueno: resp
            //     console.log(res)
            //     // })
            // )arr
            // .catch(e => {
            //     res.json({
            //         e
            //     });
            // });
    } else {
        res.json({
            status: 'Error',
            opcion,
            message: 'Malformed Request'
        })
    }

});

app.put('/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/', function(req, res) {
    res.json('Delete Usuario');
});

app.listen(puerto, () => {
    console.log(`Escuchando el puerto ${puerto}`);
});