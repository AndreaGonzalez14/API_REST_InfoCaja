require('./server/config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(require('./server/routes/caja'))

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT)
})