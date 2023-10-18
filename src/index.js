//CONFIGURATION IMPORT
const config = require("./config");

//MODULE IMPORT
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

//INITIALIZATION
const app = express();
const server = http.Server(app);
const io = new Server(server, {
	cors: {
		origin: "*"
	}
});

//ROUTE DEFINITIONS
const roomAPIRoute = require("./api/rooms.js");
const errorAPIRoute = require("./api/error.js");

// SOCKET HANDLER DEFINITIONS
 const registerRoomHandlers = require("./socket/roomHandler.js");
 const registerGameHandlers = require("./socket/gameHandler.js");

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use("/room", roomAPIRoute);
app.use(/[\s\S]*/, errorAPIRoute);

//ESTABLISH DBCONNECTION
// mongoose.connect(config.connectionString, 
//     () => { console.log("DB CONNECTED"); }, 
//     (e) => { console.log(e);}
// );

//SOCKET HANDLING
io.on("connection", socket => {
    console.log(`${socket.id} has connected`);

    registerRoomHandlers(io, socket);
    registerGameHandlers(io, socket);

    socket.on('disconnect', () => {
        // 
    });
})

//SERVER INIT
server.listen(config.port, () => {
    console.log(`@${Date(Date.now()).toString()}: Server is running on PORT:${config.port}`);
});
