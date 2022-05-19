const { Router } = require("express");
const {principalCharacters, characterPost} = require("./characters");
const {principalEpisodes} = require("./episode");
const {Character, Episode} = require("../db");

const router = Router();

// Configurar los routers
router.get('/characters', principalCharacters)
router.get('/episodes', principalEpisodes)
router.post('/character', async (req, res) => {
    console.log(req.body);
    try {
        const {
            name,
            species,
            origin,
            imagen,
            created,
            episodes
        } = req.body;
        const newCharacter = await Character.create({
            name,
            species,
            origin,
            imagen,
            created,
            episodes
        })
        const traerEpisodeDb = await Episode.findAll({
            where: {name: episodes }
        });
        await newCharacter.addEpisodes(traerEpisodeDb);
        res.status(201).json('personaje Creado exitosamente')
    }
    catch (error) {
        console.log(error);
        res.status(500).json('Error al crear el personaje')
    }
});
module.exports = router;
