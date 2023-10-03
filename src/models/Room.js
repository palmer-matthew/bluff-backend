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
    playerMax: {
        type: Number,
        required: true,
        max: 10
    },
    players : {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("Room", roomSchema);