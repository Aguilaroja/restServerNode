//Marco de servidor
const express = require('express');
const app = express();

app.post('/', (req, res) => {
    res.status(400).json({
        ok: false,
        err: {
            message: 'Bad request'
        }
    });
});

app.get('/', (req, res) => {
    res.status(400).json({
        ok: false,
        err: {
            message: 'Bad request'
        }
    });
});

app.put('/', (req, res) => {
    res.status(400).json({
        ok: false,
        err: {
            message: 'Bad request'
        }
    });
});

app.delete('/', (req, res) => {
    res.status(400).json({
        ok: false,
        err: {
            message: 'Bad request'
        }
    });
});

module.exports = app;