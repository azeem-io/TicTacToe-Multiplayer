// External imports
import { Button, Text } from "@chakra-ui/react";
import React from "react";

// Component imports
import { CustomButtonProps } from "./types";

// Project imports

const CustomButton = (props: CustomButtonProps) => {
    return (
        <Button
            variant="solid"
            bg="brand.tertiary"
            color="text.dark"
            fontWeight={800}
            w="6rem"
            onClick={props.onClick}
        >
            <Text fontWeight={700}>{props.text}</Text>
        </Button>
    );
};

CustomButton.defaultProps = {};

export default CustomButton;
