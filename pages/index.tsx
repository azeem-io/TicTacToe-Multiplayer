// External imports
import type { NextPage } from "next";

// Project imports
import Page, { AnimatedPage } from "@/components/page";
import Board from "@/components/board";
import {
    VStack,
    Heading,
    Box,
    Input,
    Button,
    HStack,
    Flex,
    Avatar,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";

const Home: NextPage = () => {
    const [username, setUsername] = useState("");
    const [chosenUsername, setChosenUsername] = useState("");

    return (
        <>
            <Page bg="brand.primary" title="TTT Multiplayer">
                {!chosenUsername ? (
                    <VStack spacing="2rem">
                        <Heading color="white" fontSize="1.5rem">
                            Enter Your Name
                        </Heading>
                        <Input
                            padding="0.5rem"
                            width="15rem"
                            borderRadius="0.5rem"
                            variant={"underlined"}
                            type="text"
                            placeholder="Name..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Button
                            onClick={() => {
                                setChosenUsername(username);
                            }}
                            className="bg-white rounded-md px-4 py-2 text-xl"
                        >
                            Go!
                        </Button>
                    </VStack>
                ) : (
                    <Flex
                        flexDirection={{ sm: "column", lg: "row" }}
                        padding="3rem"
                        alignItems={{ sm: "center", lg: "space-between" }}
                        gap="5rem"
                        w="full"
                    >
                        <InfoBox username={username} />
                        <Board />
                        <ChatBox />
                    </Flex>
                )}
            </Page>
        </>
    );
};

export default Home;
