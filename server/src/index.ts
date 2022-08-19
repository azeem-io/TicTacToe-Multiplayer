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

app.get("/roomUsers/:roomId", (req, res) => {
   res.json(getRoomUsers(req.params["roomId"] as string));
});

app.get("/", (req, res) => {
   res.send("Server is running!");
});

const botName = "Chat Bot";

const updateRoomUsers = (roomId: any) => {
   io.to(roomId).emit("updateRoomUsers", getRoomUsers(roomId));
};

io.on("connection", (socket) => {
   console.log("🖧 New user connected");

   socket.on("joinRoom", ({ username, roomId, isPlaying }) => {
      const user = userJoin(socket.id, username, roomId, isPlaying);
      socket.join(roomId);
      console.log(
         `✔️  ${username} joined ${roomId} ${!isPlaying ? "as spectator" : ""}`
      );
      console.log(`Users present in room: ${getRoomUsers(roomId).length}`);

      // Broadcast when a user connects
      socket.broadcast
         .to(roomId)
         .emit(
            "broadcastMessage",
            formatMessage(
               "",
               `${username} has joined the room ${
                  !isPlaying ? "as spectator" : ""
               }`,
               socket.id
            )
         );

      // Send users info and room info
      updateRoomUsers(roomId);
   });

   socket.on("updateRoomUsersRequest", (roomId) => {
      updateRoomUsers(roomId);
   });

   // change user isPlaying status
   socket.on("setAsSpectating", () => {
      const user = setAsSpectating(socket.id, socket);
      updateRoomUsers(user?.roomId);
   });

   // Listen for receiveMessage
   socket.on("receiveMessage", ({ username, message, roomId }) => {
      // const user = getCurrentUser(socket.id);
      io.to(roomId).emit(
         "broadcastMessage",
         formatMessage(username, message, socket.id)
      );
   });

   // Run when a user leave the room, WIP
   socket.on("leaveRoom", () => {
      const user = userLeave(socket.id);
      if (user) {
         socket.leave(user.roomId);

         console.log(`🚪 ${user.username} left ${user.roomId}`);
         io.to(user.roomId).emit(
            "broadcastMessage",
            formatMessage("", `${user.username} left`, socket.id)
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
            formatMessage("", `${user.username} left the room`, socket.id)
         );
         updateRoomUsers(user.roomId);
      }
   });
});

httpServer.listen(4000, () => {
   console.log("🔰 Server Started 🔰");
});
