const { returnAllPlayersInRoomWithID } = require('../utils/roomUtils.js');
const { createNewGameRecord, doesGameExistWithID, returnAllPlayersInGameWithID } = require('../utils/gameUtils.js');

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