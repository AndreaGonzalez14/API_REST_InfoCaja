const express = require('express');
const app = express();
const Caja = require('../models/caja');
const underscore = require('underscore');

const { verificarToken, verificaAdminRole } = require('../middlewares/autenticacion');

//Consultar por rango de fechas
app.get('/cajaFecha', [verificarToken, verificaAdminRole], function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    let fecha_solicitada_desde = req.query.fecha_desde;
    let fecha_solicitada_hasta = req.query.fecha_hasta;
    Caja.find({ fecha: { $gte: fecha_solicitada_desde, $lte: fecha_solicitada_hasta } }, 'n_caja fecha hora')
        .skip(desde)
        .limit(limite)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Caja.countDocuments({ fecha: { $gte: fecha_solicitada_desde, $lte: fecha_solicitada_hasta } }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

//Consultar por caja
app.get('/numeroCaja', [verificarToken, verificaAdminRole], function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    let caja = req.query.n_caja;
    //console.log(solicitud);
    Caja.find({ n_caja: caja }, 'n_caja fecha hora')
        .skip(desde)
        .limit(limite)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Caja.countDocuments({ n_caja: caja }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

//Consultar todos los resgistros
app.get('/cajas', [verificarToken, verificaAdminRole], function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);
    Caja.find({}, 'n_caja fecha hora')
        .skip(desde)
        .limit(limite)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Caja.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})


//Guardar informacion
app.post('/caja', [verificarToken, verificaAdminRole], function(req, res) {
    let fecha = new Date()
    let body = req.body;
    let caja = new Caja({
        n_caja: body.numero_caja,
        fecha: fecha.getDate() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear(),
        hora: fecha.getHours() + ":" + fecha.getMinutes()
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



app.delete('/caja/:id', [verificarToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;

    Caja.findByIdAndDelete(id, (err, regCajaEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (regCajaEliminado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Registro de caja no encontrado en la base de datos'
                }
            })
        }
        res.json({
            ok: true,
            usuario: regCajaEliminado
        })
    })
})

module.exports = app