// External imports
import { VStack, HStack, Input, Button, Box, Flex } from "@chakra-ui/react";
import React from "react";

// Component imports
import { ChatBoxProps } from "./types";

// Project imports

const ChatBox = (props: ChatBoxProps) => {
    return (
        <Flex
            flexDirection="column"
            padding="0.5rem"
            borderRadius="1rem"
            bg="brand.secondary"
            minW="22rem"
            maxW="80vw"
            h="70vh"
        >
            <VStack
                borderRadius="0.5rem"
                h="88%"
                spacing="2rem"
                bg="brand.primary"
            />
            <HStack
                paddingX="0.2rem"
                h="12%"
                width="full"
                justifyContent="space-between"
            >
                <Input
                    variant="filled"
                    w="14rem"
                    border="none"
                    type="text"
                    h="2rem"
                    placeholder="Chat..."
                />
                <Button w="4rem" h="2rem" borderRadius="0.5rem">
                    Send!
                </Button>
            </HStack>
        </Flex>
    );
};

ChatBox.defaultProps = {};

export default ChatBox;
