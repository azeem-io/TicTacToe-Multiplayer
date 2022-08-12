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
import { Form } from "formik";
import React, { useState } from "react";

// Component imports
import { ChatBoxProps } from "./types";

// Project imports

type Message = {
    author: string;
    message: string;
};

const ChatBox = (props: ChatBoxProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<Message>>([]);

    const onFormSubmit = (e: any) => {
        e.preventDefault();

        setMessages([...messages, { author: "You", message }]);
        setMessage("");
    };

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
                {messages.map((message) => (
                    <HStack
                        key={message.author}
                        alignItems="center"
                        justifyContent={
                            message.author === "You" ? "flex-end" : "flex-start"
                        }
                        w="full"
                    >
                        <HStack
                            alignItems="center"
                            bg="player.me"
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
                            // onClick={() => {
                            //     handleSubmit();
                            // }}
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
