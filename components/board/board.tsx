// External imports
import { Flex, Box } from "@chakra-ui/react";
import React from "react";

// Component imports
import { BoardProps, HLineProps, VLineProps } from "./types";

// Project imports

const HLine = (props: HLineProps) => {
    return (
        <Box
            bg="brand.tertiary"
            h="22rem"
            w="0.5rem"
            position="absolute"
            left={props.left}
            top="2rem"
        />
    );
};
const VLine = (props: VLineProps) => {
    return (
        <Box
            bg="brand.tertiary"
            h="0.5rem"
            w="22rem"
            position="absolute"
            top={props.top}
            left="2rem"
        />
    );
};

const Tile = () => {
    return (
        <Box
            bg="brand.secondary"
            w="7rem"
            h="7rem"
            _hover={{
                bg: "text.dark",
            }}
        />
    );
};

const Board = (props: BoardProps) => {
    return (
        <Flex
            padding="2rem"
            gap="0.5rem"
            flexDirection="row"
            minW="26rem"
            maxW="26rem"
            minH="26rem"
            maxH="26rem"
            wrap={"wrap"}
            position="relative"
            borderRadius="2vh"
            overflow="hidden"
            bg="brand.secondary"
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
        >
            <HLine left="9rem" />
            <HLine left="16.5rem" />
            <VLine top="9rem" />
            <VLine top="16.5rem" />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </Flex>
    );
};

Board.defaultProps = {
    children: null,
};

export default Board;
