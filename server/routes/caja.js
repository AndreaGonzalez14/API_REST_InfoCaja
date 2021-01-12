const express = require('express');
const app = express();
const Caja = require('../models/caja');

app.get('/caja', function(req, res) {
    res.send("get")
})

app.post('/caja', function(req, res) {
    let fecha = new Date()
    let body = req.body;
    let caja = new Caja({
        n_caja: body.numero_caja,
        fecha: fecha.getDate() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear(),
        hora: fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    })
    caja.save((err, cajaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                cajaInfo: cajaDB
            })
        }

    })
})

app.put('/caja/:id', function(req, res) {
    res.send("put")
})

app.delete('/caja/:id', function(req, res) {
    res.send("delete")
})

module.exports = app