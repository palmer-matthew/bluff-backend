const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameID: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    players: {
        type: [String],
        required: true
    },
    updatedDate: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("Game", gameSchema);