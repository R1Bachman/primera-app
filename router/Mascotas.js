const express = require('express');
const router  = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {

    try{
        const arrayMascotas = await Mascota.find()

        res.render("mascotas",{
            arrayMascotas : arrayMascotas
        })
    }catch(error){
        console.log(error)
    }

})

router.get('/crear', (req, res) =>{
    //render al nombre de nuestra vista
    res.render('crear')
})

router.post('/', async (req, res) => {
    //lo de abajo funcionara siempre que hayamos instalado el bodyparser
    const body = req.body
    console.log(body)

    try{
        //Mascota es el modelo importado
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()

        console.log(mascotaDB)
        res.redirect('/mascotas')
    }catch(error){
        console.log(error)
    }
})


router.get('/:id', async(req, res) => {
    //desde el req leemos la id enviada la cual es una variable dinamica
    const id = req.params.id
    
    try {
        // desde mongo db se viene con un _ las vars id
        const mascotaDB = await Mascota.findOne({_id: id})
        console.log(mascotaDB)

        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })

    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })
    }
})


router.delete('/:id', async(req,res) => {
    const id = req.params.id

    try{
        //({_id: id}) valor en mongodb y el id de params
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})

        if(mascotaDB){
            res.json({
                estado: true,
                mensaje: 'Eliminado!'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'No se pudo Eliminar'
            })
        }

    }catch(error){
        console.log(error)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body

    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id, body, {useFindAndModify: false})
        console.log(mascotaDB)

        res.json({
            estado: true,
            mensaje: 'Editado'
        })

    } catch (error) {
        console.log(error)

        res.json({
            estado: false,
            mensaje: 'Fallo el Update'
        })
    }
})

module.exports = router;