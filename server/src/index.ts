import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
    getCurrentUser,
    getRoomUsers,
    userJoin,
    userLeave,
} from "./utils/users";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Run when client connects, emit message which catch in main.js
io.on("connection", (socket) => {
    console.log("New user connected");
});

httpServer.listen(4000, () => {
    console.log("server started at port 4000");
});
