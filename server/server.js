//Requiere de config para saber el puerto por donde entrarás las peticiones
require('./config/config');

// const funciones = require('../noodoe/apiNoodoe');

//Marco de servidor
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Da formato JSON a las respuestas
const bodyParser = require('body-parser');

// app.use(require('./routes/usuario')); //Aquí está en el curso

//parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//parse application/raw
// app.use(bodyParser.raw());

app.use(require('./routes/index')); //Aquí lo uso yo

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online')
    });