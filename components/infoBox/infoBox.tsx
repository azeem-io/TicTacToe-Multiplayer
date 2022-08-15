// External imports
import { HStack, Box, Text, Avatar, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

// Component imports
import { InfoBoxProps } from "./types";

// Project imports
import { SocketContext } from "@/context/socket";
import { UserContext } from "context/user";
import useSocket from "@/hooks/useSocket";

interface RoomUserProps {}

interface User {
    id: string;
    username: string;
    room: string;
}

const InfoBox = (props: InfoBoxProps) => {
    const { state } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);

    // get Room users
    useSocket("roomUsers", ({ room, users }) => {
        if (state.room === room) {
            setUsers(users);
        }
    });

    const opponent = users.find((user) => user.username !== state.username);

    return (
        <Box
            display={{ sm: "none", lg: "block" }}
            borderRadius="1rem"
            bg="brand.secondary"
            w="22rem"
            h="70vh"
            padding="1rem"
        >
            <VStack spacing={2}>
                <HStack justifyContent="center" w="full" spacing="1rem">
                    <Text fontSize="2rem">{state.username}</Text>
                </HStack>

                {opponent ? (
                    <Text fontSize="2rem">{opponent.username}</Text>
                ) : (
                    <Text> Waiting for opponent...</Text>
                )}
            </VStack>
        </Box>
    );
};

InfoBox.defaultProps = {};

export default InfoBox;
