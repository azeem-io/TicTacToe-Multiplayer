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
import React, { useContext, useEffect, useState } from "react";

// Component imports
import { ChatBoxProps } from "./types";

// Project imports
import { UserContext } from "context/user";
import { socket } from "@/data/socket";

interface ChatMessageType {
   username: string;
   text: string;
   time: string;
}

const ChatBox = (props: ChatBoxProps) => {
   const [message, setMessage] = useState("");
   const [chatLog, setChatLog] = useState<ChatMessageType[]>([]);
   const { username } = useContext(UserContext);

   // receive message from server
   const receiveServerMessage = async () => {
      socket?.on("broadcastMessage", (data: ChatMessageType) => {
         console.log(`ChatLog: ${chatLog.length}`);
         setChatLog((currentData) => [...currentData, data]);
      });
   };

   // send message to the server
   const sendMessage = async () => {
      socket?.emit("receiveMessage", {
         message,
         username,
         roomId: props.roomId,
      });
   };

   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      sendMessage();
      setMessage("");
   };

   useEffect(() => {
      receiveServerMessage();
      return () => {
         socket?.off("broadcastMessage");
      };
   }, []);

   return (
      <Flex
         flexDirection="column"
         padding="0.5rem"
         paddingBottom="0"
         borderRadius="1rem"
         bg="brand.secondary"
         minW="15rem"
         maxW="23rem"
         h="70vh"
         gap="0.5rem"
      >
         <VStack
            borderRadius="0.5rem"
            h="86%"
            w="100%"
            spacing="1rem"
            bg="brand.primary"
            overflowY="scroll"
            overflowX="hidden"
            overflowWrap={"anywhere"}
            padding="0.4rem"
            paddingY="1rem"
         >
            {chatLog.map((message, messageId) => (
               <HStack
                  key={messageId}
                  alignItems="center"
                  justifyContent={
                     message.username === username ? "flex-end" : "flex-start"
                  }
                  w="full"
               >
                  <HStack
                     alignItems="center"
                     bg={
                        message.username === username
                           ? "brand.tertiary"
                           : "text.red"
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
                        color={
                           message.username === username
                              ? "text.dark"
                              : "text.light"
                        }
                        fontWeight="semibold"
                     >
                        <HStack alignItems="center">
                           <Text fontSize="0.9rem">{message.username}</Text>

                           <Text fontSize="0.6rem">{message.time}</Text>
                        </HStack>
                        <Box
                           bg={
                              message.username === username
                                 ? "text.dark"
                                 : "text.light"
                           }
                           h="1px"
                           width="full"
                        />
                        <Box h="2px" width="full" />
                        {message.text}
                     </Text>
                  </HStack>
               </HStack>
            ))}
         </VStack>
         <Box>
            <form onSubmit={(e) => submitHandler(e)}>
               <HStack
                  paddingX="0.2rem"
                  paddingTop="0.4rem"
                  h="12%"
                  width="full"
                  justifyContent="center"
               >
                  <Input
                     variant="filled"
                     w="14rem"
                     h="2rem"
                     placeholder="Chat..."
                     required
                     value={message}
                     focusBorderColor="brand.tertiary"
                     onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                     bg="brand.tertiary"
                     w="5rem"
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
