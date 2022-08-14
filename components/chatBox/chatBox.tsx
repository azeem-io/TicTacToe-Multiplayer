// External imports
import {
    VStack,
    HStack,
    Input,
    Text,
    Button,
    Box,
    Flex,
} from "@chakra-ui/react";
import { UserContext } from "context/user";
import React, { useContext, useEffect, useState } from "react";

// Component imports
import { ChatBoxProps } from "./types";

// Project imports

// let socket = io();

type Message = {
    user: string;
    message: string;
};

const ChatBox = (props: ChatBoxProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<Message>>([]);
    const { state } = useContext(UserContext);

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        // sendMessage();
        setMessages([...messages, { user: state.username, message }]);
    };

    // useEffect(() => {
    //     console.log("Add listener");
    //     initializeSocket();
    //     return () => {
    //         console.log("remove listener");

    //         removeSocket();
    //     };
    // }, []);

    // const initializeSocket = async () => {
    //     // await fetch("/api/socket");
    //     console.log("initialized");
    //     socket.on("newIncomingMessage", (msg: any) => {
    //         if (msg.author === props.chosenUsername) return;
    //         setMessages((currentMsg) => [
    //             ...currentMsg,
    //             { author: msg.author, message: msg.message },
    //         ]);

    //         console.log(`"socket initializer" ${message}`);
    //     });
    // };

    // const removeSocket = async () => {
    //     socket.off("newIncomingMessage");
    // };

    // const sendMessage = async () => {
    //     console.log("inside--- Send Message called");

    //     socket.emit("createdMessage", {
    //         author: props.chosenUsername,
    //         message: message,
    //     });
    //     setMessages((currentMsg) => [
    //         ...currentMsg,
    //         { author: props.chosenUsername, message: message },
    //     ]);
    //     console.log(`"Send Message" ${message}`);
    //     setMessage("");
    // };

    // console.log(`"ChatBox" ${messages}`);

    return (
        <Flex
            flexDirection="column"
            padding="0.5rem"
            paddingBottom="0"
            borderRadius="1rem"
            bg="brand.secondary"
            minW="22rem"
            maxW="80vw"
            h="70vh"
            gap="0.5rem"
        >
            <VStack
                borderRadius="0.5rem"
                h="88%"
                w="100%"
                spacing="1rem"
                bg="brand.primary"
                overflowY="scroll"
                overflowX="hidden"
                overflowWrap={"anywhere"}
                padding="0.5rem"
            >
                {messages.map((message, index) => (
                    <HStack
                        key={index}
                        alignItems="center"
                        justifyContent={
                            message.user === state.username
                                ? "flex-end"
                                : "flex-start"
                        }
                        w="full"
                    >
                        <HStack
                            alignItems="center"
                            bg={
                                message.user === state.username
                                    ? "player.me"
                                    : "player.opponent"
                            }
                            paddingX="0.5rem"
                            borderRadius="0.5rem"
                            textOverflow="ellipsis"
                            maxWidth="15rem"
                            padding="0.5rem"
                        >
                            {/* <Text fontSize="0.7rem">{message.author}:</Text> */}
                            <Text
                                noOfLines={10}
                                color="text.light"
                                fontWeight="semibold"
                            >
                                {message.message}
                            </Text>
                        </HStack>
                    </HStack>
                ))}
            </VStack>
            <Box>
                <form onSubmit={onFormSubmit}>
                    <HStack
                        paddingX="0.2rem"
                        h="12%"
                        width="full"
                        justifyContent="center"
                    >
                        <Input
                            variant="filled"
                            w="14rem"
                            h="2rem"
                            placeholder="Chat..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                            w="5srem"
                            h="2rem"
                            type="submit"
                            borderRadius="0.5rem"
                        >
                            Send!
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Flex>
    );
};

ChatBox.defaultProps = {};

export default ChatBox;
