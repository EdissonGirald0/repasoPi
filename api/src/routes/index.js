const { Router } = require("express");
const {principalCharacters, postCharacter} = require("./characters");
const {principalEpisodes} = require("./episode");
const router = Router();

// Configurar los routers
router.get('/characters', principalCharacters)
router.get('/episodes', principalEpisodes)
router.post('/character', postCharacter);
module.exports = router;
