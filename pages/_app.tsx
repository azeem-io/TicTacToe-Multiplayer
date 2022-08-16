import "../styles/globals.css";
// import "@fontsource/montserrat/500.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import SocketContext from "context/socket";
import { UserContext } from "context/user";

import theme from "@/themes/theme";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { initSocket } from "@/data/socket";
// import { io } from "socket.io-client";

function MyApp({ Component, pageProps, router }: AppProps) {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        initSocket();
    }, []);

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
            }}
        >
            {/* <SocketContext.Provider value={socket}> */}
            <ChakraProvider theme={theme}>
                <AnimatePresence exitBeforeEnter>
                    <Component
                        // socket={socket}
                        {...pageProps}
                        key={router.pathname}
                    />
                </AnimatePresence>
            </ChakraProvider>
            {/* </SocketContext.Provider> */}
        </UserContext.Provider>
    );
}

export default MyApp;
