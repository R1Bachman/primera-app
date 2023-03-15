const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

//conexion a base de datos
const mongoose = require('mongoose');


const usuario = "bachman1"
const password = "WIR4EqIPcNeB50rF"
const dbName = "vet-blev"
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dyiohib.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('conectado a mongodb')) 
    .catch(e => console.log('error de conexión', e))

//motor de plantilla con ejs
app.set("view engine", "ejs");
app.set('views', __dirname + '/views')

//__dirname entrega dinamicamente la direccion o ubicacion donde se encuentran mis documentos c:\users....
app.use(express.static(__dirname + "/public"))

/*
se comento por que cambio por lo ejs
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname+ "/public/404.html")
})
*/

app.use(express.static(__dirname + "/public"))
//rutas web
app.use('/',require('./router/RutasWeb'))

app.use('/mascotas',require('./router/Mascotas'))

app.use((req, res, next) => {
    res.status(404).render("404")
})


app.listen(port, () => {
    console.log('Servidor On Fire',port)
})