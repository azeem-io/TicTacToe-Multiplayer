import { io, Socket } from "socket.io-client";

export let socket: Socket | undefined = undefined;

export function initSocket() {
    if (socket) return;
    socket = io("http://localhost:4000/");
}
