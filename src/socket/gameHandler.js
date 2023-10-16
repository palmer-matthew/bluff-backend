const { returnAllPlayersInRoomWithID } = require('../utils/roomUtils.js');
const { createNewGameRecord, doesGameExistWithID, returnAllPlayersInGameWithID, initializePlayers } = require('../utils/gameUtils.js');


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

            io.in(payload.roomID).emit("game:create-complete", true);

        }catch(error){

            io.in(payload.gameID).emit("game:create-complete", false);

        }
    };

    const setupGame = (payload) => {

        try{

            const players = returnAllPlayersInGameWithID(payload.gameID);

            initializePlayers(players);

            io.in(payload.gameID).emit("game:setup-complete", true);

        }catch(error){

            io.in(payload.gameID).emit("game:setup-complete", false);

        }
        
        

    };

    const startGame = (payload) => {

        try{
            
            const players = returnAllPlayersInGameWithID(payload.gameID);

            const firstPlayer = players[0];

            io.in(payload.gameID).emit("game:start-complete", true);

            io.in(payload.gameID).emit("game:current-player-turn", firstPlayer);

        }catch(error){

            io.in(payload.gameID).emit("game:start-complete", false);

        }

        
    };

    const checkGameplay = (payload) => {

        try{
            
            // 

        }catch(error){

            // Error Logic

        }
    };

    socket.on("game:create", createGame);
    socket.on("game:setup", setupGame);
    socket.on("game:start", startGame);
}