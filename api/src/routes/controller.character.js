const axios  =  require ( 'axios' );
const { Character, Episode} = require('../db');

const getCharacters = async ()=> {
    let arrCharacter = [];
    let apiCharacters ="https://rickandmortyapi.com/api/character";
    for (let i = 0; i < 42 ; i++) {
        const dataUrl = await axios.get(apiCharacters)
        dataUrl.data.results.map((inf) => {
            arrCharacter.push({
                id: inf.id,
                name: inf.name,
                species: inf.species,
                origin: inf.origin.name,
                image: inf.image,
            })
        })
        apiCharacters = dataUrl.data.info.next;
    }
    return arrCharacter;
   }
const getInfDb = async () => {
    const arrCharacterDb = await Character.findAll({
        include: {
            model: Episode,
            attributes: ["name"],
            through: {
                attributes: []
            },
        },
    });
    const mapCharactersDb = arrCharacterDb.map((mp) => {
        return {
            id: mp.id,
            name: mp.name,
            species: mp.species,
            origin: mp.origin,
            image: mp.image,
        }
        return mapCharactersDb;
    });
}

const allCharacters = async () => {
    const charactersApi = await getCharacters();
    const characterDb = await getInfDb();
    const charactersConcat = charactersApi.concat(characterDb);
    return charactersConcat;
};
   module.exports = {
    allCharacters
   }