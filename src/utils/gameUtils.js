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

const createNewPlayerRecord = async (properties) => {
    const player  = await Player.create(properties);
}

const removeExistingPlayerRecord = async (username) => {
    const player = await Player.findOneAndDelete({ username });
};

const doesPlayerExistWithUsername = async (username) => {
    const exists  = await Player.exists({ username });
    return exists
}

const generateDeck = (start, end) => {
    var deck = [];

    for(var i = start; i < end+1; i++){
        deck.push({
            value: i,
            used: false
        });
    }

    return deck;
}

const initializePlayers = async (players) => {
    var startingBalance = 100;
    var deck = generateDeck(1, 10);
    var currentUsername;

    for(var i = 0; i < players.length; i++){

        currentUsername = players[i];

        if(!doesPlayerExistWithUsername(currentUsername)){
            createNewPlayerRecord({ 
                username: currentUsername,
                hiddenCards: deck,
                visibleCards: deck,
                balance: startingBalance
            });
        }
    }
};

const deinitializePlayers = async (players) => {

    var currentUsername;

    for(var i = 0; i < players.length; i++){

        currentUsername = players[i];

        if(doesPlayerExistWithUsername(currentUsername)){
            removeExistingPlayerRecord(currentUsername)
        }
    }
};

module.exports = { 
    createNewGameRecord, doesGameExistWithID, returnAllPlayersInGameWithID,
    doesPlayerExistWithUsername, initializePlayers, deinitializePlayers
};