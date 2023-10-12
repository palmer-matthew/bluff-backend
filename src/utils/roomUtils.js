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

module.exports = { removePlayerFromRoomRecord, returnAllPlayersInRoomWithID, addPlayerToRoomRecord };

