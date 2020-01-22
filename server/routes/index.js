const express = require('express');
const app = express();

app.use(require('./noodoe/getOwnerInfo'));
app.use(require('./noodoe/updatepass'));
app.use(require('./noodoe/mail'));
app.use(require('./noodoe/recovery'));
app.use(require('./noodoe/zynchs'));
app.use(require('./noodoe/packs'));
app.use(require('./noodoe/error'));
app.use(require('./noodoe/login'));
app.use(require('./noodoe/create'));
app.use(require('./noodoe/centers'));
app.use(require('./noodoe/update'));

module.exports = app;