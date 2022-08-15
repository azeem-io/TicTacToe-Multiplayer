import { useContext, useEffect } from "react";
import io from "socket.io-client";
import { SocketContext } from "../context/socket";

type CallBack = (args: any) => any;

// hook use to prevent multiple socket connections and events in React
export default function useSocket(eventName: string, cb: CallBack) {
    const socket = useContext(SocketContext);

    const removeSocket = async () => {
        socket.off(eventName, cb);
    };

    useEffect(() => {
        socket.on(eventName, cb);
        console.log(`Add listener... EventName: ${eventName}  `);

        return () => {
            console.log("remove listener");
            removeSocket();
        };
    }, []);

    return socket;
}
