import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
    getCurrentUser,
    getRoomUsers,
    userJoin,
    userLeave,
} from "./utils/users";
import rooms from "./utils/roomsList";
import { formatMessage } from "./utils/message";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.get("/rooms", (req, res) => {
    res.json(rooms);
});

const botName = "Chat Bot";

// Run when client connects, emit message which catch in main.js
io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        console.log(` ✔️  ${user.username} joined ${user.room}`);
        console.log(getRoomUsers(user.room).length);

        // Welcome current user
        socket.emit(
            "message",
            formatMessage(botName, `Joined ${room}. Welcome to chat`)
        );

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the Chat`)
            );

        // Send users info and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", ({ username, message }) => {
        // const user = getCurrentUser(socket.id);
        io.emit("message", formatMessage(username, message));
    });

    // Run when a user leave the room, WIP
    socket.on("leaveRoom", () => {
        const user = userLeave(socket.id);
        if (user) {
            socket.leave(user.room);

            console.log(`${user.username} left via leave room `);
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the Chat`)
            );

            // update users and room info when user left
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });

    // Run when a user disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            socket.leave(user.room);
            console.log("user disconnected!");
            console.log(`${user.username} left `);
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the Chat`)
            );

            // update users and room info when user left
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

httpServer.listen(4000, () => {
    console.log("🔰 Server Started 🔰");
});
