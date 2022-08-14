import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000/", {
    transports: ["websocket"],
});
export const SocketContext = createContext(socket);
