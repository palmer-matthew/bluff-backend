const Room = require("../models/Room.js");



module.exports = (io, socket) => {

    const joinRoom = async (payload) => {
        console.log(`Player ${payload.username} joined Room ${payload.roomID}`);
        
        // Find room in DB and update the players field with new socket or player

        socket.join(payload.roomID);
        io.in(payload.roomID).emit("room:player-join", payload.username);
    }

    const leaveRoom = (payload) => {
        console.log(`Player ${payload.username} left Room ${payload.roomID}`);

        // Find room in DB and remove the socket or player in the players field 

        socket.leave(payload.roomID);
        io.in(payload.roomID).emit("room:player-leave", {})
    }

    socket.on("room:join", joinRoom);
    socket.on("room:leave", leaveRoom);
}