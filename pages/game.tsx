// External imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { Flex } from "@chakra-ui/react";
import { UserContext } from "../context/user";
import { SocketContext } from "../context/socket";

const Game: NextPage = () => {
    const { state } = useContext(UserContext);
    const socket = useContext(SocketContext);

    const router = useRouter();
    const room = state.room;
    const username = state.username;

    useEffect(() => {
        if (username !== "") {
            setTimeout(() => {
                socket.emit("joinRoom", { username, room });
            }, 100);
        } else {
            router.push("/");
        }
    }, []);

    return (
        <Page title="Game">
            <Flex
                flexDirection={{ sm: "column", lg: "row" }}
                padding="3rem"
                alignItems={{ sm: "center", lg: "space-between" }}
                gap="5rem"
                w="full"
            >
                <InfoBox />
                <Board />
                <ChatBox />
            </Flex>
        </Page>
    );
};

export default Game;
