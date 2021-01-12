const express = require('express');
const app = express();

app.get('/caja', function(req, res) {
    res.send("get")
})

app.post('/caja', function(req, res) {
    res.send("post")
})

app.put('/caja/:id', function(req, res) {
    res.send("put")
})

app.delete('/caja/:id', function(req, res) {
    res.send("delete")
})

module.exports = app