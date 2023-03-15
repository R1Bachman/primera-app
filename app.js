const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

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

//rutas a configurar
app.get('/', (req, res) => {
    //res.send('Mi respuesta desde express') lo cambiamos por el uso de ejs a lo de abajo
    res.render("index", {titulo: "mi titulo dinamico"})
})

app.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: 'En pagina de servicios'})
})

app.use((req, res, next) => {
    res.status(404).render("404")
})


app.listen(port, () => {
    console.log('Servidor On Fire',port)
})