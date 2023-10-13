const Game = require('../models/Game.js');
const Player = require('../models/Player.js')
const Room = require('../models/Room.js');
const { returnAllPlayersInRoomWithID } = require('../utils/roomUtils.js');

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

module.exports = (io, socket) => {

    const createGame = (payload) => {
        try{
            const players = returnAllPlayersInRoomWithID(payload.roomID);

            if(doesGameExistWithID(payload.roomID)){
                return;
            }

            createNewGameRecord({
                players,
                gameID : roomID
            });

        }catch(error){

            // Error Logic

        }
    };

    const startGame = (payload) => {

        try{
            
            const players = returnAllPlayersInGameWithID(payload.gameID);

            const firstPlayer = players[0];

            io.in(payload.gameID).emit("game:current-player-turn", firstPlayer);

        }catch(error){

            // Error Logic

        }

        
    };

    socket.on("game:create", createGame);
    socket.on("game:start", startGame);
}