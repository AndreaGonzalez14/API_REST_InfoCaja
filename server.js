require('./server/config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(require('./server/routes/caja'))
app.use(require('./server/routes/usuario'))
app.use(require('./server/routes/login'))

mongoose.connect(process.env.urlDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Base de datos en linea")
    }
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT)
})