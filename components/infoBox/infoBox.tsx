// External imports
import { HStack, Box, Text, Avatar, VStack, Button } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

// Component imports
import { InfoBoxProps } from "./types";

// Project imports
import { UserContext } from "context/user";
import { socket } from "@/data/socket";
import CustomButton from "../customButton";
import { fetcher } from "@/utility/fetch";
import useSWR from "swr";

interface User {
   id: string;
   username: string;
   room: string;
   isPlaying: boolean;
}

const InfoBox = (props: InfoBoxProps) => {
   const router = useRouter();
   const { data: users, isValidating } = useSWR<User[]>(
      `http://localhost:4000/roomUsers/${props.roomId}`,
      fetcher
   );
   const { username } = useContext(UserContext);
   const [currentUser, setCurrentUser] = useState<User>();
   const [playingUsers, setPlayingUsers] = useState<User[]>([]);
   const [spectatingUsers, setSpectatingUsers] = useState<User[]>([]);

   const setUsers = (users: User[]) => {
      setSpectatingUsers(users.filter((user) => !user.isPlaying));
      setPlayingUsers(users.filter((user) => user.isPlaying));
      setCurrentUser(users.filter((user) => user.id === socket?.id)[0]);
   };

   useEffect(() => {
      if (users) {
         setUsers(users);
      }
   }, [users]);

   useEffect(() => {
      // socket?.emit("updateRoomUsersRequest", props.roomId);
      socket?.on("updateRoomUsers", (updatedUsers: User[]) => {
         setUsers(updatedUsers);
      });

      return () => {
         socket?.off("updateRoomUsers");
      };
   }, []);

   const leaveRoomHandler = () => {
      socket?.emit("leaveRoom");
      router.push("/");
   };
   const spectateHandler = () => {
      socket?.emit("setAsSpectating");
   };

   return (
      <Box
         // display={{ sm: "none", lg: "block" }}
         borderRadius="1rem"
         bg="brand.secondary"
         w="24rem"
         h="70vh"
         padding="1rem"
      >
         <VStack h="full" spacing={2}>
            <Text fontWeight={600} color="text.light">
               PLAYERS
            </Text>
            {Array.from(Array(2), (_, index) => {
               return (
                  <HStack
                     key={index}
                     bg="text.box"
                     justifyContent="center"
                     w="full"
                     spacing="1rem"
                     padding="0.4rem"
                     borderRadius="0.2rem"
                     color="text.light"
                  >
                     <Text fontSize="1.3rem">
                        {playingUsers[index]
                           ? playingUsers[index].username
                           : "Waiting for player..."}
                     </Text>
                  </HStack>
               );
            })}

            <VStack
               padding="0.5rem"
               bg="brand.primary"
               h="full"
               w="full"
               spacing={2}
               borderRadius="0.3rem"
            >
               <Text color="text.light">SPECTATORS </Text>
               {spectatingUsers.map((user: User) => {
                  return (
                     <HStack
                        key={user.id}
                        bg="text.box"
                        justifyContent="center"
                        w="full"
                        spacing="1rem"
                        padding="0.5rem"
                        borderRadius="0.2rem"
                        color="text.light"
                     >
                        <Text color="text.light" fontSize="1.5rem">
                           {user.username}
                        </Text>
                     </HStack>
                  );
               })}
            </VStack>
            <HStack spacing={"1rem"} paddingY="0.4rem">
               <CustomButton
                  text={
                     currentUser?.isPlaying === true ? "SPECTATE" : "JOIN QUEUE"
                  }
                  onClick={spectateHandler}
               />
               <CustomButton text="LEAVE" onClick={leaveRoomHandler} />
            </HStack>
         </VStack>
      </Box>
   );
};

InfoBox.defaultProps = {};

export default InfoBox;
