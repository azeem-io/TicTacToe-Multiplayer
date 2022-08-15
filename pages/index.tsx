// External imports
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { VStack, Heading, Input, Button, Flex, Select } from "@chakra-ui/react";
import axios from "axios";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { UserContext } from "context/user";

interface IndexPageProps {
    rooms: string[];
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await axios.get("http://localhost:4000/rooms");
    const rooms = res.data;

    if (!rooms) {
        return {
            notFound: true,
        };
    }
    return {
        props: { rooms },
    };
};

const Home: NextPage<IndexPageProps> = ({ rooms }) => {
    const router = useRouter();
    const { state, setUsername, setRoom } = useContext(UserContext);

    return (
        <>
            <Page bg="brand.primary" title="TTT Multiplayer">
                <form>
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
                            placeholder="Name..."
                            // value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Select
                            variant="filled"
                            onChange={(e) => setRoom(e.target.value)}
                        >
                            <option>Select a room</option>
                            {rooms.map((room, index) => (
                                <option key={index} value={room}>
                                    {room}
                                </option>
                            ))}
                        </Select>

                        <Button
                            onClick={() => {
                                console.log(state.room);
                                router.push("/game");
                            }}
                        >
                            Go!
                        </Button>
                    </VStack>
                </form>
            </Page>
        </>
    );
};

export default Home;
