const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomID: {
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

module.exports = mongoose.model("Room", roomSchema);