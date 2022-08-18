import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
    getCurrentUser,
    getRoomUsers,
    userJoin,
    userLeave,
    setAsSpectating,
    getSpectators,
    getPlayers,
} from "./utils/users";
import { rooms } from "./utils/roomsList";
import { formatMessage } from "./utils/message";
import cors from "cors";

const app = express().use(
    cors({
        origin: "*",
    })
);
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.get("/rooms", (req, res) => {
    res.json(
        rooms.map((room: string, index: number) => ({
            id: index.toString(),
            name: room,
            numPlayers: getPlayers(index.toString()).length,
            numSpectators: getSpectators(index.toString()).length,
        }))
    );
});

app.get("/roomUsers", (req, res) => {
    res.json(getRoomUsers(req.query.roomId as string));
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

const botName = "Chat Bot";

const updateRoomUsers = (roomId: any) => {
    io.to(roomId).emit("updateRoomUsers", getRoomUsers(roomId));
};

// const getAllRoomUsers = async (roomId: string) => {
//     const sockets = await io.in(roomId).fetchSockets();
//     io.emit("receiveAllRoomUsers", sockets.length);
// };

// Run when client connects, emit message which catch in main.js
io.on("connection", (socket) => {
    console.log("🖧 New user connected");

    socket.on("joinRoom", ({ username, roomId }) => {
        const isPlaying = getRoomUsers(roomId).length < 2;
        const user = userJoin(socket.id, username, roomId, isPlaying);
        socket.join(roomId);
        console.log(
            `✔️  ${username} joined ${roomId} ${
                !isPlaying ? "as spectator" : ""
            }`
        ); //${ isPlaying && "as spectator"}
        console.log(`Users present in room: ${getRoomUsers(roomId).length}`);

        // Broadcast when a user connects
        socket.broadcast
            .to(roomId)
            .emit(
                "broadcastMessage",
                formatMessage(
                    botName,
                    `${user.username} has joined the room ${
                        !isPlaying ? "as spectator" : ""
                    }`
                )
            );

        // Send users info and room info
        updateRoomUsers(roomId);
    });

    // emit all room users
    // socket.on("getAllRoomUsers", (roomId) => {
    //     getAllRoomUsers(roomId);
    // });

    // change user isPlaying status
    socket.on("setAsSpectating", () => {
        const user = setAsSpectating(socket.id);
        updateRoomUsers(user?.roomId);
        if (user) {
            socket.broadcast
                .to(user.roomId)
                .emit(
                    "broadcastMessage",
                    formatMessage(botName, `${user.username} is now spectating`)
                );
        }
    });

    // Listen for receiveMessage
    socket.on("receiveMessage", ({ username, message }) => {
        // const user = getCurrentUser(socket.id);
        io.emit("broadcastMessage", formatMessage(username, message));
    });

    // Run when a user leave the room, WIP
    socket.on("leaveRoom", () => {
        const user = userLeave(socket.id);
        if (user) {
            socket.leave(user.roomId);

            console.log(`🚪 ${user.username} left ${user.roomId}`);
            io.to(user.roomId).emit(
                "broadcastMessage",
                formatMessage(botName, `${user.username} left`)
            );
            updateRoomUsers(user.roomId);
        }
    });

    // Run when a user disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            socket.leave(user.roomId);
            console.log(`🚪 ${user.username} left `);
            io.to(user.roomId).emit(
                "broadcastMessage",
                formatMessage(botName, `${user.username} left the room`)
            );
            updateRoomUsers(user.roomId);
        }
    });
});

httpServer.listen(4000, () => {
    console.log("🔰 Server Started 🔰");
});
