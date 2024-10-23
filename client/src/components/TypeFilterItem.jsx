import React from 'react';
import { ListItem, Text } from "@chakra-ui/react";

const TypeFilterItem = ({ type, isSelected, onClick }) => {
    return (
        <ListItem
            cursor="pointer"
            bg={isSelected ? "black" : "gray.100"}
            color={isSelected ? "white" : "black"}
            borderRadius="md"
            p={4}
            onClick={onClick}
            _hover={{ bg: isSelected ? "black.900" : "gray.200" }}
        >
            <Text>{type.name || "View all"}</Text>
        </ListItem>
    );
};

export default TypeFilterItem;
