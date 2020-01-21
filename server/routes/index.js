const express = require('express');
const app = express();

app.use(require('./updatepass'));
app.use(require('./mail'));
app.use(require('./recovery'));
app.use(require('./zynchs'));
app.use(require('./error'));
app.use(require('./login'));
app.use(require('./create'));
app.use(require('./centers'));
app.use(require('./update'));

module.exports = app;