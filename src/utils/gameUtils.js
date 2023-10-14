const Game = require('../models/Game.js');
const Player = require('../models/Player.js');
const Room = require('../models/Room.js');

const createNewGameRecord = async (properties) => {
    const room  = await Game.create(properties);
}

const doesGameExistWithID = async (id) => {
    const exists  = await Game.exists({ gameID: id });
    return exists
}

const returnAllPlayersInGameWithID = async (gameID) => {
    const dbResult = await Game.findOne({ gameID });
    return dbResult.players
}

module.exports = { createNewGameRecord, doesGameExistWithID, returnAllPlayersInGameWithID };