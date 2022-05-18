const  {allCharacters} = require ("./controller.character");
const {Character, Episode} = require("../db");
const principalCharacters = async (req, res) => {
    const charactersAllApi = await allCharacters();
    res.status(200).send(charactersAllApi);
}

module.exports = {
    principalCharacters
}