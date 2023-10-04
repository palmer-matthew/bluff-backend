const Room = require("../models/Room.js");

const addPlayerToRoomRecord = async (roomID, username) => {
    const room = await Room.updateOne({ roomid: roomID }, { $push: { players: username } , $set: { updatedDate : Date.now() }});
}

const returnAllPlayersInRoomWithID = async (roomID) => {
    const dbResult = await Room.findOne({ roomid: roomID });
    return dbResult.players
}

const removePlayerFromRoomRecord = async (roomID, username) => {
    const room = await Room.updateOne({ roomid: roomID }, { $pull: { players: username } , $set: { updatedDate : Date.now() }});
}

module.exports = (io, socket) => {

    const joinRoom = async (payload) => {
        
        var playersInRoom;

        try{

            addPlayerToRoomRecord(payload.roomID, payload.username);

            playersInRoom = returnAllPlayersInRoomWithID(payload.roomID);

        }catch(error){

            // Error Logic 

        }

        socket.join(payload.roomID);
        io.in(payload.roomID).emit("room:player-join", playersInRoom);

        console.log(`Player ${payload.username} joined Room ${payload.roomID}`);
    }

    const leaveRoom = (payload) => {
        
        var playersInRoom;
        
        try{

            removePlayerFromRoomRecord(payload.roomID, payload.username);

            playersInRoom = returnAllPlayersInRoomWithID(payload.roomID);

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