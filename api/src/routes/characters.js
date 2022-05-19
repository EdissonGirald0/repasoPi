const  {allCharacters} = require ("./controller.character");
const {Character, Episode} = require("../db");
const principalCharacters = async (req, res) => {
    const charactersAllApi = await allCharacters();
    res.status(200).send(charactersAllApi);
}
const postCharacter = async (req, res) => {
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
}
module.exports = {
    principalCharacters,
    postCharacter
}