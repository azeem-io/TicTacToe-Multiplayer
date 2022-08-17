// External imports
import { HStack, Box, Text, Avatar, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

// Component imports
import { InfoBoxProps } from "./types";

// Project imports
import { UserContext } from "context/user";
import { socket } from "@/data/socket";

interface User {
    id: string;
    username: string;
    room: string;
    isPlaying: boolean;
}

const InfoBox = (props: InfoBoxProps) => {
    const { username } = useContext(UserContext);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        socket?.on("updateRoomUsers", (updatedUsers: User[]) => {
            setUsers(updatedUsers);
        });
        return () => {
            socket?.off("updateRoomUsers");
        };
    }, []);

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
                <Text>Players</Text>
                {Array.from(Array(2), (_, index) => {
                    return (
                        <HStack
                            key={index}
                            bg="player.me"
                            justifyContent="center"
                            w="full"
                            spacing="1rem"
                        >
                            <Text fontSize="2rem">
                                {users[index]
                                    ? users[index].username
                                    : "Waiting for opponent..."}
                            </Text>
                        </HStack>
                    );
                })}

                <VStack h="20vh" w="full" spacing={2}>
                    <Text>Spectators </Text>
                    {users
                        .filter((user: User) => !user.isPlaying)
                        .map((user: User) => {
                            return (
                                <HStack
                                    key={user.id}
                                    bg="gray.300"
                                    justifyContent="center"
                                    w="full"
                                    spacing="1rem"
                                >
                                    <Text fontSize="2rem">{user.username}</Text>
                                </HStack>
                            );
                        })}
                </VStack>
            </VStack>
        </Box>
    );
};

InfoBox.defaultProps = {};

export default InfoBox;
