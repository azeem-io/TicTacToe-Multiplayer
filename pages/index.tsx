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

interface Room {
    id: string;
    name: string;
}

interface IndexPageProps {
    rooms: Room[];
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get("http://localhost:4000/rooms");
    const rooms = res.data;

    return {
        props: { rooms },
    };
};

const Home: NextPage<IndexPageProps> = (props) => {
    const router = useRouter();
    const { username, setUsername } = useContext(UserContext);

    const [formUsername, setFormUsername] = useState("");
    const [formRoom, setFormRoom] = useState(props.rooms[0].id);
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

    useEffect(() => {
        socket?.emit("getAllRoomUsers", formRoom);
    }, [formRoom]);

    useEffect(() => {
        socket?.on("receiveAllRoomUsers", (userCount) => {
            setRoomUsers(userCount);
        });
        return () => {
            socket?.off("getAllRoomUsers");
        };
    }, []);

    return (
        <>
            <Page bg="brand.primary" title="TTT Multiplayer">
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <VStack spacing="2rem">
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
                        <Select
                            variant="filled"
                            w="15rem"
                            required
                            onChange={(e) => setFormRoom(e.target.value)}
                        >
                            {props.rooms.map((room, index) => (
                                <option key={index} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </Select>

                        <Button
                            type="submit"
                            variant="solid"
                            color="white"
                            w="10rem"
                        >
                            Enter
                        </Button>
                        <VStack spacing="0.2rem" h="3rem">
                            <Text color="white" fontSize="1.5rem">
                                {roomUsers} users in room
                            </Text>
                            {roomUsers >= 2 ? (
                                <Text color="white" fontSize="1rem">
                                    You will join as a spectator
                                </Text>
                            ) : null}
                        </VStack>
                    </VStack>
                </form>
            </Page>
        </>
    );
};

export default Home;
