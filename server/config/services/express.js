const config = require('./config');

//Marco de servidor
const express = require('express');
const routes = require('../../../routes');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser'); //Da formato JSON a las respuestas
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { log } = require('./logger'); //Serious logging using Winston instead of a simple console.log

const corsOptions = {
  optionSuccessStatus: 200,
  methods: ['GET', 'POST']
};
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

const init = () => {
  const app = express();
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use('/api/', apiLimiter);
  //Sirve para mostrar una página HTML
  app.use(express.static(config.frontendStaticFolder));
  //Para especificar en la URL un archivo diferente, en la URL se debe escribir con todo y extensión del archivo

  //Express HBS (Handlebars) engine
  hbs.registerPartials(__dirname + '/views/partials'); //Las carpetas deben estar escritas en inglés
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(
    bodyParser.urlencoded({
      extended: false,
      verify: (req, res, buf, encoding) => {
        req.rawBody = buf.toString();
      }
    })
  ); //parse application/x-www-form-urlenconded
  app.use(bodyParser.json()); //parse application/json

  return app;
};

module.exports = { init };
