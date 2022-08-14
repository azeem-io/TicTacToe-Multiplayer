// External imports
import type { NextPage } from "next";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { Flex } from "@chakra-ui/react";

const Game: NextPage = () => {
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
