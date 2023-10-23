const { addPlayerToRoomRecord, removePlayerFromRoomRecord, returnAllPlayersInRoomWithID } = require('../utils/roomUtils.js');

module.exports = (io, socket) => {

    const joinRoom = async (payload) => {
        
        var playersInRoom;

        try{

            addPlayerToRoomRecord(payload.roomID, payload.username);

            playersInRoom = await returnAllPlayersInRoomWithID(payload.roomID);

        }catch(error){

            // Error Logic 

        }

        socket.join(payload.roomID);
        io.in(payload.roomID).emit("room:player-join", playersInRoom);

        console.log(`Player ${payload.username} joined Room ${payload.roomID}`);
    }

    const leaveRoom = async (payload) => {
        
        var playersInRoom;
        
        try{

            removePlayerFromRoomRecord(payload.roomID, payload.username);

            playersInRoom = await returnAllPlayersInRoomWithID(payload.roomID);

        }catch(error){

            // Error Logic 

        }

        socket.leave(payload.roomID);
        io.in(payload.roomID).emit("room:player-leave", playersInRoom);

        console.log(`Player ${payload.username} left Room ${payload.roomID}`);
    }

    socket.on("room:join", joinRoom);
    socket.on("room:leave", leaveRoom);
}