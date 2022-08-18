// External imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { Flex } from "@chakra-ui/react";
import { UserContext } from "@/context/user";
import { socket } from "@/data/socket";

interface User {
    id: string;
    username: string;
    roomId: string;
    isPlaying: boolean;
}

const Room: NextPage = () => {
    const router = useRouter();
    const { roomId } = router.query;
    const [users, setUsers] = useState<User[]>([]);
    const { username } = useContext(UserContext);

    useEffect(() => {
        socket?.emit("joinRoom", {
            username,
            roomId,
        });

        return () => {
            socket?.emit("leaveRoom", {
                username,
                room: roomId,
            });
        };
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

export default Room;