const express = require('express');
const app = express();

app.use(require('./error'));
app.use(require('./login'));
app.use(require('./create'));
app.use(require('./centers'));
app.use(require('./update'));

module.exports = app;