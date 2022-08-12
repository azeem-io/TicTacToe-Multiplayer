// External imports
import { HStack, Box, Text, Avatar } from "@chakra-ui/react";
import React from "react";

// Component imports
import { InfoBoxProps } from "./types";

// Project imports

const InfoBox = (props: InfoBoxProps) => {
    return (
        <Box
            display={{ sm: "none", lg: "block" }}
            borderRadius="1rem"
            bg="brand.secondary"
            w="22rem"
            h="70vh"
            padding="1rem"
        >
            <HStack justifyContent="center" w="full" spacing="1rem">
                <Avatar src="https://bit.ly/broken-link" />
                <Text fontSize="2rem">{props.username}</Text>
            </HStack>
        </Box>
    );
};

InfoBox.defaultProps = {};

export default InfoBox;
