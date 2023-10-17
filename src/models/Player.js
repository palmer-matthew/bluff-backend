const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hiddenCards : {
        type: [{
            value: Number,
            used: Boolean
        }],
        default: []
    },
    visibleCards : {
        type: [{
            value: Number,
            used: Boolean
        }],
        default: []
    },
    balance : {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "active"
    }
});

module.exports = mongoose.model("Player", playerSchema);