const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    playerCount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Room", roomSchema);