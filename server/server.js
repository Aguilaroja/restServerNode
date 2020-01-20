//Requiere de config para saber el puerto por donde entrarás las peticiones
require('./config/config');

// const funciones = require('../noodoe/apiNoodoe');

//Marco de servidor
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const hbs = require('hbs');

//Sirve para mostrar una página HTML
app.use(express.static(__dirname + '/public'));
//Para especificar en la URL un archivo diferente, en la URL se debe escribir con todo y extensión del archivo

//Express HBS (Handlebars) engine
hbs.registerPartials(__dirname + '/views/partials'); //Las carpetas deben estar escritas en inglés
app.set('view engine', 'hbs');

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