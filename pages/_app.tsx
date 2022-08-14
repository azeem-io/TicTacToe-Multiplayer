import "../styles/globals.css";
// import "@fontsource/montserrat/500.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { socket, SocketContext } from "context/socket";
import { UserContext } from "context/user";

import theme from "@/themes/theme";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

function MyApp({ Component, pageProps, router }: AppProps) {
    const [username, setUsername] = useState<string>("");
    // const [room, setRoom] = useState<string>("General");

    return (
        <UserContext.Provider
            value={{
                state: {
                    username,
                    // room,
                },
                setUsername,
                // setRoom,
            }}
        >
            <SocketContext.Provider value={socket}>
                <ChakraProvider theme={theme}>
                    <AnimatePresence exitBeforeEnter>
                        <Component {...pageProps} key={router.pathname} />
                    </AnimatePresence>
                </ChakraProvider>
            </SocketContext.Provider>
        </UserContext.Provider>
    );
}

export default MyApp;
