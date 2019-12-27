//Requiere de config para saber el puerto por donde entrarás las peticiones
require('./config/config');

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

    let dato = req.body;

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
            // )
            // .catch(e => {
            //     res.json({
            //         e
            //     });
            // });
    } else {
        //En caso que el parámetro action venga vacío
        res.json({
            status: 'Error',
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