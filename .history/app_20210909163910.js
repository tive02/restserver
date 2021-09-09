
require('dotenv').config()
const express = require('express');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT)
})