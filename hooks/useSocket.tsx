import { useContext, useEffect } from "react";
import io from "socket.io-client";
import { SocketContext } from "../context/socket";

type CallBack = (args: any) => any;

// hook use to prevent multiple socket connections and events in React
export default function useSocket(eventName: string, cb: CallBack) {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on(eventName, cb);

        return function useSocketCleanup() {
            socket.off(eventName, cb);
        };
    }, [eventName, cb]);

    return socket;
}
