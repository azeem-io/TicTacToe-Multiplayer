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

export interface Room {
    id: string;
    name: string;
    numPlayers: number;
    numSpectators: number;
}

interface IndexPageProps {
    rooms: Room[];
}

const fetcher = (url: string) =>
    axios
        .get(url, {
            headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => res.data);

const Home: NextPage<IndexPageProps> = (props) => {
    const { data: rooms, isValidating } = useSWR(
        "http://localhost:4000/rooms",
        fetcher
    );
    const { mutate } = useSWRConfig();

    const router = useRouter();
    const { username, setUsername } = useContext(UserContext);

    const [formUsername, setFormUsername] = useState("");
    const [formRoom, setFormRoom] = useState("");
    const [roomUsers, setRoomUsers] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    useEffect(() => {
        if (formSubmitted) {
            setFormSubmitted(false);
            setUsername(formUsername);
            router.push(`/game/${formRoom}`);
        }
    }, [formSubmitted]);

    return (
        <>
            <Page bg="brand.primary" title="TTT Multiplayer">
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <VStack spacing="1.5rem">
                        <Heading color="white" fontSize="1.5rem">
                            Enter Your Name
                        </Heading>
                        {/* make this a form to allow submit with 'Enter' */}
                        <Input
                            padding="0.5rem"
                            width="15rem"
                            borderRadius="0.5rem"
                            variant={"underlined"}
                            type="text"
                            required
                            placeholder="Name..."
                            // value={username}
                            onChange={(e) => setFormUsername(e.target.value)}
                        />
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
                                        bg="text.box"
                                        padding={"0.5rem"}
                                        justifyContent="space-between"
                                        key={index}
                                        alignItems="center"
                                        color="text.light"
                                        onClick={() => setFormRoom(room.id)}
                                    >
                                        <Text>
                                            {!room ? "loading..." : room.name}
                                        </Text>
                                        <HStack
                                            spacing="2.8rem"
                                            paddingRight="2rem"
                                        >
                                            <Text>
                                                {!room ? (
                                                    <Spinner />
                                                ) : (
                                                    room.numPlayers
                                                )}
                                                /2
                                            </Text>
                                            <Text>
                                                {!room ? (
                                                    <Spinner />
                                                ) : (
                                                    room.numSpectators
                                                )}
                                            </Text>
                                            {/* <Text>5</Text> */}
                                        </HStack>
                                    </HStack>
                                ))}
                            </VStack>
                        </VStack>
                        <HStack
                            w="29vw"
                            justifyContent="space-between"
                            spacing={"2rem"}
                        >
                            <Button
                                type="submit"
                                variant="solid"
                                bg="brand.tertiary"
                                color="text.dark"
                                fontSize="1.1rem"
                                fontWeight={500}
                                w="10rem"
                            >
                                Enter
                            </Button>
                            <Button
                                variant="solid"
                                bg="brand.tertiary"
                                color="text.dark"
                                fontSize="1.1rem"
                                fontWeight={500}
                                w="6rem"
                                onClick={() => {
                                    mutate("http://localhost:4000/rooms");
                                }}
                            >
                                {isValidating ? <Spinner /> : "Refresh"}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Page>
        </>
    );
};

export default Home;
