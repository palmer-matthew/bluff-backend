const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameID: {
        type: String,
        required: true,
        unique: true
    },
    players: {
        type: [String],
        required: true
    },
    gamePot: {
        type: Number,
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedDate: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("Game", gameSchema);