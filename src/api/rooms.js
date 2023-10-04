const express = require("express");
const Room = require("../models/Room.js");
const router = express.Router();

const fieldExists = (field) => {
    return !(typeof field === 'undefined' || field === null)
}

const sendErrorResponse = (res, code , messageString) => {
    res.send(code).json({
        message: messageString,
        code : code
    });
}

const sendCustomResponse = (res, code , object) => {
    res.send(code).json(object);
}

const generateRoomID = () => {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const roomIDLength = 15;

    var roomID = '';

    for(var i = 0; i < roomIDLength; i ++){
        roomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return roomID;
}

const generateNewRoomID = () => {
    const tempRoomID  = generateRoomID();

    while(!doesRoomExistWithID(tempRoomID)){
        tempRoomID = generateRoomID();
    }

    return tempRoomID;
}

const doesRoomExistWithID = async (id) => {
    const exists  = await Room.exists({ roomid: id });
    return exists
}

const createNewRoomRecord = async (properties) => {
    const room  = await Room.create(properties);
}


router.route("/create").post((req , res) => {

    const { name, player_count } = req.body;

    if(!(fieldExists(name) && fieldExists(player_count))){
        sendErrorResponse(res, 400, "One or More Necessary Arguments are missing from the Request");
        return;
    }

    try{

        const roomID = generateNewRoomID();

        createNewRoomRecord({ roomid: roomID, name: name, playerMax: player_count});

        sendCustomResponse(res, 200, {
            message: "Room was created successfully",
            roomID: roomID,
            code: 200
        });

        return;
    }catch(error){

        sendErrorResponse(res, 500 , "Server Error Occured While Processing Transaction. Please Try Again Later");
        return;
    }

});


module.exports = router;
