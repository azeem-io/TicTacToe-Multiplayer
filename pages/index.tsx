// External imports
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
   VStack,
   Heading,
   Input,
   Button,
   Text,
   Select,
   propNames,
   HStack,
   Spacer,
   Spinner,
   useDisclosure,
   ModalHeader,
   Box,
   Tooltip,
} from "@chakra-ui/react";
import axios from "axios";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { UserContext } from "context/user";
import { handleFormikSubmit } from "@/utility/formik";
import { socket } from "@/data/socket";
import useSWR, { useSWRConfig } from "swr";
import CustomButton from "@/components/customButton";
import { fetcher } from "@/utility/fetch";

export interface Room {
   id: string;
   name: string;
   numPlayers: number;
   numSpectators: number;
}

interface IndexPageProps {
   rooms: Room[];
}

enum EnterState {
   Lobby,
   Play,
   Spectate,
}

const Home: NextPage<IndexPageProps> = (props) => {
   const { data: rooms, isValidating } = useSWR<Room[]>(
      "http://localhost:4000/rooms",
      fetcher
   );
   const { mutate } = useSWRConfig();

   const router = useRouter();
   const { username, setUsername } = useContext(UserContext);

   const [formUsername, setFormUsername] = useState("");
   const [formRoom, setFormRoom] = useState("");
   const [enterState, setEnterState] = useState<EnterState>(EnterState.Lobby);

   useEffect(() => {
      if (enterState !== EnterState.Lobby) {
         setUsername(formUsername);
         socket?.emit("joinRoom", {
            username: formUsername,
            roomId: formRoom,
            isPlaying: enterState === EnterState.Play, //return true/false
         });
         setEnterState(EnterState.Lobby);
         router.push(`/game/${formRoom}`);
      }
   }, [enterState]);

   useEffect(() => {
      setFormUsername(username);
   }, [username]);

   useEffect(() => {}, []);

   const isRoomFull = (): boolean => {
      if (rooms) {
         return rooms.find((room) => room.id === formRoom)?.numPlayers === 2;
      }
      return false;
   };

   const canPlay = (): boolean => {
      return (formUsername && formRoom && !isRoomFull()) as boolean;
   };
   const canSpectate = (): boolean => {
      return !(!formUsername || !formRoom);
   };

   return (
      <>
         <Page bg="brand.primary" title="TTT Multiplayer">
            <VStack spacing="3rem">
               <VStack spacing="1rem">
                  <Heading color="white" fontSize="1.5rem">
                     Enter Your Name
                  </Heading>
                  <Input
                     padding="0.5rem"
                     width="15rem"
                     borderRadius="0.5rem"
                     variant={"underlined"}
                     defaultValue={username}
                     type="text"
                     required
                     placeholder="Name..."
                     // value={username}
                     onChange={(e) => {
                        setFormUsername(e.target.value);
                        // console.log(e.target.value);
                     }}
                  />
               </VStack>
               <VStack spacing="0.5rem">
                  <HStack
                     color="text.light"
                     fontSize="0.7rem"
                     w="30vw"
                     h="1rem"
                     justifyContent="flex-end"
                     paddingRight="1.6rem"
                     spacing="0.8rem"
                  >
                     <Text>ROOM NAME</Text>
                     <Spacer />
                     <Text>PLAYERS</Text>
                     <Text>SPECTATORS</Text>
                  </HStack>
                  <VStack
                     w="30vw"
                     h="12rem"
                     overflowY="scroll"
                     spacing="0.5rem"
                  >
                     {rooms?.map((room: Room, index: number) => (
                        <HStack
                           w="full"
                           h="2rem"
                           bg={
                              formRoom === room.id
                                 ? "brand.tertiary"
                                 : "text.box"
                           }
                           color={
                              formRoom === room.id ? "text.dark" : "text.light"
                           }
                           padding={"0.5rem"}
                           justifyContent="space-between"
                           key={index}
                           alignItems="center"
                           onClick={() => setFormRoom(room.id)}
                           cursor="pointer"
                        >
                           <Text>{!room ? "loading..." : room.name}</Text>
                           <HStack spacing="2.8rem" paddingRight="1.9rem">
                              <Text>
                                 {!room ? <Spinner /> : room.numPlayers}
                                 /2
                              </Text>
                              <Text>
                                 {!room ? <Spinner /> : room.numSpectators}
                              </Text>
                              {/* <Text>5</Text> */}
                           </HStack>
                        </HStack>
                     ))}
                  </VStack>
                  <Box h="0.3rem" w="full" />
                  <HStack
                     // justifyContent="space-between"
                     spacing={"0.7rem"}
                     pr="1rem"
                     w="full"
                  >
                     <Tooltip
                        isDisabled={canPlay()}
                        label={
                           !formUsername
                              ? "Please enter a username"
                              : !formRoom
                              ? "Please select a room"
                              : isRoomFull()
                              ? "The selected room is full"
                              : ""
                        }
                        shouldWrapChildren
                     >
                        <Button
                           variant="solid"
                           bg="brand.tertiary"
                           color="text.dark"
                           fontSize="1rem"
                           fontWeight={600}
                           size={"sm"}
                           isDisabled={!canPlay()}
                           onClick={() => {
                              setEnterState(EnterState.Play);
                           }}
                        >
                           PLAY
                        </Button>
                     </Tooltip>
                     <Tooltip
                        isDisabled={canSpectate()}
                        label={
                           !formUsername
                              ? "Please enter a username"
                              : !formRoom
                              ? "Please select a room"
                              : ""
                        }
                        shouldWrapChildren
                     >
                        <Button
                           variant="solid"
                           bg="brand.tertiary"
                           color="text.dark"
                           fontSize="1rem"
                           fontWeight={600}
                           size={"sm"}
                           disabled={!canSpectate()}
                           onClick={() => {
                              setEnterState(EnterState.Spectate);
                           }}
                        >
                           SPECTATE
                        </Button>
                     </Tooltip>
                     <Spacer />
                     <Button
                        variant="solid"
                        bg="brand.tertiary"
                        color="text.dark"
                        fontSize="1rem"
                        fontWeight={600}
                        w="5rem"
                        size={"sm"}
                        onClick={() => {
                           mutate("http://localhost:4000/rooms");
                        }}
                     >
                        {isValidating ? <Spinner /> : "REFRESH"}
                     </Button>
                  </HStack>
               </VStack>
            </VStack>
         </Page>
      </>
   );
};

export default Home;
