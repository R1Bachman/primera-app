const express = require('express');
const router  = express.Router();

//rutas a configurar
router.get('/', (req, res) => {
    //res.send('Mi respuesta desde express') lo cambiamos por el uso de ejs a lo de abajo
    res.render("index", {titulo: "mi titulo dinamico"})
})

router.get('/servicios', (req, res) => {
    res.render("servicios", {tituloServicios: 'En pagina de servicios'})
})

module.exports = router;