const { returnAllPlayersInRoomWithID } = require('../utils/roomUtils.js');
const { createNewGameRecord, doesGameExistWithID, returnAllPlayersInGameWithID, 
    initializePlayers, makePlayerBet, addPlayerBetToGamePot } = require('../utils/gameUtils.js');


module.exports = (io, socket) => {

    const createGame = async (payload) => {
        try{
            const players = await returnAllPlayersInRoomWithID(payload.roomID);

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

    const setupGame = async (payload) => {

        try{

            const players = await returnAllPlayersInGameWithID(payload.gameID);

            initializePlayers(players);

            io.in(payload.gameID).emit("game:setup-complete", true);

        }catch(error){

            io.in(payload.gameID).emit("game:setup-complete", false);

        }
        
        

    };

    const startGame = async (payload) => {

        try{
            
            const players = await returnAllPlayersInGameWithID(payload.gameID);

            const firstPlayer = players[0];

            io.in(payload.gameID).emit("game:start-complete", true);

            io.in(payload.gameID).emit("game:current-player-turn", firstPlayer);

        }catch(error){

            io.in(payload.gameID).emit("game:start-complete", false);

        }

        
    };

    const checkGameAction = (payload) => {

        try{
            
            const { action, username, gameID } = payload;

            switch(action){
                case 'bet':
                    const { betAmount } = payload;
                    makePlayerBet(username, betAmount);
                    addPlayerBetToGamePot(gameID, betAmount);
                break;
                case 'call':
                break;
                case 'raise':
                break;
                case 'fold':
                break;
                default:
                break;
            }

        }catch(error){

           io.in(payload.gameID).emit("game:make-player-action-complete", false);

        }
    };

    socket.on("game:create", createGame);
    socket.on("game:setup", setupGame);
    socket.on("game:start", startGame);
    socket.on("game:make-player-action", checkGameAction);
}