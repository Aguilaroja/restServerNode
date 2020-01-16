//Requiere de config para saber el puerto por donde entrarás las peticiones
require('./config/config');

// const funciones = require('../noodoe/apiNoodoe');

//Marco de servidor
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Da formato JSON a las respuestas
const bodyParser = require('body-parser');

//parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos online')
    });