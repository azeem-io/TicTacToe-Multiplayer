// External imports
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { VStack, Heading, Input, Button, Flex } from "@chakra-ui/react";

// Project imports
import Page from "@/components/page";
import Board from "@/components/board";
import ChatBox from "@/components/chatBox";
import InfoBox from "@/components/infoBox";
import { UserContext } from "context/user";

const Home: NextPage = () => {
    // const [username, setUsername] = useState("");
    //perhaps username/setUsername is not needed
    // const [chosenUsername, setChosenUsername] = useState("");
    const router = useRouter();
    const { state, setUsername } = useContext(UserContext);

    return (
        <>
            <Page bg="brand.primary" title="TTT Multiplayer">
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

                    <Button
                        onClick={() => {
                            router.push("/game");
                        }}
                    >
                        Go!
                    </Button>
                </VStack>
            </Page>
        </>
    );
};

export default Home;
