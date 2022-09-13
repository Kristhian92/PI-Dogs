const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Race, Temperament } = require('../db');
const { Op } = require('sequelize');

const { getAllDogs } = require('../controllers/getAllDogs.js');


const router = Router();



router.get('/dogs', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
                res.status(200).send(dogName) :
                res.send([{
                    name: 'Sorry, looks like we don´t have that dog breed',
                    id: '',
                    temperaments: 'Try using our pupper creator',
                    image: 'https://i.pinimg.com/originals/44/80/5b/44805bfcaaa975c12c514d99c34c593a.gif'
                }]);
        } else {
            res.status(200).send(allDogs)
        }
    } catch (err) {
        next(err);
    }
});


router.get('/dogs/:idRaza', async (req, res, next) => {

    const { idRaza } = req.params;
    const allRaces = await getAllDogs();
    if (idRaza) {
        let race = await allRaces.filter((el) => el.id == idRaza)
        race.length ? res.status(200).json(race) : res.status(404).send(`Sorry, we don´t have a race with ${idRaza} as ID 🤷‍♀️`)
    }
});

router.get('/temperament', async (_req, res) => {

    let infoApi = await axios('https://api.thedogapi.com/v1/breeds');
    let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
    tempsRepeated = await tempsRepeated.split(',');
    const tempsConEspacio = await tempsRepeated.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.map(el => {
        if (el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                },
            });
        }
    });

    const allTemps = await Temperament.findAll();
    res.json(allTemps);

});


router.post('/dog', async (req, res) => {

    const {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        temperaments,
    } = req.body;


    const raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        image,
    });

    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments,
        }
    });
    raceCreated.addTemperament(temperamentDB);
    res.status(201).send('🐕 Race created successfully 🐶')
});


// router.delete('/dog/:id', async (req, res, next) => {

    // id = req.params.id

    // Race.destroy({
    //  where: 
    //      {id: id}
    //  }).then(function (result) {
    //     if(!result){

    //         res.status(200).send('Eliminado')
    //     } else {
    //         res.status(404).send('No se encuentra id')
    //     }
    //  })

//     await Race.destroy({
//         where: { id: req.params.id }
//     });
//     res.json({ success: ' se ha borrado la race' })

// });

// router.put('/dog/:id', async (req, res, next) => {

//     await Race.update(req.body, {
//         where: { id: req.params.id }
//     });
//     res.json({ succes: 'se han modificado los datos' })

// })

// 










module.exports = router;








